"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalsStore = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = require("ts-dedent");

var _args = require("./args");

var _getValuesFromArgTypes = require("./csf/getValuesFromArgTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setUndeclaredWarning = (0, _utilDeprecate.default)(() => {}, (0, _tsDedent.dedent)`
    Setting a global value that is undeclared (i.e. not in the user's initial set of globals
    or globalTypes) is deprecated and will have no effect in 7.0.
  `);

class GlobalsStore {
  // We use ! here because TS doesn't analyse the .set() function to see if it actually get set
  constructor({
    globals = {},
    globalTypes = {}
  }) {
    this.allowedGlobalNames = void 0;
    this.initialGlobals = void 0;
    this.globals = void 0;
    this.set({
      globals,
      globalTypes
    });
  }

  set({
    globals = {},
    globalTypes = {}
  }) {
    const delta = this.initialGlobals && (0, _args.deepDiff)(this.initialGlobals, this.globals);
    this.allowedGlobalNames = new Set([...Object.keys(globals), ...Object.keys(globalTypes)]);
    const defaultGlobals = (0, _getValuesFromArgTypes.getValuesFromArgTypes)(globalTypes);
    this.initialGlobals = Object.assign({}, defaultGlobals, globals);
    this.globals = this.initialGlobals;

    if (delta && delta !== _args.DEEPLY_EQUAL) {
      this.updateFromPersisted(delta);
    }
  }

  filterAllowedGlobals(globals) {
    return Object.entries(globals).reduce((acc, [key, value]) => {
      if (this.allowedGlobalNames.has(key)) acc[key] = value;
      return acc;
    }, {});
  }

  updateFromPersisted(persisted) {
    const allowedUrlGlobals = this.filterAllowedGlobals(persisted); // Note that unlike args, we do not have the same type information for globals to allow us
    // to type check them here, so we just set them naively

    this.globals = Object.assign({}, this.globals, allowedUrlGlobals);
  }

  get() {
    return this.globals;
  }

  update(newGlobals) {
    Object.keys(newGlobals).forEach(key => {
      if (!this.allowedGlobalNames.has(key)) {
        setUndeclaredWarning();
      }
    });
    this.globals = Object.assign({}, this.globals, newGlobals);
  }

}

exports.GlobalsStore = GlobalsStore;