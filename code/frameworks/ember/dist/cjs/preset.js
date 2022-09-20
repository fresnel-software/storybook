"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.core = exports.addons = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addons = [require.resolve('./server/framework-preset-babel-ember'), require.resolve('./server/framework-preset-ember-docs')];
exports.addons = addons;

const core = async (config, options) => {
  const framework = await options.presets.apply('framework');
  return Object.assign({}, config, {
    builder: {
      name: _path.default.dirname(require.resolve(_path.default.join('@storybook/builder-webpack5', 'package.json'))),
      options: typeof framework === 'string' ? {} : framework.options.builder || {}
    }
  });
};

exports.core = core;