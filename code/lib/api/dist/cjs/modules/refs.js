"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.getSourceType = exports.defaultStoryMapper = void 0;

var _global = _interopRequireDefault(require("global"));

var _tsDedent = require("ts-dedent");

var _stories = require("../lib/stories");

const _excluded = ["storyIndex", "setStoriesData"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const {
  location,
  fetch
} = _global.default;
// eslint-disable-next-line no-useless-escape
const findFilename = /(\/((?:[^\/]+?)\.[^\/]+?)|\/)$/;

const getSourceType = (source, refId) => {
  const {
    origin: localOrigin,
    pathname: localPathname
  } = location;
  const {
    origin: sourceOrigin,
    pathname: sourcePathname
  } = new URL(source);
  const localFull = `${localOrigin + localPathname}`.replace(findFilename, '');
  const sourceFull = `${sourceOrigin + sourcePathname}`.replace(findFilename, '');

  if (localFull === sourceFull) {
    return ['local', sourceFull];
  }

  if (refId || source) {
    return ['external', sourceFull];
  }

  return [null, null];
};

exports.getSourceType = getSourceType;

const defaultStoryMapper = (b, a) => {
  return Object.assign({}, a, {
    kind: a.kind.replace('|', '/')
  });
};

exports.defaultStoryMapper = defaultStoryMapper;

const addRefIds = (input, ref) => {
  return Object.entries(input).reduce((acc, [id, item]) => {
    return Object.assign({}, acc, {
      [id]: Object.assign({}, item, {
        refId: ref.id
      })
    });
  }, {});
};

async function handleRequest(request) {
  if (!request) return {};

  try {
    const response = await request;
    if (!response.ok) return {};
    const json = await response.json();

    if (json.entries || json.stories) {
      return {
        storyIndex: json
      };
    }

    return json;
  } catch (error) {
    return {
      error
    };
  }
}

const map = (input, ref, options) => {
  const {
    storyMapper
  } = options;

  if (storyMapper) {
    return Object.entries(input).reduce((acc, [id, item]) => {
      return Object.assign({}, acc, {
        [id]: storyMapper(ref, item)
      });
    }, {});
  }

  return input;
};

const init = ({
  store,
  provider,
  singleStory,
  docsOptions = {}
}, {
  runCheck = true
} = {}) => {
  const api = {
    findRef: source => {
      const refs = api.getRefs();
      return Object.values(refs).find(({
        url
      }) => url.match(source));
    },
    changeRefVersion: (id, url) => {
      const {
        versions,
        title
      } = api.getRefs()[id];
      const ref = {
        id,
        url,
        versions,
        title,
        stories: {}
      };
      api.checkRef(ref);
    },
    changeRefState: (id, ready) => {
      const _api$getRefs = api.getRefs(),
            {
        [id]: ref
      } = _api$getRefs,
            updated = _objectWithoutPropertiesLoose(_api$getRefs, [id].map(_toPropertyKey));

      updated[id] = Object.assign({}, ref, {
        ready
      });
      store.setState({
        refs: updated
      });
    },
    checkRef: async ref => {
      const {
        id,
        url,
        version,
        type
      } = ref;
      const isPublic = type === 'server-checked'; // ref's type starts as either 'unknown' or 'server-checked'
      // "server-checked" happens when we were able to verify the storybook is accessible from node (without cookies)
      // "unknown" happens if the request was declined of failed (this can happen because the storybook doesn't exists or authentication is required)
      //
      // we then make a request for stories.json
      //
      // if this request fails when storybook is server-checked we mark the ref as "auto-inject", this is a fallback mechanism for local storybook, legacy storybooks, and storybooks that lack stories.json
      // if the request fails with type "unknown" we give up and show an error
      // if the request succeeds we set the ref to 'lazy' type, and show the stories in the sidebar without injecting the iframe first
      //
      // then we fetch metadata if the above fetch succeeded

      const loadedData = {};
      const query = version ? `?version=${version}` : '';
      const credentials = isPublic ? 'omit' : 'include';
      const [indexFetch, storiesFetch] = await Promise.all(['index.json', 'stories.json'].map(async file => fetch(`${url}/${file}${query}`, {
        headers: {
          Accept: 'application/json'
        },
        credentials
      })));

      if (indexFetch.ok || storiesFetch.ok) {
        const [index, metadata] = await Promise.all([indexFetch.ok ? handleRequest(indexFetch) : handleRequest(storiesFetch), handleRequest(fetch(`${url}/metadata.json${query}`, {
          headers: {
            Accept: 'application/json'
          },
          credentials,
          cache: 'no-cache'
        }).catch(() => false))]);
        Object.assign(loadedData, Object.assign({}, index, metadata));
      } else if (!isPublic) {
        // In theory the `/iframe.html` could be private and the `stories.json` could not exist, but in practice
        // the only private servers we know about (Chromatic) always include `stories.json`. So we can tell
        // if the ref actually exists by simply checking `stories.json` w/ credentials.
        loadedData.error = {
          message: (0, _tsDedent.dedent)`
            Error: Loading of ref failed
              at fetch (lib/api/src/modules/refs.ts)

            URL: ${url}

            We weren't able to load the above URL,
            it's possible a CORS error happened.

            Please check your dev-tools network tab.
          `
        };
      }

      const versions = ref.versions && Object.keys(ref.versions).length ? ref.versions : loadedData.versions;
      await api.setRef(id, Object.assign({
        id,
        url
      }, loadedData, versions ? {
        versions
      } : {}, {
        type: !loadedData.storyIndex ? 'auto-inject' : 'lazy'
      }));
    },
    getRefs: () => {
      const {
        refs = {}
      } = store.getState();
      return refs;
    },
    setRef: (id, _ref, ready = false) => {
      let {
        storyIndex,
        setStoriesData
      } = _ref,
          rest = _objectWithoutPropertiesLoose(_ref, _excluded);

      if (singleStory) {
        return;
      }

      const {
        storyMapper = defaultStoryMapper
      } = provider.getConfig();
      const ref = api.getRefs()[id];
      let storiesHash;

      if (setStoriesData) {
        storiesHash = (0, _stories.transformSetStoriesStoryDataToStoriesHash)(map(setStoriesData, ref, {
          storyMapper
        }), {
          provider,
          docsOptions
        });
      } else if (storyIndex) {
        storiesHash = (0, _stories.transformStoryIndexToStoriesHash)(storyIndex, {
          provider,
          docsOptions
        });
      }

      if (storiesHash) storiesHash = addRefIds(storiesHash, ref);
      api.updateRef(id, Object.assign({
        stories: storiesHash
      }, rest, {
        ready
      }));
    },
    updateRef: (id, data) => {
      const _api$getRefs2 = api.getRefs(),
            {
        [id]: ref
      } = _api$getRefs2,
            updated = _objectWithoutPropertiesLoose(_api$getRefs2, [id].map(_toPropertyKey));

      updated[id] = Object.assign({}, ref, data);
      /* eslint-disable no-param-reassign */

      const ordered = Object.keys(initialState).reduce((obj, key) => {
        obj[key] = updated[key];
        return obj;
      }, {});
      /* eslint-enable no-param-reassign */

      store.setState({
        refs: ordered
      });
    }
  };
  const refs = !singleStory && _global.default.REFS || {};
  const initialState = refs;

  if (runCheck) {
    Object.entries(refs).forEach(([id, ref]) => {
      api.checkRef(Object.assign({}, ref, {
        stories: {}
      }));
    });
  }

  return {
    api,
    state: {
      refs: initialState
    }
  };
};

exports.init = init;