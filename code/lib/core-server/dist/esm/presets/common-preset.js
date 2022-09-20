function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import fs from 'fs-extra';
import deprecate from 'util-deprecate';
import { getPreviewBodyTemplate, getPreviewHeadTemplate, getPreviewMainTemplate, loadEnvs } from '@storybook/core-common';
import { loadCsf } from '@storybook/csf-tools';
var warnConfigField = deprecate(function () {}, `You (or an addon) are using the 'config' preset field. This has been replaced by 'previewAnnotations' and will be removed in 8.0`);
export var babel = async function (_, options) {
  var presets = options.presets;
  return presets.apply('babelDefault', {}, options);
};
export var title = function (previous, options) {
  return previous || options.packageJson.name || false;
};
export var logLevel = function (previous, options) {
  return previous || options.loglevel || 'info';
};
export var previewHead = async function (base, {
  configDir: configDir,
  presets: presets
}) {
  var interpolations = await presets.apply('env');
  return getPreviewHeadTemplate(configDir, interpolations);
};
export var env = async function () {
  return loadEnvs({
    production: true
  }).raw;
};
export var previewBody = async function (base, {
  configDir: configDir,
  presets: presets
}) {
  var interpolations = await presets.apply('env');
  return getPreviewBodyTemplate(configDir, interpolations);
};
export var previewMainTemplate = function () {
  return getPreviewMainTemplate();
};
export var typescript = function () {
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


export var core = async function (existing, options) {
  return _objectSpread(_objectSpread({}, existing), {}, {
    disableTelemetry: options.disableTelemetry === true,
    enableCrashReports: options.enableCrashReports || optionalEnvToBoolean(process.env.STORYBOOK_ENABLE_CRASH_REPORTS)
  });
};
export var previewAnnotations = async function (base, options) {
  var config = await options.presets.apply('config', [], options);
  if (config.length > 0) warnConfigField();
  return [...config, require.resolve('@storybook/core-client/dist/esm/globals/globals'), ...base];
};
export var features = async function (existing) {
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
export var storyIndexers = async function (indexers) {
  var csfIndexer = async function (fileName, opts) {
    var code = (await fs.readFile(fileName, 'utf-8')).toString();
    return loadCsf(code, _objectSpread(_objectSpread({}, opts), {}, {
      fileName: fileName
    })).parse();
  };

  return [{
    test: /(stories|story)\.[tj]sx?$/,
    indexer: csfIndexer
  }, ...(indexers || [])];
};
export var frameworkOptions = async function (_, options) {
  var config = await options.presets.apply('framework');

  if (typeof config === 'string') {
    return {};
  }

  if (typeof config === 'undefined') {
    return null;
  }

  return config.options;
};
export var docs = function (docsOptions, {
  docs: docsMode
}) {
  return _objectSpread(_objectSpread({}, docsOptions), {}, {
    docsMode: docsMode
  });
};