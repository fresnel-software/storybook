"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babelParse = void 0;

var _parser = require("@babel/parser");

const babelParse = code => (0, _parser.parse)(code, {
  sourceType: 'module',
  // FIXME: we should get this from the project config somehow?
  plugins: ['jsx', 'typescript', ['decorators', {
    decoratorsBeforeExport: true
  }], 'classProperties'],
  tokens: true
});

exports.babelParse = babelParse;