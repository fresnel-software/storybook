"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.focusableUIElements = exports.ActiveTabs = void 0;

var _global = _interopRequireDefault(require("global"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _dequal = require("dequal");

var _create = require("@storybook/theming/create");

var _coreEvents = require("@storybook/core-events");

var _clientLogger = require("@storybook/client-logger");

var _tsDedent = require("ts-dedent");

var _merge = _interopRequireDefault(require("../lib/merge"));

const _excluded = ["theme", "selectedPanel"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const {
  document
} = _global.default;
const ActiveTabs = {
  SIDEBAR: 'sidebar',
  CANVAS: 'canvas',
  ADDONS: 'addons'
};
exports.ActiveTabs = ActiveTabs;
const defaultState = {
  ui: {
    enableShortcuts: true
  },
  layout: {
    initialActive: ActiveTabs.CANVAS,
    showToolbar: true,
    isFullscreen: false,
    showPanel: true,
    showNav: true,
    panelPosition: 'bottom',
    showTabs: true
  },
  selectedPanel: undefined,
  theme: (0, _create.create)()
};
const focusableUIElements = {
  storySearchField: 'storybook-explorer-searchfield',
  storyListMenu: 'storybook-explorer-menu',
  storyPanelRoot: 'storybook-panel-root'
};
exports.focusableUIElements = focusableUIElements;

const init = ({
  store,
  provider,
  singleStory,
  fullAPI
}) => {
  const api = {
    toggleFullscreen(toggled) {
      return store.setState(state => {
        const {
          showNav
        } = state.layout;
        const value = typeof toggled === 'boolean' ? toggled : !state.layout.isFullscreen;
        const shouldShowNav = showNav === false && value === false;
        return {
          layout: Object.assign({}, state.layout, {
            isFullscreen: value,
            showNav: !singleStory && shouldShowNav ? true : showNav
          })
        };
      }, {
        persistence: 'session'
      });
    },

    togglePanel(toggled) {
      return store.setState(state => {
        const {
          showNav,
          isFullscreen
        } = state.layout;
        const value = typeof toggled !== 'undefined' ? toggled : !state.layout.showPanel;
        const shouldToggleFullScreen = showNav === false && value === false;
        return {
          layout: Object.assign({}, state.layout, {
            showPanel: value,
            isFullscreen: shouldToggleFullScreen ? true : isFullscreen
          })
        };
      }, {
        persistence: 'session'
      });
    },

    togglePanelPosition(position) {
      if (typeof position !== 'undefined') {
        return store.setState(state => ({
          layout: Object.assign({}, state.layout, {
            panelPosition: position
          })
        }), {
          persistence: 'permanent'
        });
      }

      return store.setState(state => ({
        layout: Object.assign({}, state.layout, {
          panelPosition: state.layout.panelPosition === 'right' ? 'bottom' : 'right'
        })
      }), {
        persistence: 'permanent'
      });
    },

    toggleNav(toggled) {
      return store.setState(state => {
        if (singleStory) return {
          layout: state.layout
        };
        const {
          showPanel,
          isFullscreen
        } = state.layout;
        const showNav = typeof toggled !== 'undefined' ? toggled : !state.layout.showNav;
        const shouldToggleFullScreen = showPanel === false && showNav === false;
        return {
          layout: Object.assign({}, state.layout, {
            showNav,
            isFullscreen: shouldToggleFullScreen ? true : !showNav && isFullscreen
          })
        };
      }, {
        persistence: 'session'
      });
    },

    toggleToolbar(toggled) {
      return store.setState(state => {
        const value = typeof toggled !== 'undefined' ? toggled : !state.layout.showToolbar;
        return {
          layout: Object.assign({}, state.layout, {
            showToolbar: value
          })
        };
      }, {
        persistence: 'session'
      });
    },

    resetLayout() {
      return store.setState(state => {
        return {
          layout: Object.assign({}, state.layout, {
            showNav: false,
            showPanel: false,
            isFullscreen: false
          })
        };
      }, {
        persistence: 'session'
      });
    },

    focusOnUIElement(elementId, select) {
      if (!elementId) {
        return;
      }

      const element = document.getElementById(elementId);

      if (element) {
        element.focus();
        if (select) element.select();
      }
    },

    getInitialOptions() {
      var _options$layout;

      const _provider$getConfig = provider.getConfig(),
            {
        theme,
        selectedPanel
      } = _provider$getConfig,
            options = _objectWithoutPropertiesLoose(_provider$getConfig, _excluded);

      if (((_options$layout = options.layout) === null || _options$layout === void 0 ? void 0 : _options$layout.isToolshown) !== undefined) {
        _clientLogger.once.warn((0, _tsDedent.dedent)`
          The "isToolshown" option is deprecated. Please use "showToolbar" instead.

          See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#renamed-istoolshown-to-showtoolbar
        `);

        options.layout.showToolbar = options.layout.isToolshown;
      }

      return Object.assign({}, defaultState, {
        layout: Object.assign({}, defaultState.layout, (0, _pick.default)(options, Object.keys(defaultState.layout)), singleStory && {
          showNav: false
        }),
        ui: Object.assign({}, defaultState.ui, (0, _pick.default)(options, Object.keys(defaultState.ui))),
        selectedPanel: selectedPanel || defaultState.selectedPanel,
        theme: theme || defaultState.theme
      });
    },

    setOptions: options => {
      const {
        layout,
        ui,
        selectedPanel,
        theme
      } = store.getState();

      if (options) {
        const updatedLayout = Object.assign({}, layout, (0, _pick.default)(options, Object.keys(layout)), singleStory && {
          showNav: false
        });
        const updatedUi = Object.assign({}, ui, (0, _pick.default)(options, Object.keys(ui)));
        const updatedTheme = Object.assign({}, theme, options.theme);
        const modification = {};

        if (!(0, _dequal.dequal)(ui, updatedUi)) {
          modification.ui = updatedUi;
        }

        if (!(0, _dequal.dequal)(layout, updatedLayout)) {
          modification.layout = updatedLayout;
        }

        if (options.selectedPanel && !(0, _dequal.dequal)(selectedPanel, options.selectedPanel)) {
          modification.selectedPanel = options.selectedPanel;
        }

        if (Object.keys(modification).length) {
          store.setState(modification, {
            persistence: 'permanent'
          });
        }

        if (!(0, _dequal.dequal)(theme, updatedTheme)) {
          store.setState({
            theme: updatedTheme
          });
        }
      }
    }
  };
  const persisted = (0, _pick.default)(store.getState(), 'layout', 'ui', 'selectedPanel');
  return {
    api,
    state: (0, _merge.default)(api.getInitialOptions(), persisted),
    init: () => {
      api.setOptions((0, _merge.default)(api.getInitialOptions(), persisted));
      fullAPI.on(_coreEvents.SET_CONFIG, () => {
        api.setOptions((0, _merge.default)(api.getInitialOptions(), persisted));
      });
    }
  };
};

exports.init = init;