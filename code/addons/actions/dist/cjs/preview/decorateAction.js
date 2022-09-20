"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateAction = exports.decorate = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = require("ts-dedent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const decorateAction = _decorators => {
  return (0, _utilDeprecate.default)(() => {}, (0, _tsDedent.dedent)`
    decorateAction is no longer supported as of Storybook 6.0.
  `);
};

exports.decorateAction = decorateAction;
const deprecatedCallback = (0, _utilDeprecate.default)(() => {}, 'decorate.* is no longer supported as of Storybook 6.0.');

const decorate = _decorators => {
  return (0, _utilDeprecate.default)(() => {
    return {
      action: deprecatedCallback,
      actions: deprecatedCallback,
      withActions: deprecatedCallback
    };
  }, (0, _tsDedent.dedent)`
    decorate is deprecated, please configure addon-actions using the addParameter api:
      
      addParameters({
        actions: {
          handles: options
        },
      });
    `);
};

exports.decorate = decorate;