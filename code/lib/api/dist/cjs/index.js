"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveTabs = void 0;
exports.Consumer = ManagerConsumer;
exports.combineParameters = exports.Provider = exports.ManagerContext = void 0;
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _merge.default;
  }
});
exports.useAddonState = useAddonState;
exports.useArgTypes = useArgTypes;
exports.useArgs = useArgs;
exports.useChannel = void 0;
exports.useGlobalTypes = useGlobalTypes;
exports.useGlobals = useGlobals;
exports.useParameter = useParameter;
exports.useSharedState = useSharedState;
exports.useStoryPrepared = useStoryPrepared;
exports.useStorybookApi = useStorybookApi;
exports.useStorybookState = useStorybookState;

var _react = _interopRequireWildcard(require("react"));

var _mergeWith = _interopRequireDefault(require("lodash/mergeWith"));

var _coreEvents = require("@storybook/core-events");

var _context = require("./context");

var _store = _interopRequireDefault(require("./store"));

var _initialState = _interopRequireDefault(require("./initial-state"));

var provider = _interopRequireWildcard(require("./modules/provider"));

var addons = _interopRequireWildcard(require("./modules/addons"));

var channel = _interopRequireWildcard(require("./modules/channel"));

var notifications = _interopRequireWildcard(require("./modules/notifications"));

var settings = _interopRequireWildcard(require("./modules/settings"));

var releaseNotes = _interopRequireWildcard(require("./modules/release-notes"));

var stories = _interopRequireWildcard(require("./modules/stories"));

var refs = _interopRequireWildcard(require("./modules/refs"));

var layout = _interopRequireWildcard(require("./modules/layout"));

var shortcuts = _interopRequireWildcard(require("./modules/shortcuts"));

var url = _interopRequireWildcard(require("./modules/url"));

var version = _interopRequireWildcard(require("./modules/versions"));

var globals = _interopRequireWildcard(require("./modules/globals"));

