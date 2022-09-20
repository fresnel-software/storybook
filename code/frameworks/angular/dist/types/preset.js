"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescript = exports.core = exports.previewAnnotations = exports.addons = void 0;
const path_1 = __importDefault(require("path"));
exports.addons = [
    require.resolve('./server/framework-preset-angular'),
    require.resolve('./server/framework-preset-angular-cli'),
    require.resolve('./server/framework-preset-angular-ivy'),
    require.resolve('./server/framework-preset-angular-docs'),
];
const previewAnnotations = (entries = []) => [
    ...entries,
    require.resolve('./client/config'),
];
exports.previewAnnotations = previewAnnotations;
const core = async (config, options) => {
    const framework = await options.presets.apply('framework');
    return {
        ...config,
        builder: {
            name: path_1.default.dirname(require.resolve(path_1.default.join('@storybook/builder-webpack5', 'package.json'))),
            options: typeof framework === 'string' ? {} : framework.options.builder || {},
        },
    };
};
exports.core = core;
const typescript = async (config) => {
    return {
        ...config,
        skipBabel: true,
    };
};
exports.typescript = typescript;
