"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoryStore = void 0;

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _synchronousPromise = require("synchronous-promise");

var _StoryIndexStore = require("./StoryIndexStore");

var _ArgsStore = require("./ArgsStore");

var _GlobalsStore = require("./GlobalsStore");

var _csf = require("./csf");

var _hooks = require("./hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO -- what are reasonable values for these?
const CSF_CACHE_SIZE = 1000;
const STORY_CACHE_SIZE = 10000;

class StoryStore {
  // This *does* get set in the constructor but the semantics of `new SynchronousPromise` trip up TS
  constructor() {
    this.storyIndex = void 0;
    this.importFn = void 0;
    this.projectAnnotations = void 0;
    this.globals = void 0;
    this.args = void 0;
    this.hooks = void 0;
    this.cachedCSFFiles = void 0;
    this.processCSFFileWithCache = void 0;
    this.prepareStoryWithCache = void 0;
    this.initializationPromise = void 0;
    this.resolveInitializationPromise = void 0;

    this.getStoriesJsonData = () => {
      const {
        storyIndex
      } = this;
      if (!storyIndex) throw new Error(`getStoriesJsonData called before initialization`);
      const value = this.getSetStoriesPayload();
      const allowedParameters = ['fileName', 'docsOnly', 'framework', '__id', '__isArgsStory'];
      const stories = (0, _mapValues.default)(value.stories, story => {
        const {
          importPath
        } = storyIndex.entries[story.id];
        return Object.assign({}, (0, _pick.default)(story, ['id', 'name', 'title']), {
          importPath,
          // These 3 fields were going to be dropped in v7, but instead we will keep them for the
          // 7.x cycle so that v7 Storybooks can be composed successfully in v6 Storybook.
          // In v8 we will (likely) completely drop support for `extract` and `getStoriesJsonData`
          kind: story.title,
          story: story.name,
          parameters: Object.assign({}, (0, _pick.default)(story.parameters, allowedParameters), {
            fileName: importPath
          })
        });
      });
      return {
        v: 3,
        stories
      };
    };

    this.args = new _ArgsStore.ArgsStore();
    this.hooks = {}; // We use a cache for these two functions for two reasons:
    //  1. For performance
    //  2. To ensure that when the same story is prepared with the same inputs you get the same output

    this.processCSFFileWithCache = (0, _memoizerific.default)(CSF_CACHE_SIZE)(_csf.processCSFFile);
    this.prepareStoryWithCache = (0, _memoizerific.default)(STORY_CACHE_SIZE)(_csf.prepareStory); // We cannot call `loadStory()` until we've been initialized properly. But we can wait for it.

    this.initializationPromise = new _synchronousPromise.SynchronousPromise(resolve => {
      this.resolveInitializationPromise = resolve;
    });
  }

  setProjectAnnotations(projectAnnotations) {
    // By changing `this.projectAnnotations, we implicitly invalidate the `prepareStoryWithCache`
    this.projectAnnotations = (0, _csf.normalizeProjectAnnotations)(projectAnnotations);
    const {
      globals,
      globalTypes
    } = projectAnnotations;

    if (this.globals) {
      this.globals.set({
        globals,
        globalTypes
      });
    } else {
      this.globals = new _GlobalsStore.GlobalsStore({
        globals,
        globalTypes
      });
    }
  }

  initialize({
    storyIndex,
    importFn,
    cache = false
  }) {
    this.storyIndex = new _StoryIndexStore.StoryIndexStore(storyIndex);
    this.importFn = importFn; // We don't need the cache to be loaded to call `loadStory`, we just need the index ready

    this.resolveInitializationPromise();
    return cache ? this.cacheAllCSFFiles() : _synchronousPromise.SynchronousPromise.resolve();
  } // This means that one of the CSF files has changed.
  // If the `importFn` has changed, we will invalidate both caches.
  // If the `storyIndex` data has changed, we may or may not invalidate the caches, depending
  // on whether we've loaded the relevant files yet.


  async onStoriesChanged({
    importFn,
    storyIndex
  }) {
    if (!this.storyIndex) throw new Error(`onStoriesChanged called before initialization`);
    if (importFn) this.importFn = importFn;
    if (storyIndex) this.storyIndex.entries = storyIndex.entries;
    if (this.cachedCSFFiles) await this.cacheAllCSFFiles();
  } // Get an entry from the index, waiting on initialization if necessary


  async storyIdToEntry(storyId) {
    await this.initializationPromise; // The index will always be set before the initialization promise returns

    return this.storyIndex.storyIdToEntry(storyId);
  } // To load a single CSF file to service a story we need to look up the importPath in the index


  loadCSFFileByStoryId(storyId) {
    if (!this.storyIndex || !this.importFn) throw new Error(`loadCSFFileByStoryId called before initialization`);
    const {
      importPath,
      title
    } = this.storyIndex.storyIdToEntry(storyId);
    return this.importFn(importPath).then(moduleExports => // We pass the title in here as it may have been generated by autoTitle on the server.
    this.processCSFFileWithCache(moduleExports, importPath, title));
  }

  loadAllCSFFiles() {
    if (!this.storyIndex) throw new Error(`loadAllCSFFiles called before initialization`);
    const importPaths = {};
    Object.entries(this.storyIndex.entries).forEach(([storyId, {
      importPath
    }]) => {
      importPaths[importPath] = storyId;
    });
    const csfFilePromiseList = Object.entries(importPaths).map(([importPath, storyId]) => this.loadCSFFileByStoryId(storyId).then(csfFile => ({
      importPath,
      csfFile
    })));
    return _synchronousPromise.SynchronousPromise.all(csfFilePromiseList).then(list => list.reduce((acc, {
      importPath,
      csfFile
    }) => {
      acc[importPath] = csfFile;
      return acc;
    }, {}));
  }

  cacheAllCSFFiles() {
    return this.initializationPromise.then(() => this.loadAllCSFFiles().then(csfFiles => {
      this.cachedCSFFiles = csfFiles;
    }));
  } // Load the CSF file for a story and prepare the story from it and the project annotations.


  async loadStory({
    storyId
  }) {
    await this.initializationPromise;
    const csfFile = await this.loadCSFFileByStoryId(storyId);
    return this.storyFromCSFFile({
      storyId,
      csfFile
    });
  } // This function is synchronous for convenience -- often times if you have a CSF file already
  // it is easier not to have to await `loadStory`.


  storyFromCSFFile({
    storyId,
    csfFile
  }) {
    if (!this.projectAnnotations) throw new Error(`storyFromCSFFile called before initialization`);
    const storyAnnotations = csfFile.stories[storyId];

    if (!storyAnnotations) {
      throw new Error(`Didn't find '${storyId}' in CSF file, this is unexpected`);
    }

    const componentAnnotations = csfFile.meta;
    const story = this.prepareStoryWithCache(storyAnnotations, componentAnnotations, this.projectAnnotations);
    this.args.setInitial(story);
    this.hooks[story.id] = this.hooks[story.id] || new _hooks.HooksContext();
    return story;
  } // If we have a CSF file we can get all the stories from it synchronously


  componentStoriesFromCSFFile({
    csfFile
  }) {
    if (!this.storyIndex) throw new Error(`componentStoriesFromCSFFile called before initialization`);
    return Object.keys(this.storyIndex.entries).filter(storyId => !!csfFile.stories[storyId]).map(storyId => this.storyFromCSFFile({
      storyId,
      csfFile
    }));
  }

  async loadEntry(id) {
    const entry = await this.storyIdToEntry(id);
    const {
      importFn,
      storyIndex
    } = this;
    if (!storyIndex || !importFn) throw new Error(`loadEntry called before initialization`);
    const storyImports = entry.type === 'docs' ? entry.storiesImports : [];
    const [entryExports, ...csfFiles] = await Promise.all([importFn(entry.importPath), ...storyImports.map(storyImportPath => {
      const firstStoryEntry = storyIndex.importPathToEntry(storyImportPath);
      return this.loadCSFFileByStoryId(firstStoryEntry.id);
    })]);
    return {
      entryExports,
      csfFiles
    };
  } // A prepared story does not include args, globals or hooks. These are stored in the story store
  // and updated separtely to the (immutable) story.


  getStoryContext(story) {
    if (!this.globals) throw new Error(`getStoryContext called before initialization`);
    return Object.assign({}, story, {
      args: this.args.get(story.id),
      globals: this.globals.get(),
      hooks: this.hooks[story.id]
    });
  }

  cleanupStory(story) {
    this.hooks[story.id].clean();
  }

  extract(options = {
    includeDocsOnly: false
  }) {
    if (!this.storyIndex) throw new Error(`extract called before initialization`);
    const {
      cachedCSFFiles
    } = this;
    if (!cachedCSFFiles) throw new Error('Cannot call extract() unless you call cacheAllCSFFiles() first.');
    return Object.entries(this.storyIndex.entries).reduce((acc, [storyId, {
      type,
      importPath
    }]) => {
      if (type === 'docs') return acc;
      const csfFile = cachedCSFFiles[importPath];
      const story = this.storyFromCSFFile({
        storyId,
        csfFile
      });

      if (!options.includeDocsOnly && story.parameters.docsOnly) {
        return acc;
      }

      acc[storyId] = Object.entries(story).reduce((storyAcc, [key, value]) => {
        if (key === 'moduleExport') return storyAcc;

        if (typeof value === 'function') {
          return storyAcc;
        }

        if (Array.isArray(value)) {
          return Object.assign(storyAcc, {
            [key]: value.slice().sort()
          });
        }

        return Object.assign(storyAcc, {
          [key]: value
        });
      }, {
        args: story.initialArgs
      });
      return acc;
    }, {});
  }

  getSetStoriesPayload() {
    if (!this.globals) throw new Error(`getSetStoriesPayload called before initialization`);
    const stories = this.extract({
      includeDocsOnly: true
    });
    const kindParameters = Object.values(stories).reduce((acc, {
      title
    }) => {
      acc[title] = {};
      return acc;
    }, {});
    return {
      v: 2,
      globals: this.globals.get(),
      globalParameters: {},
      kindParameters,
      stories
    };
  } // NOTE: this is legacy `stories.json` data for the `extract` script.
  // It is used to allow v7 Storybooks to be composed in v6 Storybooks, which expect a
  // `stories.json` file with legacy fields (`kind` etc).


  raw() {
    return Object.values(this.extract()).map(({
      id
    }) => this.fromId(id)).filter(Boolean);
  }

  fromId(storyId) {
    if (!this.storyIndex) throw new Error(`fromId called before initialization`);
    if (!this.cachedCSFFiles) throw new Error('Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.');
    let importPath;

    try {
      ({
        importPath
      } = this.storyIndex.storyIdToEntry(storyId));
    } catch (err) {
      return null;
    }

    const csfFile = this.cachedCSFFiles[importPath];
    const story = this.storyFromCSFFile({
      storyId,
      csfFile
    });
    return Object.assign({}, story, {
      storyFn: update => {
        const context = Object.assign({}, this.getStoryContext(story), {
          viewMode: 'story'
        });
        return story.unboundStoryFn(Object.assign({}, context, update));
      }
    });
  }

}

exports.StoryStore = StoryStore;