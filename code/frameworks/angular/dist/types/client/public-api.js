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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = void 0;
const core_client_1 = require("@storybook/core-client");
const render_1 = require("./render");
const decorateStory_1 = __importDefault(require("./decorateStory"));
__exportStar(require("./public-types"), exports);
const FRAMEWORK = 'angular';
const api = (0, core_client_1.start)(render_1.renderToDOM, { decorateStory: decorateStory_1.default, render: render_1.render });
const storiesOf = (kind, m) => {
    return api.clientApi.storiesOf(kind, m).addParameters({
        framework: FRAMEWORK,
    });
};
exports.storiesOf = storiesOf;
const configure = (...args) => api.configure(FRAMEWORK, ...args);
exports.configure = configure;
exports.addDecorator = api.clientApi
    .addDecorator;
exports.addParameters = api.clientApi
    .addParameters;
exports.clearDecorators = api.clientApi.clearDecorators;
exports.setAddon = api.clientApi.setAddon;
exports.forceReRender = api.forceReRender;
exports.getStorybook = api.clientApi.getStorybook;
exports.raw = api.clientApi.raw;
