"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _envsRaw = require("./envs-raw.type");

Object.keys(_envsRaw).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _envsRaw[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _envsRaw[key];
    }
  });
});

var _extendedOptions = require("./extended-options.type");

Object.keys(_extendedOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _extendedOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _extendedOptions[key];
    }
  });
});