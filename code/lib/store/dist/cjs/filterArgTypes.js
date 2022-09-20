"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArgTypes = void 0;

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const matches = (name, descriptor) => Array.isArray(descriptor) ? descriptor.includes(name) : name.match(descriptor);

const filterArgTypes = (argTypes, include, exclude) => {
  if (!include && !exclude) {
    return argTypes;
  }

  return argTypes && (0, _pickBy.default)(argTypes, (argType, key) => {
    const name = argType.name || key;
    return (!include || matches(name, include)) && (!exclude || !matches(name, exclude));
  });
};

exports.filterArgTypes = filterArgTypes;