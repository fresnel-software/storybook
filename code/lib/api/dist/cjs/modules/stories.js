"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _global = _interopRequireDefault(require("global"));

var _csf = require("@storybook/csf");

var _coreEvents = require("@storybook/core-events");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _clientLogger = require("@storybook/client-logger");

var _events = require("../lib/events");

var _stories = require("../lib/stories");

const _excluded = ["id"],
      _excluded2 = ["kind", "story", "storyId"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const {
  FEATURES,
  fetch
} = _global.default;
const STORY_INDEX_PATH = './index.json';
const deprecatedOptionsParameterWarnings = ['enableShortcuts', 'theme', 'showRoots'].reduce((acc, option) => {
  acc[option] = (0, _utilDeprecate.default)(() => {}, `parameters.options.${option} is deprecated and will be removed in Storybook 7.0.
To change this setting, use \`addons.setConfig\`. See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-immutable-options-parameters
  `);
  return acc;
}, {});

function checkDeprecatedOptionParameters(options) {
  if (!options) {
    return;
  }

  Object.keys(options).forEach(option => {
    if (deprecatedOptionsParameterWarnings[option]) {
      deprecatedOptionsParameterWarnings[option]();
    }
  });
}

const init = ({
  fullAPI,
  store,
  navigate,
  provider,
  storyId: initialStoryId,
  viewMode: initialViewMode,
  docsOptions = {}
}) => {
  const api = {
    storyId: _csf.toId,
    getData: (storyId, refId) => {
      const result = api.resolveStory(storyId, refId);

      if ((result === null || result === void 0 ? void 0 : result.type) === 'story' || (result === null || result === void 0 ? void 0 : result.type) === 'docs') {
        return result;
      }

      return undefined;
    },
    isPrepared: (storyId, refId) => {
      const data = api.getData(storyId, refId);
      return data.type === 'story' ? data.prepared : true;
    },
    resolveStory: (storyId, refId) => {
      const {
        refs,
        storiesHash
      } = store.getState();

      if (refId) {
        return refs[refId].stories ? refs[refId].stories[storyId] : undefined;
      }

      return storiesHash ? storiesHash[storyId] : undefined;
    },
    getCurrentStoryData: () => {
      const {
        storyId,
        refId
      } = store.getState();
      return api.getData(storyId, refId);
    },
    getParameters: (storyIdOrCombo, parameterName) => {
      const {
        storyId,
        refId
      } = typeof storyIdOrCombo === 'string' ? {
        storyId: storyIdOrCombo,
        refId: undefined
      } : storyIdOrCombo;
      const data = api.getData(storyId, refId);

      if ((data === null || data === void 0 ? void 0 : data.type) === 'story') {
        const {
          parameters
        } = data;

        if (parameters) {
          return parameterName ? parameters[parameterName] : parameters;
        }
      }

      return null;
    },
    getCurrentParameter: parameterName => {
      const {
        storyId,
        refId
      } = store.getState();
      const parameters = api.getParameters({
        storyId,
        refId
      }, parameterName); // FIXME Returning falsey parameters breaks a bunch of toolbars code,
      // so this strange logic needs to be here until various client code is updated.

      return parameters || undefined;
    },
    jumpToComponent: direction => {
      const {
        storiesHash,
        storyId,
        refs,
        refId
      } = store.getState();
      const story = api.getData(storyId, refId); // cannot navigate when there's no current selection

      if (!story) {
        return;
      }

      const hash = refId ? refs[refId].stories || {} : storiesHash;
      const result = api.findSiblingStoryId(storyId, hash, direction, true);

      if (result) {
        api.selectStory(result, undefined, {
          ref: refId
        });
      }
    },
    jumpToStory: direction => {
      const {
        storiesHash,
        storyId,
        refs,
        refId
      } = store.getState();
      const story = api.getData(storyId, refId); // cannot navigate when there's no current selection

      if (!story) {
        return;
      }

      const hash = story.refId ? refs[story.refId].stories : storiesHash;
      const result = api.findSiblingStoryId(storyId, hash, direction, false);

      if (result) {
        api.selectStory(result, undefined, {
          ref: refId
        });
      }
    },
    setStories: async (input, error) => {
      // Now create storiesHash by reordering the above by group
      const hash = (0, _stories.transformSetStoriesStoryDataToStoriesHash)(input, {
        provider,
        docsOptions
      });
      await store.setState({
        storiesHash: hash,
        storiesConfigured: true,
        storiesFailed: error
      });
    },
    selectFirstStory: () => {
      const {
        storiesHash
      } = store.getState();
      const firstStory = Object.keys(storiesHash).find(id => storiesHash[id].type === 'story');

      if (firstStory) {
        api.selectStory(firstStory);
        return;
      }

      navigate('/');
    },
    selectStory: (titleOrId = undefined, name = undefined, options = {}) => {
      const {
        ref
      } = options;
      const {
        storyId,
        storiesHash,
        refs
      } = store.getState();
      const hash = ref ? refs[ref].stories : storiesHash;
      const kindSlug = storyId === null || storyId === void 0 ? void 0 : storyId.split('--', 2)[0];

      if (!name) {
        // Find the entry (group, component or story) that is referred to
        const entry = titleOrId ? hash[titleOrId] || hash[(0, _csf.sanitize)(titleOrId)] : hash[kindSlug];
        if (!entry) throw new Error(`Unknown id or title: '${titleOrId}'`); // We want to navigate to the first ancestor entry that is a leaf

        const leafEntry = api.findLeafEntry(hash, entry.id);
        const fullId = leafEntry.refId ? `${leafEntry.refId}_${leafEntry.id}` : leafEntry.id;
        navigate(`/${leafEntry.type}/${fullId}`);
      } else if (!titleOrId) {
        // This is a slugified version of the kind, but that's OK, our toId function is idempotent
        const id = (0, _csf.toId)(kindSlug, name);
        api.selectStory(id, undefined, options);
      } else {
        const id = ref ? `${ref}_${(0, _csf.toId)(titleOrId, name)}` : (0, _csf.toId)(titleOrId, name);

        if (hash[id]) {
          api.selectStory(id, undefined, options);
        } else {
          // Support legacy API with component permalinks, where kind is `x/y` but permalink is 'z'
          const entry = hash[(0, _csf.sanitize)(titleOrId)];

          if ((entry === null || entry === void 0 ? void 0 : entry.type) === 'component') {
            const foundId = entry.children.find(childId => hash[childId].name === name);

            if (foundId) {
              api.selectStory(foundId, undefined, options);
            }
          }
        }
      }
    },

    findLeafEntry(storiesHash, storyId) {
      const entry = storiesHash[storyId];

      if (entry.type === 'docs' || entry.type === 'story') {
        return entry;
      }

      const childStoryId = entry.children[0];
      return api.findLeafEntry(storiesHash, childStoryId);
    },

    findLeafStoryId(storiesHash, storyId) {
      var _api$findLeafEntry;

      return (_api$findLeafEntry = api.findLeafEntry(storiesHash, storyId)) === null || _api$findLeafEntry === void 0 ? void 0 : _api$findLeafEntry.id;
    },

    findSiblingStoryId(storyId, hash, direction, toSiblingGroup) {
      if (toSiblingGroup) {
        const lookupList = (0, _stories.getComponentLookupList)(hash);
        const index = lookupList.findIndex(i => i.includes(storyId)); // cannot navigate beyond fist or last

        if (index === lookupList.length - 1 && direction > 0) {
          return;
        }

        if (index === 0 && direction < 0) {
          return;
        }

        if (lookupList[index + direction]) {
          // eslint-disable-next-line consistent-return
          return lookupList[index + direction][0];
        }

        return;
      }

      const lookupList = (0, _stories.getStoriesLookupList)(hash);
      const index = lookupList.indexOf(storyId); // cannot navigate beyond fist or last

      if (index === lookupList.length - 1 && direction > 0) {
        return;
      }

      if (index === 0 && direction < 0) {
        return;
      } // eslint-disable-next-line consistent-return


      return lookupList[index + direction];
    },

    updateStoryArgs: (story, updatedArgs) => {
      const {
        id: storyId,
        refId
      } = story;
      fullAPI.emit(_coreEvents.UPDATE_STORY_ARGS, {
        storyId,
        updatedArgs,
        options: {
          target: refId
        }
      });
    },
    resetStoryArgs: (story, argNames) => {
      const {
        id: storyId,
        refId
      } = story;
      fullAPI.emit(_coreEvents.RESET_STORY_ARGS, {
        storyId,
        argNames,
        options: {
          target: refId
        }
      });
    },
    fetchStoryList: async () => {
      try {
        const result = await fetch(STORY_INDEX_PATH);
        if (result.status !== 200) throw new Error(await result.text());
        const storyIndex = await result.json(); // We can only do this if the stories.json is a proper storyIndex

        if (storyIndex.v < 3) {
          _clientLogger.logger.warn(`Skipping story index with version v${storyIndex.v}, awaiting SET_STORIES.`);

          return;
        }

        await fullAPI.setStoryList(storyIndex);
      } catch (err) {
        store.setState({
          storiesConfigured: true,
          storiesFailed: err
        });
      }
    },
    setStoryList: async storyIndex => {
      const newHash = (0, _stories.transformStoryIndexToStoriesHash)(storyIndex, {
        provider,
        docsOptions
      }); // Now we need to patch in the existing prepared stories

      const oldHash = store.getState().storiesHash;
      await store.setState({
        storiesHash: (0, _stories.addPreparedStories)(newHash, oldHash),
        storiesConfigured: true,
        storiesFailed: null
      });
    },
    updateStory: async (storyId, update, ref) => {
      if (!ref) {
        const {
          storiesHash
        } = store.getState();
        storiesHash[storyId] = Object.assign({}, storiesHash[storyId], update);
        await store.setState({
          storiesHash
        });
      } else {
        const {
          id: refId,
          stories
        } = ref;
        stories[storyId] = Object.assign({}, stories[storyId], update);
        await fullAPI.updateRef(refId, {
          stories
        });
      }
    }
  };

  const initModule = async () => {
    // On initial load, the local iframe will select the first story (or other "selection specifier")
    // and emit STORY_SPECIFIED with the id. We need to ensure we respond to this change.
    fullAPI.on(_coreEvents.STORY_SPECIFIED, function handler({
      storyId,
      viewMode
    }) {
      const {
        sourceType
      } = (0, _events.getEventMetadata)(this, fullAPI);
      if (fullAPI.isSettingsScreenActive()) return;

      if (sourceType === 'local') {
        // Special case -- if we are already at the story being specified (i.e. the user started at a given story),
        // we don't need to change URL. See https://github.com/storybookjs/storybook/issues/11677
        const state = store.getState();

        if (state.storyId !== storyId || state.viewMode !== viewMode) {
          navigate(`/${viewMode}/${storyId}`);
        }
      }
    });
    fullAPI.on(_coreEvents.STORY_CHANGED, function handler() {
      const {
        sourceType
      } = (0, _events.getEventMetadata)(this, fullAPI);

      if (sourceType === 'local') {
        const options = fullAPI.getCurrentParameter('options');

        if (options) {
          checkDeprecatedOptionParameters(options);
          fullAPI.setOptions(options);
        }
      }
    });
    fullAPI.on(_coreEvents.STORY_PREPARED, function handler(_ref) {
      let {
        id
      } = _ref,
          update = _objectWithoutPropertiesLoose(_ref, _excluded);

      const {
        ref,
        sourceType
      } = (0, _events.getEventMetadata)(this, fullAPI);
      fullAPI.updateStory(id, Object.assign({}, update, {
        prepared: true
      }), ref);

      if (!ref) {
        if (!store.getState().hasCalledSetOptions) {
          const {
            options
          } = update.parameters;
          checkDeprecatedOptionParameters(options);
          fullAPI.setOptions(options);
          store.setState({
            hasCalledSetOptions: true
          });
        }
      } else {
        fullAPI.updateRef(ref.id, {
          ready: true
        });
      }

      if (sourceType === 'local') {
        const {
          storyId,
          storiesHash,
          refId
        } = store.getState(); // create a list of related stories to be preloaded

        const toBePreloaded = Array.from(new Set([api.findSiblingStoryId(storyId, storiesHash, 1, true), api.findSiblingStoryId(storyId, storiesHash, -1, true)])).filter(Boolean);
        fullAPI.emit(_coreEvents.PRELOAD_ENTRIES, {
          ids: toBePreloaded,
          options: {
            target: refId
          }
        });
      }
    });
    fullAPI.on(_coreEvents.SET_STORIES, function handler(data) {
      const {
        ref
      } = (0, _events.getEventMetadata)(this, fullAPI);
      const setStoriesData = data.v ? (0, _stories.denormalizeStoryParameters)(data) : data.stories;

      if (!ref) {
        if (!data.v) {
          throw new Error('Unexpected legacy SET_STORIES event from local source');
        }

        fullAPI.setStories(setStoriesData);
        const options = fullAPI.getCurrentParameter('options');
        checkDeprecatedOptionParameters(options);
        fullAPI.setOptions(options);
      } else {
        fullAPI.setRef(ref.id, Object.assign({}, ref, {
          setStoriesData
        }), true);
      }
    });
    fullAPI.on(_coreEvents.SELECT_STORY, function handler(_ref2) {
      let {
        kind,
        story,
        storyId
      } = _ref2,
          rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);

      const {
        ref
      } = (0, _events.getEventMetadata)(this, fullAPI);

      if (!ref) {
        fullAPI.selectStory(storyId || kind, story, rest);
      } else {
        fullAPI.selectStory(storyId || kind, story, Object.assign({}, rest, {
          ref: ref.id
        }));
      }
    });
    fullAPI.on(_coreEvents.STORY_ARGS_UPDATED, function handleStoryArgsUpdated({
      storyId,
      args
    }) {
      const {
        ref
      } = (0, _events.getEventMetadata)(this, fullAPI);
      fullAPI.updateStory(storyId, {
        args
      }, ref);
    });
    fullAPI.on(_coreEvents.CONFIG_ERROR, function handleConfigError(err) {
      store.setState({
        storiesConfigured: true,
        storiesFailed: err
      });
    });

    if (FEATURES !== null && FEATURES !== void 0 && FEATURES.storyStoreV7) {
      var _provider$serverChann;

      (_provider$serverChann = provider.serverChannel) === null || _provider$serverChann === void 0 ? void 0 : _provider$serverChann.on(_coreEvents.STORY_INDEX_INVALIDATED, () => fullAPI.fetchStoryList());
      await fullAPI.fetchStoryList();
    }
  };

  return {
    api,
    state: {
      storiesHash: {},
      storyId: initialStoryId,
      viewMode: initialViewMode,
      storiesConfigured: false,
      hasCalledSetOptions: false
    },
    init: initModule
  };
};

exports.init = init;