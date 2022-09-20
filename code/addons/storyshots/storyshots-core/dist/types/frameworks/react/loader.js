"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = __importDefault(require("../configure"));
const hasDependency_1 = __importDefault(require("../hasDependency"));
function test(options) {
    return options.framework === 'react' || (!options.framework && (0, hasDependency_1.default)('@storybook/react'));
}
function load(options) {
    const storybook = jest.requireActual('@storybook/react');
    (0, configure_1.default)({ ...options, storybook });
    return {
        framework: 'react',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: jest.requireActual('./renderShallowTree').default,
        storybook,
    };
}
const reactLoader = {
    load,
    test,
};
exports.default = reactLoader;
