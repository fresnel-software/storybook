"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _global = _interopRequireDefault(require("global"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  RELEASE_NOTES_DATA
} = _global.default;
const getReleaseNotesData = (0, _memoizerific.default)(1)(() => {
  try {
    return Object.assign({}, JSON.parse(RELEASE_NOTES_DATA) || {});
  } catch (e) {
    return {};
  }
});

const init = ({
  store
}) => {
  const releaseNotesData = getReleaseNotesData();

  const getReleaseNotesViewed = () => {
    const {
      releaseNotesViewed: persistedReleaseNotesViewed
    } = store.getState();
    return persistedReleaseNotesViewed || [];
  };

  const api = {
    releaseNotesVersion: () => releaseNotesData.currentVersion,
    setDidViewReleaseNotes: () => {
      const releaseNotesViewed = getReleaseNotesViewed();

      if (!releaseNotesViewed.includes(releaseNotesData.currentVersion)) {
        store.setState({
          releaseNotesViewed: [...releaseNotesViewed, releaseNotesData.currentVersion]
        }, {
          persistence: 'permanent'
        });
      }
    },
    showReleaseNotesOnLaunch: () => {
      // The currentVersion will only exist for dev builds
      if (!releaseNotesData.currentVersion) return false;
      const releaseNotesViewed = getReleaseNotesViewed();
      const didViewReleaseNotes = releaseNotesViewed.includes(releaseNotesData.currentVersion);
      const showReleaseNotesOnLaunch = releaseNotesData.showOnFirstLaunch && !didViewReleaseNotes;
      return showReleaseNotesOnLaunch;
    }
  };
  return {
    state: {
      releaseNotesViewed: []
    },
    api
  };
};

exports.init = init;