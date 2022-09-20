"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackConfig = void 0;
const node_logger_1 = require("@storybook/node-logger");
const tsconfig_paths_webpack_plugin_1 = __importDefault(require("tsconfig-paths-webpack-plugin"));
const architect_1 = require("@angular-devkit/architect");
const angular_read_workspace_1 = require("./angular-read-workspace");
const angular_devkit_build_webpack_1 = require("./angular-devkit-build-webpack");
const filter_out_styling_rules_1 = require("./utils/filter-out-styling-rules");
/**
 * Old way currently support version lower than 12.2.x
 */
async function getWebpackConfig(baseConfig, options) {
    const dirToSearch = process.cwd();
    // Read angular workspace
    let workspaceConfig;
    try {
        workspaceConfig = await (0, angular_read_workspace_1.readAngularWorkspaceConfig)(dirToSearch);
    }
    catch (error) {
        node_logger_1.logger.error(`=> Could not find angular workspace config (angular.json) on this path "${dirToSearch}"`);
        node_logger_1.logger.info(`=> Fail to load angular-cli config. Using base config`);
        return baseConfig;
    }
    // Find angular project target
    let project;
    let target;
    let confName;
    try {
        // Default behavior when `angularBrowserTarget` are not explicitly defined to null
        if (options.angularBrowserTarget !== null) {
            const browserTarget = options.angularBrowserTarget
                ? (0, architect_1.targetFromTargetString)(options.angularBrowserTarget)
                : {
                    configuration: undefined,
                    project: (0, angular_read_workspace_1.getDefaultProjectName)(workspaceConfig),
                    target: 'build',
                };
            const fondProject = (0, angular_read_workspace_1.findAngularProjectTarget)(workspaceConfig, browserTarget.project, browserTarget.target);
            project = fondProject.project;
            target = fondProject.target;
            confName = browserTarget.configuration;
            node_logger_1.logger.info(`=> Using angular project "${browserTarget.project}:${browserTarget.target}${confName ? `:${confName}` : ''}" for configuring Storybook`);
        }
        // Start storybook when only tsConfig is provided.
        if (options.angularBrowserTarget === null && options.tsConfig) {
            node_logger_1.logger.info(`=> Using default angular project with "tsConfig:${options.tsConfig}"`);
            project = { root: '', extensions: {}, targets: undefined };
            target = { builder: '', options: { tsConfig: options.tsConfig } };
        }
    }
    catch (error) {
        node_logger_1.logger.error(`=> Could not find angular project: ${error.message}`);
        node_logger_1.logger.info(`=> Fail to load angular-cli config. Using base config`);
        return baseConfig;
    }
    // Use angular-cli to get some webpack config
    let angularCliWebpackConfig;
    try {
        angularCliWebpackConfig = await (0, angular_devkit_build_webpack_1.extractAngularCliWebpackConfig)(dirToSearch, project, target, confName);
        node_logger_1.logger.info(`=> Using angular-cli webpack config`);
    }
    catch (error) {
        node_logger_1.logger.error(`=> Could not get angular cli webpack config`);
        throw error;
    }
    return mergeAngularCliWebpackConfig(angularCliWebpackConfig, baseConfig);
}
exports.getWebpackConfig = getWebpackConfig;
function mergeAngularCliWebpackConfig({ cliCommonWebpackConfig, cliStyleWebpackConfig, tsConfigPath }, baseConfig) {
    // Don't use storybooks styling rules because we have to use rules created by @angular-devkit/build-angular
    // because @angular-devkit/build-angular created rules have include/exclude for global style files.
    const rulesExcludingStyles = (0, filter_out_styling_rules_1.filterOutStylingRules)(baseConfig);
    // styleWebpackConfig.entry adds global style files to the webpack context
    const entry = [
        ...baseConfig.entry,
        ...Object.values(cliStyleWebpackConfig.entry).reduce((acc, item) => acc.concat(item), []),
    ];
    const module = {
        ...baseConfig.module,
        rules: [...cliStyleWebpackConfig.module.rules, ...rulesExcludingStyles],
    };
    // We use cliCommonConfig plugins to serve static assets files.
    const plugins = [
        ...cliStyleWebpackConfig.plugins,
        ...cliCommonWebpackConfig.plugins,
        ...baseConfig.plugins,
    ];
    const resolve = {
        ...baseConfig.resolve,
        modules: Array.from(new Set([...baseConfig.resolve.modules, ...cliCommonWebpackConfig.resolve.modules])),
        plugins: [
            new tsconfig_paths_webpack_plugin_1.default({
                configFile: tsConfigPath,
                mainFields: ['browser', 'module', 'main'],
            }),
        ],
    };
    return {
        ...baseConfig,
        entry,
        module,
        plugins,
        resolve,
        resolveLoader: cliCommonWebpackConfig.resolveLoader,
    };
}
