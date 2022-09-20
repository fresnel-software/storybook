"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inferArgTypes = void 0;

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _tsDedent = require("ts-dedent");

var _clientLogger = require("@storybook/client-logger");

var _parameters = require("./parameters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inferType = (value, name, visited) => {
  const type = typeof value;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'function':
    case 'symbol':
      return {
        name: type
      };

    default:
      break;
  }

  if (value) {
    if (visited.has(value)) {
      _clientLogger.logger.warn((0, _tsDedent.dedent)`
        We've detected a cycle in arg '${name}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/react/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/react/essentials/controls#fully-custom-args
      `);

      return {
        name: 'other',
        value: 'cyclic object'
      };
    }

    visited.add(value);

    if (Array.isArray(value)) {
      const childType = value.length > 0 ? inferType(value[0], name, new Set(visited)) : {
        name: 'other',
        value: 'unknown'
      };
      return {
        name: 'array',
        value: childType
      };
    }

    const fieldTypes = (0, _mapValues.default)(value, field => inferType(field, name, new Set(visited)));
    return {
      name: 'object',
      value: fieldTypes
    };
  }

  return {
    name: 'object',
    value: {}
  };
};

const inferArgTypes = context => {
  const {
    id,
    argTypes: userArgTypes = {},
    initialArgs = {}
  } = context;
  const argTypes = (0, _mapValues.default)(initialArgs, (arg, key) => ({
    name: key,
    type: inferType(arg, `${id}.${key}`, new Set())
  }));
  const userArgTypesNames = (0, _mapValues.default)(userArgTypes, (argType, key) => ({
    name: key
  }));
  return (0, _parameters.combineParameters)(argTypes, userArgTypesNames, userArgTypes);
};

exports.inferArgTypes = inferArgTypes;
inferArgTypes.secondPass = true;