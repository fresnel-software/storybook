"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpack = exports.entries = exports.babel = void 0;

var _iframeWebpack = _interopRequireDefault(require("../preview/iframe-webpack.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var webpack = async function (_, options) {
  return (0, _iframeWebpack.default)(options);
};

exports.webpack = webpack;

var entries = async function (_, options) {
  var result = [];

  if (options.configType === 'DEVELOPMENT') {
    // Suppress informational messages when --quiet is specified. webpack-hot-middleware's quiet
    // parameter would also suppress warnings.
    result = result.concat(`${require.resolve('webpack-hot-middleware/client')}?reload=true&quiet=false&noInfo=${options.quiet}`);
  }

  return result;
};

exports.entries = entries;

var babel = async function (config, options) {
  return _objectSpread(_objectSpread({}, config), {}, {
    overrides: [...((config === null || config === void 0 ? void 0 : config.overrides) || []), {
      test: /\.(story|stories).*$/,
      plugins: [require.resolve('babel-plugin-named-exports-order')]
    }]
  });
};

exports.babel = babel;