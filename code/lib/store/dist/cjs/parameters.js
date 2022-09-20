"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineParameters = void 0;

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utilities for handling parameters

/**
 * Safely combine parameters recursively. Only copy objects when needed.
 * Algorithm = always overwrite the existing value UNLESS both values
 * are plain objects. In this case flag the key as "special" and handle
 * it with a heuristic.
 */
const combineParameters = (...parameterSets) => {
  const mergeKeys = {};
  const definedParametersSets = parameterSets.filter(Boolean);
  const combined = definedParametersSets.reduce((acc, parameters) => {
    Object.entries(parameters).forEach(([key, value]) => {
      const existing = acc[key];

      if (Array.isArray(value) || typeof existing === 'undefined') {
        acc[key] = value;
      } else if ((0, _isPlainObject.default)(value) && (0, _isPlainObject.default)(existing)) {
        // do nothing, we'll handle this later
        mergeKeys[key] = true;
      } else if (typeof value !== 'undefined') {
        acc[key] = value;
      }
    });
    return acc;
  }, {});
  Object.keys(mergeKeys).forEach(key => {
    const mergeValues = definedParametersSets.filter(Boolean).map(p => p[key]).filter(value => typeof value !== 'undefined');

    if (mergeValues.every(value => (0, _isPlainObject.default)(value))) {
      combined[key] = combineParameters(...mergeValues);
    } else {
      combined[key] = mergeValues[mergeValues.length - 1];
    }
  });
  return combined;
};

exports.combineParameters = combineParameters;