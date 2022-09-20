"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepDiff = exports.combineArgs = exports.NO_TARGET_NAME = exports.DEEPLY_EQUAL = void 0;
exports.groupArgsByTarget = groupArgsByTarget;
exports.mapArgsToTypes = void 0;
exports.noTargetArgs = noTargetArgs;
exports.validateOptions = void 0;

var _dequal = require("dequal");

var _clientLogger = require("@storybook/client-logger");

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _tsDedent = require("ts-dedent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INCOMPATIBLE = Symbol('incompatible');

const map = (arg, argType) => {
  const type = argType.type;
  if (arg === undefined || arg === null || !type) return arg;

  if (argType.mapping) {
    return arg;
  }

  switch (type.name) {
    case 'string':
      return String(arg);

    case 'enum':
      return arg;

    case 'number':
      return Number(arg);

    case 'boolean':
      return arg === 'true';

    case 'array':
      if (!type.value || !Array.isArray(arg)) return INCOMPATIBLE;
      return arg.reduce((acc, item, index) => {
        const mapped = map(item, {
          type: type.value
        });
        if (mapped !== INCOMPATIBLE) acc[index] = mapped;
        return acc;
      }, new Array(arg.length));

    case 'object':
      if (typeof arg === 'string' || typeof arg === 'number') return arg;
      if (!type.value || typeof arg !== 'object') return INCOMPATIBLE;
      return Object.entries(arg).reduce((acc, [key, val]) => {
        const mapped = map(val, {
          type: type.value[key]
        });
        return mapped === INCOMPATIBLE ? acc : Object.assign(acc, {
          [key]: mapped
        });
      }, {});

    default:
      return INCOMPATIBLE;
  }
};

const mapArgsToTypes = (args, argTypes) => {
  return Object.entries(args).reduce((acc, [key, value]) => {
    if (!argTypes[key]) return acc;
    const mapped = map(value, argTypes[key]);
    return mapped === INCOMPATIBLE ? acc : Object.assign(acc, {
      [key]: mapped
    });
  }, {});
};

exports.mapArgsToTypes = mapArgsToTypes;

const combineArgs = (value, update) => {
  if (Array.isArray(value) && Array.isArray(update)) {
    return update.reduce((acc, upd, index) => {
      acc[index] = combineArgs(value[index], update[index]);
      return acc;
    }, [...value]).filter(v => v !== undefined);
  }

  if (!(0, _isPlainObject.default)(value) || !(0, _isPlainObject.default)(update)) return update;
  return Object.keys(Object.assign({}, value, update)).reduce((acc, key) => {
    if (key in update) {
      const combined = combineArgs(value[key], update[key]);
      if (combined !== undefined) acc[key] = combined;
    } else {
      acc[key] = value[key];
    }

    return acc;
  }, {});
};

exports.combineArgs = combineArgs;

const validateOptions = (args, argTypes) => {
  return Object.entries(argTypes).reduce((acc, [key, {
    options
  }]) => {
    // Don't set args that are not defined in `args` (they can be undefined in there)
    // see https://github.com/storybookjs/storybook/issues/15630 and
    //   https://github.com/storybookjs/storybook/issues/17063
    function allowArg() {
      if (key in args) {
        acc[key] = args[key];
      }

      return acc;
    }

    if (!options) return allowArg();

    if (!Array.isArray(options)) {
      _clientLogger.once.error((0, _tsDedent.dedent)`
        Invalid argType: '${key}.options' should be an array.

        More info: https://storybook.js.org/docs/react/api/argtypes
      `);

      return allowArg();
    }

    if (options.some(opt => opt && ['object', 'function'].includes(typeof opt))) {
      _clientLogger.once.error((0, _tsDedent.dedent)`
        Invalid argType: '${key}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/react/writing-stories/args#mapping-to-complex-arg-values
      `);

      return allowArg();
    }

    const isArray = Array.isArray(args[key]);
    const invalidIndex = isArray && args[key].findIndex(val => !options.includes(val));
    const isValidArray = isArray && invalidIndex === -1;

    if (args[key] === undefined || options.includes(args[key]) || isValidArray) {
      return allowArg();
    }

    const field = isArray ? `${key}[${invalidIndex}]` : key;
    const supportedOptions = options.map(opt => typeof opt === 'string' ? `'${opt}'` : String(opt)).join(', ');

    _clientLogger.once.warn(`Received illegal value for '${field}'. Supported options: ${supportedOptions}`);

    return acc;
  }, {});
}; // TODO -- copied from router, needs to be in a shared location


exports.validateOptions = validateOptions;
const DEEPLY_EQUAL = Symbol('Deeply equal');
exports.DEEPLY_EQUAL = DEEPLY_EQUAL;

const deepDiff = (value, update) => {
  if (typeof value !== typeof update) return update;
  if ((0, _dequal.dequal)(value, update)) return DEEPLY_EQUAL;

  if (Array.isArray(value) && Array.isArray(update)) {
    const res = update.reduce((acc, upd, index) => {
      const diff = deepDiff(value[index], upd);
      if (diff !== DEEPLY_EQUAL) acc[index] = diff;
      return acc;
    }, new Array(update.length));
    if (update.length >= value.length) return res;
    return res.concat(new Array(value.length - update.length).fill(undefined));
  }

  if ((0, _isPlainObject.default)(value) && (0, _isPlainObject.default)(update)) {
    return Object.keys(Object.assign({}, value, update)).reduce((acc, key) => {
      const diff = deepDiff(value === null || value === void 0 ? void 0 : value[key], update === null || update === void 0 ? void 0 : update[key]);
      return diff === DEEPLY_EQUAL ? acc : Object.assign(acc, {
        [key]: diff
      });
    }, {});
  }

  return update;
};

exports.deepDiff = deepDiff;
const NO_TARGET_NAME = '';
exports.NO_TARGET_NAME = NO_TARGET_NAME;

function groupArgsByTarget({
  args,
  argTypes
}) {
  const groupedArgs = {};
  Object.entries(args).forEach(([name, value]) => {
    const {
      target = NO_TARGET_NAME
    } = argTypes[name] || {};
    groupedArgs[target] = groupedArgs[target] || {};
    groupedArgs[target][name] = value;
  });
  return groupedArgs;
}

function noTargetArgs(context) {
  return groupArgsByTarget(context)[NO_TARGET_NAME];
}