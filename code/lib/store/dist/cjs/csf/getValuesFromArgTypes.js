"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValuesFromArgTypes = void 0;

const getValuesFromArgTypes = (argTypes = {}) => Object.entries(argTypes).reduce((acc, [arg, {
  defaultValue
}]) => {
  if (typeof defaultValue !== 'undefined') {
    acc[arg] = defaultValue;
  }

  return acc;
}, {});

exports.getValuesFromArgTypes = getValuesFromArgTypes;