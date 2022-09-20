"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typescript = exports.title = exports.storyIndexers = exports.previewMainTemplate = exports.previewHead = exports.previewBody = exports.previewAnnotations = exports.logLevel = exports.frameworkOptions = exports.features = exports.env = exports.docs = exports.core = exports.babel = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _coreCommon = require("@storybook/core-common");

var _csfTools = require("@storybook/csf-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var warnConfigField = (0, _utilDeprecate.default)(function () {}, `You (or an addon) are using the 'config' preset field. This has been replaced by 'previewAnnotations' and will be removed in 8.0`);

var babel = async function (_, options) {
  var presets = options.presets;
  return presets.apply('babelDefault', {}, options);
};

exports.babel = babel;

var title = function (previous, options) {
  return previous || options.packageJson.name || false;
};

exports.title = title;

var logLevel = function (previous, options) {
  return previous || options.loglevel || 'info';
};

exports.logLevel = logLevel;

var previewHead = async function (base, {
  configDir: configDir,
  presets: presets
}) {
  var interpolations = await presets.apply('env');
  return (0, _coreCommon.getPreviewHeadTemplate)(configDir, interpolations);
};

exports.previewHead = previewHead;

var env = async function () {
  return (0, _coreCommon.loadEnvs)({
    production: true
  }).raw;
};

exports.env = env;

var previewBody = async function (base, {
  configDir: configDir,
  presets: presets
}) {
  var interpolations = await presets.apply('env');
  return (0, _coreCommon.getPreviewBodyTemplate)(configDir, interpolations);
};

exports.previewBody = previewBody;

var previewMainTemplate = function () {
  return (0, _coreCommon.getPreviewMainTemplate)();
};

exports.previewMainTemplate = previewMainTemplate;

var typescript = function () {
  return {
    check: false,
    // 'react-docgen' faster but produces lower quality typescript results
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: function (prop) {
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
      // NOTE: this default cannot be changed
      savePropValueAsString: true
    }
  };
};

exports.typescript = typescript;

var optionalEnvToBoolean = function (input) {
  if (input === undefined) {
    return undefined;
  }

  if (input.toUpperCase() === 'FALSE') {
    return false;
  }

  if (input.toUpperCase() === 'TRUE') {
    return true;
  }

  if (typeof input === 'string') {
    return true;
  }

  return undefined;
};
/**
 * If for some reason this config is not applied, the reason is that
 * likely there is an addon that does `export core = () => ({ someConfig })`,
 * instead of `export core = (existing) => ({ ...existing, someConfig })`,
 * just overwriting everything and not merging with the existing values.
 */


var core = async function (existing, options) {
  return _objectSpread(_objectSpread({}, existing), {}, {
    disableTelemetry: options.disableTelemetry === true,
    enableCrashReports: options.enableCrashReports || optionalEnvToBoolean(process.env.STORYBOOK_ENABLE_CRASH_REPORTS)
  });
};

exports.core = core;

var previewAnnotations = async function (base, options) {
  var config = await options.presets.apply('config', [], options);
  if (config.length > 0) warnConfigField();
  return [...config, require.resolve('@storybook/core-client/dist/esm/globals/globals'), ...base];
};

exports.previewAnnotations = previewAnnotations;

var features = async function (existing) {
  return _objectSpread(_objectSpread({}, existing), {}, {
    postcss: true,
    warnOnLegacyHierarchySeparator: true,
    buildStoriesJson: false,
    storyStoreV7: true,
    breakingChangesV7: true,
    interactionsDebugger: false,
    babelModeV7: true,
    argTypeTargetsV7: true,
    previewMdx2: false
  });
};

exports.features = features;

var storyIndexers = async function (indexers) {
  var csfIndexer = async function (fileName, opts) {
    var code = (await _fsExtra.default.readFile(fileName, 'utf-8')).toString();
    return (0, _csfTools.loadCsf)(code, _objectSpread(_objectSpread({}, opts), {}, {
      fileName: fileName
    })).parse();
  };

  return [{
    test: /(stories|story)\.[tj]sx?$/,
    indexer: csfIndexer
  }, ...(indexers || [])];
};

exports.storyIndexers = storyIndexers;

var frameworkOptions = async function (_, options) {
  var config = await options.presets.apply('framework');

  if (typeof config === 'string') {
    return {};
  }

  if (typeof config === 'undefined') {
    return null;
  }

  return config.options;
};

exports.frameworkOptions = frameworkOptions;

var docs = function (docsOptions, {
  docs: docsMode
}) {
  return _objectSpread(_objectSpread({}, docsOptions), {}, {
    docsMode: docsMode
  });
};

exports.docs = docs;