"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _build = require("./build");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _extractSource = require("./extract-source");

Object.keys(_extractSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _extractSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _extractSource[key];
    }
  });
});
// @ts-expect-error (Converted from ts-ignore)
var _default = _build.transform;
exports.default = _default;