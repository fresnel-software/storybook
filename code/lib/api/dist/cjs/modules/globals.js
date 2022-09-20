"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _coreEvents = require("@storybook/core-events");

var _clientLogger = require("@storybook/client-logger");

var _dequal = require("dequal");

var _events = require("../lib/events");

const init = ({
  store,
  fullAPI
}) => {
  const api = {
    getGlobals() {
      return store.getState().globals;
    },

    getGlobalTypes() {
      return store.getState().globalTypes;
    },

    updateGlobals(newGlobals) {
      // Only emit the message to the local ref
      fullAPI.emit(_coreEvents.UPDATE_GLOBALS, {
        globals: newGlobals,
        options: {
          target: 'storybook-preview-iframe'
        }
      });
    }

  };
  const state = {
    globals: {},
    globalTypes: {}
  };

  const updateGlobals = globals => {
    var _store$getState;

    const currentGlobals = (_store$getState = store.getState()) === null || _store$getState === void 0 ? void 0 : _store$getState.globals;

    if (!(0, _dequal.dequal)(globals, currentGlobals)) {
      store.setState({
        globals
      });
    }
  };

  const initModule = () => {
    fullAPI.on(_coreEvents.GLOBALS_UPDATED, function handleGlobalsUpdated({
      globals
    }) {
      const {
        ref
      } = (0, _events.getEventMetadata)(this, fullAPI);

      if (!ref) {
        updateGlobals(globals);
      } else {
        _clientLogger.logger.warn('received a GLOBALS_UPDATED from a non-local ref. This is not currently supported.');
      }
    }); // Emitted by the preview on initialization

    fullAPI.on(_coreEvents.SET_GLOBALS, function handleSetStories({
      globals,
      globalTypes
    }) {
      var _store$getState2;

      const {
        ref
      } = (0, _events.getEventMetadata)(this, fullAPI);
      const currentGlobals = (_store$getState2 = store.getState()) === null || _store$getState2 === void 0 ? void 0 : _store$getState2.globals;

      if (!ref) {
        store.setState({
          globals,
          globalTypes
        });
      } else if (Object.keys(globals).length > 0) {
        _clientLogger.logger.warn('received globals from a non-local ref. This is not currently supported.');
      }

      if (currentGlobals && Object.keys(currentGlobals).length !== 0 && !(0, _dequal.dequal)(globals, currentGlobals)) {
        api.updateGlobals(currentGlobals);
      }
    });
  };

  return {
    api,
    state,
    init: initModule
  };
};

exports.init = init;