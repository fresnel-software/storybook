"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.argsEnhancers = void 0;

var _addArgsHelpers = require("./addArgsHelpers");

const argsEnhancers = [_addArgsHelpers.addActionsFromArgTypes, _addArgsHelpers.inferActionsFromArgTypesRegex];
exports.argsEnhancers = argsEnhancers;