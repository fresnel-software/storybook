const _excluded = ["type", "importPath"],
      _excluded2 = ["default", "__namedExportsOrder"];

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable no-underscore-dangle */
import global from 'global';
import { dedent } from 'ts-dedent';
import { SynchronousPromise } from 'synchronous-promise';
import { toId, isExportStory, storyNameFromExport } from '@storybook/csf';
import { userOrAutoTitle, sortStoriesV6 } from '@storybook/store';
import { logger } from '@storybook/client-logger';
import deprecate from 'util-deprecate';
const docs2Warning = deprecate(() => {}, `You cannot use \`.mdx\` files without using \`storyStoreV7\`. Consider upgrading to the new store.`);
export class StoryStoreFacade {
  constructor() {
    this.projectAnnotations = void 0;
    this.entries = void 0;
    this.csfExports = void 0;
    this.projectAnnotations = {
      loaders: [],
      decorators: [],
      parameters: {},
      argsEnhancers: [],
      argTypesEnhancers: [],
      args: {},
      argTypes: {}
    };
    this.entries = {};
    this.csfExports = {};
  } // This doesn't actually import anything because the client-api loads fully
  // on startup, but this is a shim after all.


  importFn(path) {
    return SynchronousPromise.resolve().then(() => {
      const moduleExports = this.csfExports[path];
      if (!moduleExports) throw new Error(`Unknown path: ${path}`);
      return moduleExports;
    });
  }

  getStoryIndex(store) {
    const fileNameOrder = Object.keys(this.csfExports);
    const storySortParameter = this.projectAnnotations.parameters?.options?.storySort;
    const storyEntries = Object.entries(this.entries); // Add the kind parameters and global parameters to each entry

    const sortableV6 = storyEntries.map(([storyId, _ref]) => {
      let {
        type,
        importPath
      } = _ref,
          entry = _objectWithoutPropertiesLoose(_ref, _excluded);

      const exports = this.csfExports[importPath];
      const csfFile = store.processCSFFileWithCache(exports, importPath, exports.default.title);
      let storyLike;

      if (type === 'story') {
        storyLike = store.storyFromCSFFile({
          storyId,
          csfFile
        });
      } else {
        storyLike = Object.assign({}, entry, {
          story: entry.name,
          kind: entry.title,
          componentId: toId(entry.componentId || entry.title),
          parameters: {
            fileName: importPath
          }
        });
      }

      return [storyId, storyLike, csfFile.meta.parameters, this.projectAnnotations.parameters];
    }); // NOTE: the sortStoriesV6 version returns the v7 data format. confusing but more convenient!

    let sortedV7;

    try {
      sortedV7 = sortStoriesV6(sortableV6, storySortParameter, fileNameOrder);
    } catch (err) {
      if (typeof storySortParameter === 'function') {
        throw new Error(dedent`
          Error sorting stories with sort parameter ${storySortParameter}:

          > ${err.message}
          
          Are you using a V7-style sort function in V6 compatibility mode?
          
          More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
        `);
      }

      throw err;
    }

    const entries = sortedV7.reduce((acc, s) => {
      // We use the original entry we stored in `this.stories` because it is possible that the CSF file itself
      // exports a `parameters.fileName` which can be different and mess up our `importFn`.
      // In fact, in Storyshots there is a Jest transformer that does exactly that.
      // NOTE: this doesn't actually change the story object, just the index.
      acc[s.id] = this.entries[s.id];
      return acc;
    }, {});
    return {
      v: 4,
      entries
    };
  }

  clearFilenameExports(fileName) {
    if (!this.csfExports[fileName]) {
      return;
    } // Clear this module's stories from the storyList and existing exports


    Object.entries(this.entries).forEach(([id, {
      importPath
    }]) => {
      if (importPath === fileName) {
        delete this.entries[id];
      }
    }); // We keep this as an empty record so we can use it to maintain component order

    this.csfExports[fileName] = {};
  } // NOTE: we could potentially share some of this code with the stories.json generation


  addStoriesFromExports(fileName, fileExports) {
    if (fileName.match(/\.mdx$/) && !fileName.match(/\.stories\.mdx$/)) {
      docs2Warning();
      return;
    } // if the export haven't changed since last time we added them, this is a no-op


    if (this.csfExports[fileName] === fileExports) {
      return;
    } // OTOH, if they have changed, let's clear them out first


    this.clearFilenameExports(fileName);

    const {
      default: defaultExport,
      __namedExportsOrder
    } = fileExports,
          namedExports = _objectWithoutPropertiesLoose(fileExports, _excluded2); // eslint-disable-next-line prefer-const


    let {
      id: componentId,
      title
    } = defaultExport || {};
    const specifiers = (global.STORIES || []).map(specifier => Object.assign({}, specifier, {
      importPathMatcher: new RegExp(specifier.importPathMatcher)
    }));
    title = userOrAutoTitle(fileName, specifiers, title);

    if (!title) {
      logger.info(`Unexpected default export without title in '${fileName}': ${JSON.stringify(fileExports.default)}`);
      return;
    }

    this.csfExports[fileName] = Object.assign({}, fileExports, {
      default: Object.assign({}, defaultExport, {
        title
      })
    });
    let sortedExports = namedExports; // prefer a user/loader provided `__namedExportsOrder` array if supplied
    // we do this as es module exports are always ordered alphabetically
    // see https://github.com/storybookjs/storybook/issues/9136

    if (Array.isArray(__namedExportsOrder)) {
      sortedExports = {};

      __namedExportsOrder.forEach(name => {
        const namedExport = namedExports[name];
        if (namedExport) sortedExports[name] = namedExport;
      });
    }

    const docsOptions = global.DOCS_OPTIONS || {};
    const seenTitles = new Set();
    Object.entries(sortedExports).filter(([key]) => isExportStory(key, defaultExport)).forEach(([key, storyExport]) => {
      const exportName = storyNameFromExport(key);
      const id = storyExport.parameters?.__id || toId(componentId || title, exportName);
      const name = typeof storyExport !== 'function' && storyExport.name || storyExport.storyName || storyExport.story?.name || exportName;

      if (!seenTitles.has(title) && docsOptions.docsPage) {
        const name = docsOptions.defaultName;
        const docsId = toId(componentId || title, name);
        seenTitles.add(title);
        this.entries[docsId] = {
          type: 'docs',
          standalone: false,
          id: docsId,
          title,
          name,
          importPath: fileName,
          storiesImports: [],
          componentId
        };
      }

      this.entries[id] = {
        type: 'story',
        id,
        name,
        title,
        importPath: fileName,
        componentId
      };
    });
  }

}