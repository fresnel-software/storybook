"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeComponentAnnotations = normalizeComponentAnnotations;

var _csf = require("@storybook/csf");

var _normalizeInputTypes = require("./normalizeInputTypes");

function normalizeComponentAnnotations(defaultExport, title = defaultExport.title, importPath) {
  const {
    id,
    argTypes
  } = defaultExport;
  return Object.assign({
    id: (0, _csf.sanitize)(id || title)
  }, defaultExport, {
    title
  }, argTypes && {
    argTypes: (0, _normalizeInputTypes.normalizeInputTypes)(argTypes)
  }, {
    parameters: Object.assign({
      fileName: importPath
    }, defaultExport.parameters)
  });
}