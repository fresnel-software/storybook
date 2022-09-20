"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensurePanel = ensurePanel;
exports.types = exports.init = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = require("ts-dedent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const warnDisabledDeprecated = (0, _utilDeprecate.default)(() => {}, (0, _tsDedent.dedent)`
    Use 'parameters.key.disable' instead of 'parameters.key.disabled'.
    
    https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-disabled-parameter
  `);
let types;
exports.types = types;

(function (types) {
  types["TAB"] = "tab";
  types["PANEL"] = "panel";
  types["TOOL"] = "tool";
  types["PREVIEW"] = "preview";
  types["NOTES_ELEMENT"] = "notes-element";
})(types || (exports.types = types = {}));

function ensurePanel(panels, selectedPanel, currentPanel) {
  const keys = Object.keys(panels);

  if (keys.indexOf(selectedPanel) >= 0) {
    return selectedPanel;
  }

  if (keys.length) {
    return keys[0];
  }

  return currentPanel;
}

const init = ({
  provider,
  store,
  fullAPI
}) => {
  const api = {
    getElements: type => provider.getElements(type),
    getPanels: () => api.getElements(types.PANEL),
    getStoryPanels: () => {
      const allPanels = api.getPanels();
      const {
        storyId
      } = store.getState();
      const story = fullAPI.getData(storyId);

      if (!allPanels || !story || story.type !== 'story') {
        return allPanels;
      }

      const {
        parameters
      } = story;
      const filteredPanels = {};
      Object.entries(allPanels).forEach(([id, panel]) => {
        const {
          paramKey
        } = panel;

        if (paramKey && parameters && parameters[paramKey] && (parameters[paramKey].disabled || parameters[paramKey].disable)) {
          if (parameters[paramKey].disabled) {
            warnDisabledDeprecated();
          }

          return;
        }

        filteredPanels[id] = panel;
      });
      return filteredPanels;
    },
    getSelectedPanel: () => {
      const {
        selectedPanel
      } = store.getState();
      return ensurePanel(api.getPanels(), selectedPanel, selectedPanel);
    },
    setSelectedPanel: panelName => {
      store.setState({
        selectedPanel: panelName
      }, {
        persistence: 'session'
      });
    },

    setAddonState(addonId, newStateOrMerger, options) {
      let nextState;
      const {
        addons: existing
      } = store.getState();

      if (typeof newStateOrMerger === 'function') {
        const merger = newStateOrMerger;
        nextState = merger(api.getAddonState(addonId));
      } else {
        nextState = newStateOrMerger;
      }

      return store.setState({
        addons: Object.assign({}, existing, {
          [addonId]: nextState
        })
      }, options).then(() => api.getAddonState(addonId));
    },

    getAddonState: addonId => {
      return store.getState().addons[addonId];
    }
  };
  return {
    api,
    state: {
      selectedPanel: ensurePanel(api.getPanels(), store.getState().selectedPanel),
      addons: {}
    }
  };
};

exports.init = init;