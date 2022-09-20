"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.STORAGE_KEY = void 0;

var _store = _interopRequireDefault(require("store2"));

var _storeSetup = _interopRequireDefault(require("./lib/store-setup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setting up the store, overriding set and get to use telejson
(0, _storeSetup.default)(_store.default._);
const STORAGE_KEY = '@storybook/ui/store';
exports.STORAGE_KEY = STORAGE_KEY;

function get(storage) {
  const data = storage.get(STORAGE_KEY);
  return data || {};
}

function set(storage, value) {
  return storage.set(STORAGE_KEY, value);
}

function update(storage, patch) {
  const previous = get(storage); // Apply the same behaviour as react here

  return set(storage, Object.assign({}, previous, patch));
}

// Our store piggybacks off the internal React state of the Context Provider
// It has been augmented to persist state to local/sessionStorage
class Store {
  constructor({
    setState,
    getState
  }) {
    this.upstreamGetState = void 0;
    this.upstreamSetState = void 0;
    this.upstreamSetState = setState;
    this.upstreamGetState = getState;
  } // The assumption is that this will be called once, to initialize the React state
  // when the module is instantiated


  getInitialState(base) {
    // We don't only merge at the very top level (the same way as React setState)
    // when you set keys, so it makes sense to do the same in combining the two storage modes
    // Really, you shouldn't store the same key in both places
    return Object.assign({}, base, get(_store.default.local), get(_store.default.session));
  }

  getState() {
    return this.upstreamGetState();
  }

  async setState(inputPatch, cbOrOptions, inputOptions) {
    let callback;
    let options;

    if (typeof cbOrOptions === 'function') {
      callback = cbOrOptions;
      options = inputOptions;
    } else {
      options = cbOrOptions;
    }

    const {
      persistence = 'none'
    } = options || {};
    let patch = {}; // What did the patch actually return

    let delta = {};

    if (typeof inputPatch === 'function') {
      // Pass the same function, but set delta on the way
      patch = state => {
        const getDelta = inputPatch;
        delta = getDelta(state);
        return delta;
      };
    } else {
      patch = inputPatch;
      delta = patch;
    }

    const newState = await new Promise(resolve => {
      this.upstreamSetState(patch, resolve);
    });

    if (persistence !== 'none') {
      const storage = persistence === 'session' ? _store.default.session : _store.default.local;
      await update(storage, delta);
    }

    if (callback) {
      callback(newState);
    }

    return newState;
  }

}

exports.default = Store;