"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addDecorator = require("./addDecorator");

Object.keys(_addDecorator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _addDecorator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _addDecorator[key];
    }
  });
});

var _addArgs = require("./addArgs");

Object.keys(_addArgs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _addArgs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _addArgs[key];
    }
  });
});