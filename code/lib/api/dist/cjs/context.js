"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = void 0;

var _react = require("react");

const createContext = ({
  api,
  state
}) => /*#__PURE__*/(0, _react.createContext)({
  api,
  state
});

exports.createContext = createContext;