var _merge = _interopRequireDefault(require("./lib/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  ActiveTabs
} = layout;
exports.ActiveTabs = ActiveTabs;
const ManagerContext = (0, _context.createContext)({
  api: undefined,
  state: (0, _initialState.default)({})
});
exports.ManagerContext = ManagerContext;

// This is duplicated from @storybook/client-api for the reasons mentioned in lib-addons/types.js
const combineParameters = (...parameterSets) => (0, _mergeWith.default)({}, ...parameterSets, (objValue, srcValue) => {
  // Treat arrays as scalars:
  if (Array.isArray(srcValue)) return srcValue;
  return undefined;
});

exports.combineParameters = combineParameters;

class ManagerProvider extends _react.Component {
  constructor(props) {
    super(props);
    this.api = {};
    this.modules = void 0;

    this.initModules = () => {
      // Now every module has had a chance to set its API, call init on each module which gives it
      // a chance to do things that call other modules' APIs.
      this.modules.forEach(module => {
        if ('init' in module) {
          module.init();
        }
      });
    };

    const {
      location,
      path,
      refId,
      viewMode = props.docsOptions.docsMode ? 'docs' : 'story',
      singleStory,
      storyId,
      docsOptions,
      navigate
    } = props;
    const store = new _store.default({
      getState: () => this.state,
      setState: (stateChange, callback) => this.setState(stateChange, callback)
    });
    const routeData = {
      location,
      path,
      viewMode,
      singleStory,
      storyId,
      refId
    };
    const optionsData = {
      docsOptions
    };
    this.state = store.getInitialState((0, _initialState.default)(Object.assign({}, routeData, optionsData)));
    const apiData = {
      navigate,
      store,
      provider: props.provider
    };
    this.modules = [provider, channel, addons, layout, notifications, settings, releaseNotes, shortcuts, stories, refs, globals, url, version].map(m => m.init(Object.assign({}, routeData, optionsData, apiData, {
      state: this.state,
      fullAPI: this.api
    }))); // Create our initial state by combining the initial state of all modules, then overlaying any saved state

    const state = (0, _initialState.default)(this.state, ...this.modules.map(m => m.state)); // Get our API by combining the APIs exported by each module

    const api = Object.assign(this.api, {
      navigate
    }, ...this.modules.map(m => m.api));
    this.state = state;
    this.api = api;
  }

  static getDerivedStateFromProps(props, state) {
    if (state.path !== props.path) {
      return Object.assign({}, state, {
        location: props.location,
        path: props.path,
        refId: props.refId,
        viewMode: props.viewMode,
        storyId: props.storyId
      });
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const prevState = this.state;
    const prevProps = this.props;

    if (prevState !== nextState) {
      return true;
    }

    if (prevProps.path !== nextProps.path) {
      return true;
    }

    return false;
  }

  render() {
    const {
      children
    } = this.props;
    const value = {
      state: this.state,
      api: this.api
    };
    return /*#__PURE__*/_react.default.createElement(EffectOnMount, {
      effect: this.initModules
    }, /*#__PURE__*/_react.default.createElement(ManagerContext.Provider, {
      value: value
    }, /*#__PURE__*/_react.default.createElement(ManagerConsumer, null, children)));
  }

} // EffectOnMount exists to work around a bug in Reach Router where calling
// navigate inside of componentDidMount (as could happen when we call init on any
// of our modules) does not cause Reach Router's LocationProvider to update with
// the correct path. Calling navigate inside on an effect does not have the
// same problem. See https://github.com/reach/router/issues/404


exports.Provider = ManagerProvider;
ManagerProvider.displayName = 'Manager';

const EffectOnMount = ({
  children,
  effect
}) => {
  _react.default.useEffect(effect, []);

  return children;
};

const defaultFilter = c => c;

function ManagerConsumer({
  // @ts-expect-error (Converted from ts-ignore)
  filter = defaultFilter,
  children
}) {
  const c = (0, _react.useContext)(ManagerContext);
  const renderer = (0, _react.useRef)(children);
  const filterer = (0, _react.useRef)(filter);

  if (typeof renderer.current !== 'function') {
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, renderer.current);
  }

  const data = filterer.current(c);
  const l = (0, _react.useMemo)(() => {
    return [...Object.entries(data).reduce((acc, keyval) => acc.concat(keyval), [])];
  }, [c.state]);
  return (0, _react.useMemo)(() => {
    const Child = renderer.current;
    return /*#__PURE__*/_react.default.createElement(Child, data);
  }, l);
}

function useStorybookState() {
  const {
    state
  } = (0, _react.useContext)(ManagerContext);
  return state;
}

function useStorybookApi() {
  const {
    api
  } = (0, _react.useContext)(ManagerContext);
  return api;
}

function orDefault(fromStore, defaultState) {
  if (typeof fromStore === 'undefined') {
    return defaultState;
  }

  return fromStore;
}

const useChannel = (eventMap, deps = []) => {
  const api = useStorybookApi();
  (0, _react.useEffect)(() => {
    Object.entries(eventMap).forEach(([type, listener]) => api.on(type, listener));
    return () => {
      Object.entries(eventMap).forEach(([type, listener]) => api.off(type, listener));
    };
  }, deps);
  return api.emit;
};

exports.useChannel = useChannel;

function useStoryPrepared(storyId) {
  const api = useStorybookApi();
  return api.isPrepared(storyId);
}

function useParameter(parameterKey, defaultValue) {
  const api = useStorybookApi();
  const result = api.getCurrentParameter(parameterKey);
  return orDefault(result, defaultValue);
}

// cache for taking care of HMR
const addonStateCache = {}; // shared state

function useSharedState(stateId, defaultState) {
  const api = useStorybookApi();
  const existingState = api.getAddonState(stateId);
  const state = orDefault(existingState, addonStateCache[stateId] ? addonStateCache[stateId] : defaultState);

  const setState = (s, options) => {
    // set only after the stories are loaded
    if (addonStateCache[stateId]) {
      addonStateCache[stateId] = s;
    }

    api.setAddonState(stateId, s, options);
  };

  const allListeners = (0, _react.useMemo)(() => {
    const stateChangeHandlers = {
      [`${_coreEvents.SHARED_STATE_CHANGED}-client-${stateId}`]: s => setState(s),
      [`${_coreEvents.SHARED_STATE_SET}-client-${stateId}`]: s => setState(s)
    };
    const stateInitializationHandlers = {
      [_coreEvents.SET_STORIES]: () => {
        const currentState = api.getAddonState(stateId);

        if (currentState) {
          addonStateCache[stateId] = currentState;
          api.emit(`${_coreEvents.SHARED_STATE_SET}-manager-${stateId}`, currentState);
        } else if (addonStateCache[stateId]) {
          // this happens when HMR
          setState(addonStateCache[stateId]);
          api.emit(`${_coreEvents.SHARED_STATE_SET}-manager-${stateId}`, addonStateCache[stateId]);
        } else if (defaultState !== undefined) {
          // if not HMR, yet the defaults are from the manager
          setState(defaultState); // initialize addonStateCache after first load, so its available for subsequent HMR

          addonStateCache[stateId] = defaultState;
          api.emit(`${_coreEvents.SHARED_STATE_SET}-manager-${stateId}`, defaultState);
        }
      },
      [_coreEvents.STORY_CHANGED]: () => {
        const currentState = api.getAddonState(stateId);

        if (currentState !== undefined) {
          api.emit(`${_coreEvents.SHARED_STATE_SET}-manager-${stateId}`, currentState);
        }
      }
    };
    return Object.assign({}, stateChangeHandlers, stateInitializationHandlers);
  }, [stateId]);
  const emit = useChannel(allListeners);
  return [state, (newStateOrMerger, options) => {
    setState(newStateOrMerger, options);
    emit(`${_coreEvents.SHARED_STATE_CHANGED}-manager-${stateId}`, newStateOrMerger);
  }];
}

function useAddonState(addonId, defaultState) {
  return useSharedState(addonId, defaultState);
}

function useArgs() {
  const {
    getCurrentStoryData,
    updateStoryArgs,
    resetStoryArgs
  } = useStorybookApi();
  const data = getCurrentStoryData();
  const args = data.type === 'story' ? data.args : {};
  const updateArgs = (0, _react.useCallback)(newArgs => updateStoryArgs(data, newArgs), [data, updateStoryArgs]);
  const resetArgs = (0, _react.useCallback)(argNames => resetStoryArgs(data, argNames), [data, resetStoryArgs]);
  return [args, updateArgs, resetArgs];
}

function useGlobals() {
  const api = useStorybookApi();
  return [api.getGlobals(), api.updateGlobals];
}

function useGlobalTypes() {
  return useStorybookApi().getGlobalTypes();
}

function useCurrentStory() {
  const {
    getCurrentStoryData
  } = useStorybookApi();
  return getCurrentStoryData();
}

function useArgTypes() {
  const current = useCurrentStory();
  return (current === null || current === void 0 ? void 0 : current.type) === 'story' && current.argTypes || {};
}