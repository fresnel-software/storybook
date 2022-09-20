"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainFile = exports.getPreviewFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const core_webpack_1 = require("@storybook/core-webpack");
const core_common_1 = require("@storybook/core-common");
const register_1 = __importDefault(require("@storybook/babel-plugin-require-context-hook/register"));
const global_1 = __importDefault(require("global"));
(0, register_1.default)();
const isFile = (file) => {
    try {
        return fs_1.default.lstatSync(file).isFile();
    }
    catch (e) {
        return false;
    }
};
const supportedExtensions = ['ts', 'tsx', 'js', 'jsx'];
const resolveFile = (configDir, supportedFilenames) => supportedFilenames
    .flatMap((filename) => supportedExtensions.map((ext) => path_1.default.join(configDir, `${filename}.${ext}`)))
    .find(isFile) || false;
const getPreviewFile = (configDir) => resolveFile(configDir, ['preview', 'config']);
exports.getPreviewFile = getPreviewFile;
const getMainFile = (configDir) => resolveFile(configDir, ['main']);
exports.getMainFile = getMainFile;
function getConfigPathParts(input) {
    const configDir = path_1.default.resolve(input);
    if (fs_1.default.lstatSync(configDir).isDirectory()) {
        const output = {};
        const preview = (0, exports.getPreviewFile)(configDir);
        const main = (0, exports.getMainFile)(configDir);
        if (preview) {
            output.preview = preview;
        }
        if (main) {
            const { stories = [], features = {} } = jest.requireActual(main);
            output.features = features;
            const workingDir = process.cwd();
            output.stories = stories.map((entry) => {
                const specifier = (0, core_common_1.normalizeStoriesEntry)(entry, {
                    configDir,
                    workingDir,
                });
                return specifier;
            });
            output.requireContexts = output.stories.map((specifier) => {
                const { path: basePath, recursive, match } = (0, core_webpack_1.toRequireContext)(specifier);
                // eslint-disable-next-line no-underscore-dangle
                return global_1.default.__requireContext(workingDir, basePath, recursive, match);
            });
        }
        return output;
    }
    return { preview: configDir };
}
function configure(options) {
    const { configPath = '.storybook', config, storybook } = options;
    if (config && typeof config === 'function') {
        config(storybook);
        return;
    }
    const { preview, features = {}, stories = [], requireContexts = [], } = getConfigPathParts(configPath);
    global_1.default.FEATURES = features;
    global_1.default.STORIES = stories.map((specifier) => ({
        ...specifier,
        importPathMatcher: specifier.importPathMatcher.source,
    }));
    if (preview) {
        // This is essentially the same code as lib/core/src/server/preview/virtualModuleEntry.template
        const { parameters, decorators, globals, globalTypes, argsEnhancers, argTypesEnhancers, runStep, } = jest.requireActual(preview);
        if (decorators) {
            decorators.forEach((decorator) => storybook.addDecorator(decorator));
        }
        if (parameters || globals || globalTypes) {
            storybook.addParameters({ ...parameters, globals, globalTypes });
        }
        if (runStep) {
            storybook.addStepRunner(runStep);
        }
        if (argsEnhancers) {
            argsEnhancers.forEach((enhancer) => storybook.addArgsEnhancer(enhancer));
        }
        if (argTypesEnhancers) {
            argTypesEnhancers.forEach((enhancer) => storybook.addArgTypesEnhancer(enhancer));
        }
    }
    if (requireContexts && requireContexts.length) {
        storybook.configure(requireContexts, false, false);
    }
}
exports.default = configure;