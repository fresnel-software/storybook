"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HooksContext", {
  enumerable: true,
  get: function () {
    return _addons.HooksContext;
  }
});
Object.defineProperty(exports, "applyHooks", {
  enumerable: true,
  get: function () {
    return _addons.applyHooks;
  }
});
exports.useAddonState = useAddonState;
Object.defineProperty(exports, "useArgs", {
  enumerable: true,
  get: function () {
    return _addons.useArgs;
  }
});
Object.defineProperty(exports, "useCallback", {
  enumerable: true,
  get: function () {
    return _addons.useCallback;
  }
});
Object.defineProperty(exports, "useChannel", {
  enumerable: true,
  get: function () {
    return _addons.useChannel;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function () {
    return _addons.useEffect;
  }
});
Object.defineProperty(exports, "useGlobals", {
  enumerable: true,
  get: function () {
    return _addons.useGlobals;
  }
});
Object.defineProperty(exports, "useMemo", {
  enumerable: true,
  get: function () {
    return _addons.useMemo;
  }
});
Object.defineProperty(exports, "useParameter", {
  enumerable: true,
  get: function () {
    return _addons.useParameter;
  }
});
Object.defineProperty(exports, "useReducer", {
  enumerable: true,
  get: function () {
    return _addons.useReducer;
  }
});
Object.defineProperty(exports, "useRef", {
  enumerable: true,
  get: function () {
    return _addons.useRef;
  }
});
exports.useSharedState = useSharedState;
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function () {
    return _addons.useState;
  }
});
Object.defineProperty(exports, "useStoryContext", {
  enumerable: true,
  get: function () {
    return _addons.useStoryContext;
  }
});

var _coreEvents = require("@storybook/core-events");

var _addons = require("@storybook/addons");

function useSharedState(sharedId, defaultState) {
  const channel = _addons.addons.getChannel();

  const [lastValue] = channel.last(`${_coreEvents.SHARED_STATE_CHANGED}-manager-${sharedId}`) || channel.last(`${_coreEvents.SHARED_STATE_SET}-manager-${sharedId}`) || [];
  const [state, setState] = (0, _addons.useState)(lastValue || defaultState);
  const allListeners = (0, _addons.useMemo)(() => ({
    [`${_coreEvents.SHARED_STATE_CHANGED}-manager-${sharedId}`]: s => setState(s),
    [`${_coreEvents.SHARED_STATE_SET}-manager-${sharedId}`]: s => setState(s)
  }), [sharedId]);
  const emit = (0, _addons.useChannel)(allListeners, [sharedId]);
  (0, _addons.useEffect)(() => {
    // init
    if (defaultState !== undefined && !lastValue) {
      emit(`${_coreEvents.SHARED_STATE_SET}-client-${sharedId}`, defaultState);
    }
  }, [sharedId]);
  return [state, s => {
    setState(s);
    emit(`${_coreEvents.SHARED_STATE_CHANGED}-client-${sharedId}`, s);
  }];
}

function useAddonState(addonId, defaultState) {
  return useSharedState(addonId, defaultState);
}