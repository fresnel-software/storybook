"use strict";
/**
 * This file is to be watched !
 * The code must be compatible from @angular-devkit version 6.1.0 to the latest supported
 *
 * It uses code block of angular cli to extract parts of webpack configuration
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAngularCliWebpackConfig = void 0;
const path_1 = __importDefault(require("path"));
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const module_is_available_1 = require("./utils/module-is-available");
const normalize_asset_patterns_1 = require("./utils/normalize-asset-patterns");
const normalize_optimization_1 = require("./utils/normalize-optimization");
const importAngularCliWebpackConfigGenerator = () => {
    let angularWebpackConfig;
    // First we look for webpack config according to directory structure of Angular 11
    if ((0, module_is_available_1.moduleIsAvailable)('@angular-devkit/build-angular/src/webpack/configs')) {
        // eslint-disable-next-line global-require
        angularWebpackConfig = require('@angular-devkit/build-angular/src/webpack/configs');
    }
    // We fallback on directory structure of Angular 10 (and below)
    else if ((0, module_is_available_1.moduleIsAvailable)('@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs')) {
        // eslint-disable-next-line global-require
        angularWebpackConfig = require('@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs');
    }
    else {
        throw new Error('Webpack config not found in "@angular-devkit/build-angular"');
    }
    return {
        getCommonConfig: angularWebpackConfig.getCommonConfig,
        getStylesConfig: angularWebpackConfig.getStylesConfig,
    };
};
const importAngularCliReadTsconfigUtil = () => {
    // First we look for webpack config according to directory structure of Angular 11
    if ((0, module_is_available_1.moduleIsAvailable)('@angular-devkit/build-angular/src/utils/read-tsconfig')) {
        // eslint-disable-next-line global-require
        return require('@angular-devkit/build-angular/src/utils/read-tsconfig');
    }
    // We fallback on directory structure of Angular 10 (and below)
    if ((0, module_is_available_1.moduleIsAvailable)('@angular-devkit/build-angular/src/angular-cli-files/utilities/read-tsconfig')) {
        // eslint-disable-next-line global-require
        return require('@angular-devkit/build-angular/src/angular-cli-files/utilities/read-tsconfig');
    }
    throw new Error('ReadTsconfig not found in "@angular-devkit/build-angular"');
};
const buildWebpackConfigOptions = async (dirToSearch, project, target, confName) => {
    let conf = {};
    if (confName) {
        if (!target.configurations) {
            throw new Error('Missing "configurations" section in project target');
        }
        if (!target.configurations[confName]) {
            throw new Error(`Missing required configuration in project target. Check "${confName}"`);
        }
        conf = target.configurations[confName];
    }
    const projectBuildOptions = { ...target.options, ...conf };
    const requiredOptions = ['tsConfig'];
    if (!requiredOptions.every((key) => !!projectBuildOptions[key])) {
        throw new Error(`Missing required options in project target. Check "${requiredOptions.join(', ')}"`);
    }
    const workspaceRootNormalized = (0, core_1.normalize)(dirToSearch);
    const projectRootNormalized = (0, core_1.resolve)(workspaceRootNormalized, (0, core_1.normalize)(project.root || ''));
    const sourceRootNormalized = project.sourceRoot
        ? (0, core_1.resolve)(workspaceRootNormalized, (0, core_1.normalize)(project.sourceRoot))
        : undefined;
    const tsConfigPath = path_1.default.resolve((0, core_1.getSystemPath)(workspaceRootNormalized), projectBuildOptions.tsConfig);
    const tsConfig = await importAngularCliReadTsconfigUtil().readTsconfig(tsConfigPath);
    const ts = await Promise.resolve().then(() => __importStar(require('typescript')));
    const scriptTarget = tsConfig.options.target || ts.ScriptTarget.ES5;
    const buildOptions = {
        // Default options
        budgets: [],
        fileReplacements: [],
        main: '',
        outputPath: 'dist/storybook-angular',
        scripts: [],
        sourceMap: {},
        styles: [],
        // Deleted in angular 12. Keep for compatibility with versions lower than angular 12
        lazyModules: [],
        // Project Options
        ...projectBuildOptions,
        assets: (0, normalize_asset_patterns_1.normalizeAssetPatterns)(projectBuildOptions.assets || [], workspaceRootNormalized, projectRootNormalized, sourceRootNormalized),
        optimization: (0, normalize_optimization_1.normalizeOptimization)(projectBuildOptions.optimization),
        // Forced options
        statsJson: false,
        // Deleted in angular 12. Keep for compatibility with versions lower than angular 12
        // @ts-expect-error (Converted from ts-ignore)
        forkTypeChecker: false,
    };
    return {
        projectName: 'this-is-just-a-fake-name-for-getting-rid-of-the-error',
        root: (0, core_1.getSystemPath)(workspaceRootNormalized),
        // The dependency of `@angular-devkit/build-angular` to `@angular-devkit/core` is not exactly the same version as the one for storybook (node modules of node modules ^^)
        logger: (0, node_1.createConsoleLogger)(),
        projectRoot: (0, core_1.getSystemPath)(projectRootNormalized),
        sourceRoot: sourceRootNormalized ? (0, core_1.getSystemPath)(sourceRootNormalized) : undefined,
        buildOptions,
        tsConfig,
        tsConfigPath,
        scriptTarget,
    };
};
/**
 * Uses angular cli to extract webpack configuration.
 * The `AngularCliWebpackConfig` type lists the parts used by storybook
 */
async function extractAngularCliWebpackConfig(dirToSearch, project, target, confName) {
    const { getCommonConfig, getStylesConfig } = importAngularCliWebpackConfigGenerator();
    const webpackConfigOptions = await buildWebpackConfigOptions(dirToSearch, project, target, confName);
    const cliCommonConfig = getCommonConfig(webpackConfigOptions);
    const cliStyleConfig = getStylesConfig(webpackConfigOptions);
    return {
        cliCommonWebpackConfig: {
            plugins: cliCommonConfig.plugins,
            resolve: {
                modules: cliCommonConfig.resolve?.modules,
            },
            resolveLoader: cliCommonConfig.resolveLoader,
        },
        cliStyleWebpackConfig: {
            entry: cliStyleConfig.entry,
            module: {
                rules: [...cliStyleConfig.module.rules],
            },
            plugins: cliStyleConfig.plugins,
        },
        tsConfigPath: webpackConfigOptions.tsConfigPath,
    };
}
exports.extractAngularCliWebpackConfig = extractAngularCliWebpackConfig;
