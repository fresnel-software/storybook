import { SET_GLOBALS, UPDATE_GLOBALS, GLOBALS_UPDATED } from '@storybook/core-events';
import { logger } from '@storybook/client-logger';
import { dequal as deepEqual } from 'dequal';
import { getEventMetadata } from '../lib/events';
export const init = ({
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
      fullAPI.emit(UPDATE_GLOBALS, {
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
    const currentGlobals = store.getState()?.globals;

    if (!deepEqual(globals, currentGlobals)) {
      store.setState({
        globals
      });
    }
  };

  const initModule = () => {
    fullAPI.on(GLOBALS_UPDATED, function handleGlobalsUpdated({
      globals
    }) {
      const {
        ref
      } = getEventMetadata(this, fullAPI);

      if (!ref) {
        updateGlobals(globals);
      } else {
        logger.warn('received a GLOBALS_UPDATED from a non-local ref. This is not currently supported.');
      }
    }); // Emitted by the preview on initialization

    fullAPI.on(SET_GLOBALS, function handleSetStories({
      globals,
      globalTypes
    }) {
      const {
        ref
      } = getEventMetadata(this, fullAPI);
      const currentGlobals = store.getState()?.globals;

      if (!ref) {
        store.setState({
          globals,
          globalTypes
        });
      } else if (Object.keys(globals).length > 0) {
        logger.warn('received globals from a non-local ref. This is not currently supported.');
      }

      if (currentGlobals && Object.keys(currentGlobals).length !== 0 && !deepEqual(globals, currentGlobals)) {
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