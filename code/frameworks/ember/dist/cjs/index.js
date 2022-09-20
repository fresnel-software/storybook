"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "addDecorator", {
  enumerable: true,
  get: function () {
    return _preview.addDecorator;
  }
});
Object.defineProperty(exports, "addParameters", {
  enumerable: true,
  get: function () {
    return _preview.addParameters;
  }
});
Object.defineProperty(exports, "configure", {
  enumerable: true,
  get: function () {
    return _preview.configure;
  }
});
Object.defineProperty(exports, "forceReRender", {
  enumerable: true,
  get: function () {
    return _preview.forceReRender;
  }
});
Object.defineProperty(exports, "getStorybook", {
  enumerable: true,
  get: function () {
    return _preview.getStorybook;
  }
});
Object.defineProperty(exports, "raw", {
  enumerable: true,
  get: function () {
    return _preview.raw;
  }
});
Object.defineProperty(exports, "setAddon", {
  enumerable: true,
  get: function () {
    return _preview.setAddon;
  }
});
Object.defineProperty(exports, "storiesOf", {
  enumerable: true,
  get: function () {
    return _preview.storiesOf;
  }
});

var _preview = require("./client/preview");

var _module, _module$hot;

// optimization: stop HMR propagation in webpack
(_module = module) === null || _module === void 0 ? void 0 : (_module$hot = _module.hot) === null || _module$hot === void 0 ? void 0 : _module$hot.decline();