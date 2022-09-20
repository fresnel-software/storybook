"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = exports.runNgcc = void 0;
const path = __importStar(require("path"));
/**
 * Source : https://github.com/angular/angular-cli/blob/ebccb5de4a455af813c5e82483db6af20666bdbd/packages/angular_devkit/build_angular/src/utils/load-esm.ts#L23
 * This uses a dynamic import to load a module which may be ESM.
 * CommonJS code can load ESM code via a dynamic import. Unfortunately, TypeScript
 * will currently, unconditionally downlevel dynamic import into a require call.
 * require calls cannot load ESM code and will result in a runtime error. To workaround
 * this, a Function constructor is used to prevent TypeScript from changing the dynamic import.
 * Once TypeScript provides support for keeping the dynamic import this workaround can
 * be dropped.
 *
 * @param modulePath The path of the module to load.
 * @returns A Promise that resolves to the dynamically imported module.
 */
function loadEsmModule(modulePath) {
    // eslint-disable-next-line no-new-func
    return new Function('modulePath', `return import(modulePath);`)(modulePath);
}
/**
 * Run ngcc for converting modules to ivy format before starting storybook
 * This step is needed in order to support Ivy in storybook
 *
 * Information about Ivy can be found here https://angular.io/guide/ivy
 */
const runNgcc = async () => {
    let ngcc;
    try {
        ngcc = await Promise.resolve().then(() => __importStar(require('@angular/compiler-cli/ngcc')));
    }
    catch (error) {
        ngcc = await loadEsmModule('@angular/compiler-cli/ngcc');
    }
    ngcc.process({
        // should be async: true but does not work due to
        // https://github.com/storybookjs/storybook/pull/11157/files#r615413803
        async: false,
        basePath: path.join(process.cwd(), 'node_modules'),
        createNewEntryPointFormats: true,
        compileAllFormats: false, // --first-only
    });
};
exports.runNgcc = runNgcc;
const webpack = async (webpackConfig, options) => {
    const framework = await options.presets.apply('framework');
    const angularOptions = (typeof framework === 'object' ? framework.options : {});
    // Default to true, if undefined
    if (angularOptions.enableIvy === false) {
        return webpackConfig;
    }
    (0, exports.runNgcc)();
    return {
        ...webpackConfig,
        resolve: {
            ...webpackConfig.resolve,
            mainFields: [
                'es2015_ivy_ngcc',
                'module_ivy_ngcc',
                'main_ivy_ngcc',
                'es2015',
                'browser',
                'module',
                'main',
            ],
        },
    };
};
exports.webpack = webpack;
