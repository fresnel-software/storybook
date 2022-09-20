"use strict";

var _global = _interopRequireDefault(require("global"));

var _ui = require("@storybook/ui");

var _provider = _interopRequireDefault(require("./provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  document
} = _global.default; // We need to wait a promise "tick" to allow all subsequent addons etc to execute
// (alternatively, we could ensure this entry point is always loaded last)

Promise.resolve().then(() => {
  const rootEl = document.getElementById('root');
  (0, _ui.renderStorybookUI)(rootEl, new _provider.default());
});