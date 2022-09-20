"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inferControls = exports.argTypesEnhancers = void 0;

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _clientLogger = require("@storybook/client-logger");

var _filterArgTypes = require("./filterArgTypes");

var _parameters = require("./parameters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inferControl = (argType, name, matchers) => {
  const {
    type,
    options
  } = argType;

  if (!type) {
    return undefined;
  } // args that end with background or color e.g. iconColor


  if (matchers.color && matchers.color.test(name)) {
    const controlType = type.name;

    if (controlType === 'string') {
      return {
        control: {
          type: 'color'
        }
      };
    }

    if (controlType !== 'enum') {
      _clientLogger.logger.warn(`Addon controls: Control of type color only supports string, received "${controlType}" instead`);
    }
  } // args that end with date e.g. purchaseDate


  if (matchers.date && matchers.date.test(name)) {
    return {
      control: {
        type: 'date'
      }
    };
  }

  switch (type.name) {
    case 'array':
      return {
        control: {
          type: 'object'
        }
      };

    case 'boolean':
      return {
        control: {
          type: 'boolean'
        }
      };

    case 'string':
      return {
        control: {
          type: 'text'
        }
      };

    case 'number':
      return {
        control: {
          type: 'number'
        }
      };

    case 'enum':
      {
        const {
          value
        } = type;
        return {
          control: {
            type: (value === null || value === void 0 ? void 0 : value.length) <= 5 ? 'radio' : 'select'
          },
          options: value
        };
      }

    case 'function':
    case 'symbol':
      return null;

    default:
      return {
        control: {
          type: options ? 'select' : 'object'
        }
      };
  }
};

const inferControls = context => {
  const {
    argTypes,
    parameters: {
      __isArgsStory,
      controls: {
        include = null,
        exclude = null,
        matchers = {}
      } = {}
    }
  } = context;
  if (!__isArgsStory) return argTypes;
  const filteredArgTypes = (0, _filterArgTypes.filterArgTypes)(argTypes, include, exclude);
  const withControls = (0, _mapValues.default)(filteredArgTypes, (argType, name) => {
    return (argType === null || argType === void 0 ? void 0 : argType.type) && inferControl(argType, name, matchers);
  });
  return (0, _parameters.combineParameters)(withControls, filteredArgTypes);
};

exports.inferControls = inferControls;
inferControls.secondPass = true;
const argTypesEnhancers = [inferControls];
exports.argTypesEnhancers = argTypesEnhancers;