"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _global = _interopRequireDefault(require("global"));

var _semver = _interopRequireDefault(require("@storybook/semver"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _version = require("../version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore (FIXME should be expect-error no typedefs but fails build --prep)
const {
  VERSIONCHECK
} = _global.default;
const getVersionCheckData = (0, _memoizerific.default)(1)(() => {
  try {
    return Object.assign({}, JSON.parse(VERSIONCHECK).data || {});
  } catch (e) {
    return {};
  }
});

const init = ({
  store,
  mode,
  fullAPI
}) => {
  const {
    dismissedVersionNotification
  } = store.getState();
  const state = {
    versions: Object.assign({
      current: {
        version: _version.version
      }
    }, getVersionCheckData()),
    dismissedVersionNotification
  };
  const api = {
    getCurrentVersion: () => {
      const {
        versions: {
          current
        }
      } = store.getState();
      return current;
    },
    getLatestVersion: () => {
      const {
        versions: {
          latest,
          next,
          current
        }
      } = store.getState();

      if (current && _semver.default.prerelease(current.version) && next) {
        return latest && _semver.default.gt(latest.version, next.version) ? latest : next;
      }

      return latest;
    },
    versionUpdateAvailable: () => {
      const latest = api.getLatestVersion();
      const current = api.getCurrentVersion();

      if (latest) {
        if (!latest.version) {
          return true;
        }

        if (!current.version) {
          return true;
        }

        const onPrerelease = !!_semver.default.prerelease(current.version);
        const actualCurrent = onPrerelease ? `${_semver.default.major(current.version)}.${_semver.default.minor(current.version)}.${_semver.default.patch(current.version)}` : current.version;

        const diff = _semver.default.diff(actualCurrent, latest.version);

        return _semver.default.gt(latest.version, actualCurrent) && diff !== 'patch' && !diff.includes('pre');
      }

      return false;
    }
  }; // Grab versions from the server/local storage right away

  const initModule = async () => {
    const {
      versions = {}
    } = store.getState();
    const {
      latest,
      next
    } = getVersionCheckData();
    await store.setState({
      versions: Object.assign({}, versions, {
        latest,
        next
      })
    });

    if (api.versionUpdateAvailable()) {
      const latestVersion = api.getLatestVersion().version;

      const diff = _semver.default.diff(versions.current.version, versions.latest.version);

      if (latestVersion !== dismissedVersionNotification && diff !== 'patch' && !_semver.default.prerelease(latestVersion) && mode !== 'production') {
        fullAPI.addNotification({
          id: 'update',
          link: '/settings/about',
          content: {
            headline: `Storybook ${latestVersion} is available!`,
            subHeadline: `Your current version is: ${versions.current.version}`
          },
          icon: {
            name: 'book'
          },

          onClear() {
            store.setState({
              dismissedVersionNotification: latestVersion
            }, {
              persistence: 'permanent'
            });
          }

        });
      }
    }
  };

  return {
    init: initModule,
    state,
    api
  };
};

exports.init = init;