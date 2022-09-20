"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storiesOf = exports.setAddon = exports.raw = exports.getStorybook = exports.forceReRender = exports.configure = exports.clearDecorators = exports.addParameters = exports.addDecorator = void 0;

var _coreClient = require("@storybook/core-client");

require("./globals");

var _render = require("./render");

const {
  configure: coreConfigure,
  clientApi,
  forceReRender
} = (0, _coreClient.start)(_render.renderToDOM);
exports.forceReRender = forceReRender;
const {
  setAddon,
  addDecorator,
  addParameters,
  clearDecorators,
  getStorybook,
  raw
} = clientApi;
exports.raw = raw;
exports.getStorybook = getStorybook;
exports.clearDecorators = clearDecorators;
exports.addParameters = addParameters;
exports.addDecorator = addDecorator;
exports.setAddon = setAddon;
const FRAMEWORK = 'ember';

const storiesOf = (kind, m) => clientApi.storiesOf(kind, m).addParameters({
  framework: FRAMEWORK
});

exports.storiesOf = storiesOf;

const configure = (loadable, m) => coreConfigure(FRAMEWORK, loadable, m);

exports.configure = configure;