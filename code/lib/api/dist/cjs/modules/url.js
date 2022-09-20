"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _clientLogger = require("@storybook/client-logger");

var _coreEvents = require("@storybook/core-events");

var _router = require("@storybook/router");

var _csf = require("@storybook/csf");

var _dequal = require("dequal");

var _global = _interopRequireDefault(require("global"));

var _tsDedent = require("ts-dedent");

const _excluded = ["full", "panel", "nav", "shortcuts", "addonPanel", "tabs", "addons", "panelRight", "stories", "selectedKind", "selectedStory", "path"],
      _excluded2 = ["store", "navigate", "state", "provider", "fullAPI"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const {
  window: globalWindow
} = _global.default;

const parseBoolean = value => {
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return undefined;
}; // Initialize the state based on the URL.
// NOTE:
//   Although we don't change the URL when you change the state, we do support setting initial state
//   via the following URL parameters:
//     - full: 0/1 -- show fullscreen
//     - panel: bottom/right/0 -- set addons panel position (or hide)
//     - nav: 0/1 -- show or hide the story list
//
//   We also support legacy URLs from storybook <5


let prevParams;

const initialUrlSupport = ({
  state: {
    location,
    path,
    viewMode,
    storyId: storyIdFromUrl
  },
  singleStory
}) => {
  const _queryFromLocation = (0, _router.queryFromLocation)(location),
        {
    full,
    panel,
    nav,
    shortcuts,
    addonPanel,
    tabs,
    addons,
    // deprecated
    panelRight,
    // deprecated
    stories,
    // deprecated
    selectedKind,
    // deprecated
    selectedStory // the rest gets passed to the iframe

  } = _queryFromLocation,
        otherParams = _objectWithoutPropertiesLoose(_queryFromLocation, _excluded);

  const layout = {
    isFullscreen: parseBoolean(full),
    showNav: !singleStory && parseBoolean(nav),
    showPanel: parseBoolean(panel),
    panelPosition: ['right', 'bottom'].includes(panel) ? panel : undefined,
    showTabs: parseBoolean(tabs)
  };
  const ui = {
    enableShortcuts: parseBoolean(shortcuts)
  };
  const selectedPanel = addonPanel || undefined; // @deprecated Superceded by `panel=false`, to be removed in 7.0

  if (addons === '0') {
    _clientLogger.once.warn((0, _tsDedent.dedent)`
      The 'addons' query param is deprecated and will be removed in Storybook 7.0. Use 'panel=false' instead.

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-layout-url-params
    `);

    layout.showPanel = false;
  } // @deprecated Superceded by `panel=right`, to be removed in 7.0


  if (panelRight === '1') {
    _clientLogger.once.warn((0, _tsDedent.dedent)`
      The 'panelRight' query param is deprecated and will be removed in Storybook 7.0. Use 'panel=right' instead.

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-layout-url-params
    `);

    layout.panelPosition = 'right';
  } // @deprecated Superceded by `nav=false`, to be removed in 7.0


  if (stories === '0') {
    _clientLogger.once.warn((0, _tsDedent.dedent)`
      The 'stories' query param is deprecated and will be removed in Storybook 7.0. Use 'nav=false' instead.

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-layout-url-params
    `);

    layout.showNav = false;
  } // @deprecated To be removed in 7.0
  // If the user hasn't set the storyId on the URL, we support legacy URLs (selectedKind/selectedStory)
  // NOTE: this "storyId" can just be a prefix of a storyId, really it is a storyIdSpecifier.


  let storyId = storyIdFromUrl;

  if (!storyId && selectedKind) {
    _clientLogger.once.warn((0, _tsDedent.dedent)`
      The 'selectedKind' and 'selectedStory' query params are deprecated and will be removed in Storybook 7.0. Use 'path' instead.

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-layout-url-params
    `);

    storyId = selectedStory ? (0, _csf.toId)(selectedKind, selectedStory) : (0, _csf.sanitize)(selectedKind);
  } // Avoid returning a new object each time if no params actually changed.


  const customQueryParams = (0, _dequal.dequal)(prevParams, otherParams) ? prevParams : otherParams;
  prevParams = customQueryParams;
  return {
    viewMode,
    layout,
    ui,
    selectedPanel,
    location,
    path,
    customQueryParams,
    storyId
  };
};

const init = _ref => {
  let {
    store,
    navigate,
    state,
    provider,
    fullAPI
  } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded2);

  const navigateTo = (path, queryParams = {}, options = {}) => {
    const params = Object.entries(queryParams).filter(([, v]) => v).sort(([a], [b]) => a < b ? -1 : 1).map(([k, v]) => `${k}=${v}`);
    const to = [path, ...params].join('&');
    return navigate(to, options);
  };

  const api = {
    getQueryParam(key) {
      const {
        customQueryParams
      } = store.getState();
      return customQueryParams ? customQueryParams[key] : undefined;
    },

    getUrlState() {
      const {
        path,
        customQueryParams,
        storyId,
        url,
        viewMode
      } = store.getState();
      return {
        path,
        queryParams: customQueryParams,
        storyId,
        url,
        viewMode
      };
    },

    setQueryParams(input) {
      const {
        customQueryParams
      } = store.getState();
      const queryParams = {};
      const update = Object.assign({}, customQueryParams, Object.entries(input).reduce((acc, [key, value]) => {
        if (value !== null) {
          acc[key] = value;
        }

        return acc;
      }, queryParams));

      if (!(0, _dequal.dequal)(customQueryParams, update)) {
        store.setState({
          customQueryParams: update
        });
        fullAPI.emit(_coreEvents.UPDATE_QUERY_PARAMS, update);
      }
    },

    navigateUrl(url, options) {
      navigate(url, Object.assign({}, options, {
        plain: true
      }));
    }

  };

  const initModule = () => {
    // Sets `args` parameter in URL, omitting any args that have their initial value or cannot be unserialized safely.
    const updateArgsParam = () => {
      const {
        path,
        queryParams,
        viewMode
      } = fullAPI.getUrlState();
      if (viewMode !== 'story') return;
      const currentStory = fullAPI.getCurrentStoryData();
      if ((currentStory === null || currentStory === void 0 ? void 0 : currentStory.type) !== 'story') return;
      const {
        args,
        initialArgs
      } = currentStory;
      const argsString = (0, _router.buildArgsParam)(initialArgs, args);
      navigateTo(path, Object.assign({}, queryParams, {
        args: argsString
      }), {
        replace: true
      });
      api.setQueryParams({
        args: argsString
      });
    };

    fullAPI.on(_coreEvents.SET_CURRENT_STORY, () => updateArgsParam());
    let handleOrId;
    fullAPI.on(_coreEvents.STORY_ARGS_UPDATED, () => {
      if ('requestIdleCallback' in globalWindow) {
        if (handleOrId) globalWindow.cancelIdleCallback(handleOrId);
        handleOrId = globalWindow.requestIdleCallback(updateArgsParam, {
          timeout: 1000
        });
      } else {
        if (handleOrId) clearTimeout(handleOrId);
        setTimeout(updateArgsParam, 100);
      }
    });
    fullAPI.on(_coreEvents.GLOBALS_UPDATED, ({
      globals,
      initialGlobals
    }) => {
      const {
        path,
        queryParams
      } = fullAPI.getUrlState();
      const globalsString = (0, _router.buildArgsParam)(initialGlobals, globals);
      navigateTo(path, Object.assign({}, queryParams, {
        globals: globalsString
      }), {
        replace: true
      });
      api.setQueryParams({
        globals: globalsString
      });
    });
    fullAPI.on(_coreEvents.NAVIGATE_URL, (url, options) => {
      fullAPI.navigateUrl(url, options);
    });

    if (fullAPI.showReleaseNotesOnLaunch()) {
      navigate('/settings/release-notes');
    }
  };

  return {
    api,
    state: initialUrlSupport(Object.assign({
      store,
      navigate,
      state,
      provider,
      fullAPI
    }, rest)),
    init: initModule
  };
};

exports.init = init;