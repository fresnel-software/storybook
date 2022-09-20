"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureActions = exports.config = void 0;
const config = {
  depth: 10,
  clearOnStoryChange: true,
  limit: 50
};
exports.config = config;

const configureActions = (options = {}) => {
  Object.assign(config, options);
};

exports.configureActions = configureActions;