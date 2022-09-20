"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

const init = ({
  store,
  navigate,
  fullAPI
}) => {
  const isSettingsScreenActive = () => {
    const {
      path
    } = fullAPI.getUrlState();
    return !!(path || '').match(/^\/settings/);
  };

  const api = {
    closeSettings: () => {
      const {
        settings: {
          lastTrackedStoryId
        }
      } = store.getState();

      if (lastTrackedStoryId) {
        fullAPI.selectStory(lastTrackedStoryId);
      } else {
        fullAPI.selectFirstStory();
      }
    },
    changeSettingsTab: tab => {
      navigate(`/settings/${tab}`);
    },
    isSettingsScreenActive,
    navigateToSettingsPage: async path => {
      if (!isSettingsScreenActive()) {
        const {
          settings,
          storyId
        } = store.getState();
        await store.setState({
          settings: Object.assign({}, settings, {
            lastTrackedStoryId: storyId
          })
        });
      }

      navigate(path);
    }
  };
  return {
    state: {
      settings: {
        lastTrackedStoryId: null
      }
    },
    api
  };
};

exports.init = init;