"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parameters = exports.argTypesEnhancers = void 0;

var _docsTools = require("@storybook/docs-tools");

var _jsondoc = require("./jsondoc");

const parameters = {
  docs: {
    iframeHeight: 80,
    extractArgTypes: _jsondoc.extractArgTypes,
    extractComponentDescription: _jsondoc.extractComponentDescription
  }
};
exports.parameters = parameters;
const argTypesEnhancers = [_docsTools.enhanceArgTypes];
exports.argTypesEnhancers = argTypesEnhancers;