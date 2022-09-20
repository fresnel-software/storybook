"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackFinal = void 0;
const node_logger_1 = require("@storybook/node-logger");
const architect_1 = require("@angular-devkit/architect");
const find_up_1 = require("find-up");
const ts_dedent_1 = require("ts-dedent");
const core_1 = require("@angular-devkit/core");
const module_is_available_1 = require("./utils/module-is-available");
const angular_cli_webpack_older_1 = require("./angular-cli-webpack-older");
const angular_read_workspace_1 = require("./angular-read-workspace");
async function webpackFinal(baseConfig, options) {
    if (!(0, module_is_available_1.moduleIsAvailable)('@angular-devkit/build-angular')) {
        node_logger_1.logger.info('=> Using base config because "@angular-devkit/build-angular" is not installed');
        return baseConfig;
    }
    /**
     * Ordered array to use the specific  getWebpackConfig according to some condition like angular-cli version
     */
    const webpackGetterByVersions = [
        {
            info: '=> Loading angular-cli config for angular lower than 12.2.0',
            condition: true,
            getWebpackConfig: angular_cli_webpack_older_1.getWebpackConfig,
        },
    ];
    const webpackGetter = webpackGetterByVersions.find((wg) => wg.condition);
    node_logger_1.logger.info(webpackGetter.info);
    return Promise.resolve(webpackGetter.getWebpackConfig(baseConfig, options));
}
exports.webpackFinal = webpackFinal;
/**
 * Get Builder Context
 * If storybook is not start by angular builder create dumb BuilderContext
 */
function getBuilderContext(options) {
    return (options.angularBuilderContext ??
        {
            target: { project: 'noop-project', builder: '', options: {} },
            workspaceRoot: process.cwd(),
            getProjectMetadata: () => ({}),
            getTargetOptions: () => ({}),
            logger: new core_1.logging.Logger('Storybook'),
        });
}
/**
 * Get builder options
 * Merge target options from browser target and from storybook options
 */
async function getBuilderOptions(options, builderContext) {
    /**
     * Get Browser Target options
     */
    let browserTargetOptions = {};
    if (options.angularBrowserTarget) {
        const browserTarget = (0, architect_1.targetFromTargetString)(options.angularBrowserTarget);
        node_logger_1.logger.info(`=> Using angular browser target options from "${browserTarget.project}:${browserTarget.target}${browserTarget.configuration ? `:${browserTarget.configuration}` : ''}"`);
        browserTargetOptions = await builderContext.getTargetOptions(browserTarget);
    }
    /**
     * Merge target options from browser target options and from storybook options
     */
    const builderOptions = {
        ...browserTargetOptions,
        ...options.angularBuilderOptions,
        tsConfig: options.tsConfig ??
            (0, find_up_1.sync)('tsconfig.json', { cwd: options.configDir }) ??
            browserTargetOptions.tsConfig,
    };
    node_logger_1.logger.info(`=> Using angular project with "tsConfig:${builderOptions.tsConfig}"`);
    return builderOptions;
}
/**
 * Get options from legacy way
 * /!\ This is only for backward compatibility and would be removed on Storybook 7.0
 * only work for angular.json with [defaultProject].build or "storybook.build" config
 */
async function getLegacyDefaultBuildOptions(options) {
    if (options.angularBrowserTarget !== undefined) {
        // Not use legacy way with builder (`angularBrowserTarget` is defined or null with builder and undefined without)
        return {};
    }
    node_logger_1.logger.warn((0, ts_dedent_1.dedent) `Your Storybook startup uses a solution that will not be supported in version 7.0. 
            You must use angular builder to have an explicit configuration on the project used in angular.json
            Read more at:
            - https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#sb-angular-builder)
            - https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#angular13)
          `);
    const dirToSearch = process.cwd();
    // Read angular workspace
    let workspaceConfig;
    try {
        workspaceConfig = await (0, angular_read_workspace_1.readAngularWorkspaceConfig)(dirToSearch);
    }
    catch (error) {
        node_logger_1.logger.error(`=> Could not find angular workspace config (angular.json) on this path "${dirToSearch}"`);
        node_logger_1.logger.info(`=> Fail to load angular-cli config. Using base config`);
        return {};
    }
    // Find angular project target
    try {
        const browserTarget = {
            configuration: undefined,
            project: (0, angular_read_workspace_1.getDefaultProjectName)(workspaceConfig),
            target: 'build',
        };
        const { target } = (0, angular_read_workspace_1.findAngularProjectTarget)(workspaceConfig, browserTarget.project, browserTarget.target);
        node_logger_1.logger.info(`=> Using angular project "${browserTarget.project}:${browserTarget.target}" for configuring Storybook`);
        return { ...target.options };
    }
    catch (error) {
        node_logger_1.logger.error(`=> Could not find angular project: ${error.message}`);
        node_logger_1.logger.info(`=> Fail to load angular-cli config. Using base config`);
        return {};
    }
}
