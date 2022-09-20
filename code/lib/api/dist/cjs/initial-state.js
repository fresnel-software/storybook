"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge = _interopRequireDefault(require("./lib/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the initialState of the app
const main = (...additions) => additions.reduce((acc, item) => (0, _merge.default)(acc, item), {});

var _default = main;
exports.default = _default;