function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import path from 'path';
import fs from 'fs-extra';
import glob from 'globby';
import slash from 'slash';
import { userOrAutoTitleFromSpecifier, sortStoriesV7 } from '@storybook/store';
import { normalizeStoryPath } from '@storybook/core-common';
import { logger } from '@storybook/node-logger';
import { getStorySortParameter } from '@storybook/csf-tools';
import { toId } from '@storybook/csf';
/** A .mdx file will produce a "standalone" docs entry */

var makeAbsolute = function (otherImport, normalizedPath, workingDir) {
  return otherImport.startsWith('.') ? slash(path.resolve(workingDir, normalizeStoryPath(path.join(path.dirname(normalizedPath), otherImport)))) : otherImport;
};
/**
 * The StoryIndexGenerator extracts stories and docs entries for each file matching
 * (one or more) stories "specifiers", as defined in main.js.
 *
 * The output is a set of entries (see above for the types).
 *
 * Each file is treated as a stories or a (modern) docs file.
 *
 * A stories file is indexed by an indexer (passed in), which produces a list of stories.
 *   - If the stories have the `parameters.docsOnly` setting, they are disregarded.
 *   - If the indexer is a "docs template" indexer, OR docsPage is enabled,
 *       a templated docs entry is added pointing to the story file.
 *
 * A (modern) docs file is indexed, a standalone docs entry is added.
 *
 * The entries are "uniq"-ed and sorted. Stories entries are preferred to docs entries and
 * standalone docs entries are preferred to templates (with warnings).
 */


export class StoryIndexGenerator {
  // An internal cache mapping specifiers to a set of path=><set of stories>
  // Later, we'll combine each of these subsets together to form the full index
  // Cache the last value of `getStoryIndex`. We invalidate (by unsetting) when:
  //  - any file changes, including deletions
  //  - the preview changes [not yet implemented]
  constructor(specifiers, options) {
    this.specifiers = specifiers;
    this.options = options;
    this.specifierToCache = void 0;
    this.lastIndex = void 0;
    this.specifierToCache = new Map();
  }

  async initialize() {
    var _this = this;

    // Find all matching paths for each specifier
    await Promise.all(this.specifiers.map(async function (specifier) {
      var pathToSubIndex = {};
      var fullGlob = slash(path.join(_this.options.workingDir, specifier.directory, specifier.files));
      var files = await glob(fullGlob);
      files.sort().forEach(function (absolutePath) {
        var ext = path.extname(absolutePath);

        if (ext === '.storyshot') {
          var relativePath = path.relative(_this.options.workingDir, absolutePath);
          logger.info(`Skipping ${ext} file ${relativePath}`);
          return;
        }

        pathToSubIndex[absolutePath] = false;
      });

      _this.specifierToCache.set(specifier, pathToSubIndex);
    })); // Extract stories for each file

    await this.ensureExtracted();
  }
  /**
   * Run the updater function over all the empty cache entries
   */


  async updateExtracted(updater, overwrite = false) {
    var _this2 = this;

    await Promise.all(this.specifiers.map(async function (specifier) {
      var entry = _this2.specifierToCache.get(specifier);

      return Promise.all(Object.keys(entry).map(async function (absolutePath) {
        if (entry[absolutePath] && !overwrite) return;
        entry[absolutePath] = await updater(specifier, absolutePath, entry[absolutePath]);
      }));
    }));
  }

  isDocsMdx(absolutePath) {
    return /(?<!\.stories)\.mdx$/i.test(absolutePath);
  }

  async ensureExtracted() {
    var _this3 = this;

    // First process all the story files. Then, in a second pass,
    // process the docs files. The reason for this is that the docs
    // files may use the `<Meta of={XStories} />` syntax, which requires
    // that the story file that contains the meta be processed first.
    await this.updateExtracted(async function (specifier, absolutePath) {
      return _this3.isDocsMdx(absolutePath) ? false : _this3.extractStories(specifier, absolutePath);
    });

    if (this.options.docs.enabled) {
      await this.updateExtracted(async function (specifier, absolutePath) {
        return _this3.extractDocs(specifier, absolutePath);
      });
    }

    return this.specifiers.flatMap(function (specifier) {
      var cache = _this3.specifierToCache.get(specifier);

      return Object.values(cache).flatMap(function (entry) {
        if (!entry) return [];
        if (entry.type === 'docs') return [entry];
        return entry.entries;
      });
    });
  }

  findDependencies(absoluteImports) {
    var dependencies = [];
    var foundImports = new Set();
    this.specifierToCache.forEach(function (cache) {
      var fileNames = Object.keys(cache).filter(function (fileName) {
        var foundImport = absoluteImports.find(function (storyImport) {
          return fileName.startsWith(storyImport);
        });
        if (foundImport) foundImports.add(foundImport);
        return !!foundImport;
      });
      fileNames.forEach(function (fileName) {
        var cacheEntry = cache[fileName];

        if (cacheEntry && cacheEntry.type === 'stories') {
          dependencies.push(cacheEntry);
        } else {
          throw new Error(`Unexpected dependency: ${cacheEntry}`);
        }
      });
    }); // imports can include non-story imports, so it's ok if
    // there are fewer foundImports than absoluteImports
    // if (absoluteImports.length !== foundImports.size) {
    //   throw new Error(`Missing dependencies: ${absoluteImports.filter((p) => !foundImports.has(p))}`));
    // }

    return dependencies;
  }

  async extractStories(specifier, absolutePath) {
    var relativePath = path.relative(this.options.workingDir, absolutePath);
    var entries = [];

    try {
      var importPath = slash(normalizeStoryPath(relativePath));

      var makeTitle = function (userTitle) {
        return userOrAutoTitleFromSpecifier(importPath, specifier, userTitle);
      };

      var storyIndexer = this.options.storyIndexers.find(function (indexer) {
        return indexer.test.exec(absolutePath);
      });

      if (!storyIndexer) {
        throw new Error(`No matching story indexer found for ${absolutePath}`);
      }

      var csf = await storyIndexer.indexer(absolutePath, {
        makeTitle: makeTitle
      });
      csf.stories.forEach(function ({
        id: id,
        name: name,
        parameters: parameters
      }) {
        if (!(parameters !== null && parameters !== void 0 && parameters.docsOnly)) {
          entries.push({
            id: id,
            title: csf.meta.title,
            name: name,
            importPath: importPath,
            type: 'story'
          });
        }
      });

      if (this.options.docs.enabled) {
        // We always add a template for *.stories.mdx, but only if docs page is enabled for
        // regular CSF files
        if (storyIndexer.addDocsTemplate || this.options.docs.docsPage) {
          var name = this.options.docs.defaultName;
          var id = toId(csf.meta.title, name);
          entries.unshift({
            id: id,
            title: csf.meta.title,
            name: name,
            importPath: importPath,
            type: 'docs',
            storiesImports: [],
            standalone: false
          });
        }
      }
    } catch (err) {
      if (err.name === 'NoMetaError') {
        logger.info(`💡 Skipping ${relativePath}: ${err}`);
      } else {
        logger.warn(`🚨 Extraction error on ${relativePath}: ${err}`);
        throw err;
      }
    }

    return {
      entries: entries,
      type: 'stories',
      dependents: []
    };
  }

  async extractDocs(specifier, absolutePath) {
    var _this4 = this;

    var relativePath = path.relative(this.options.workingDir, absolutePath);

    try {
      if (!this.options.storyStoreV7) {
        throw new Error(`You cannot use \`.mdx\` files without using \`storyStoreV7\`.`);
      }

      var normalizedPath = normalizeStoryPath(relativePath);
      var importPath = slash(normalizedPath); // This `await require(...)` is a bit of a hack. It's necessary because
      // `docs-mdx` depends on ESM code, which must be asynchronously imported
      // to be used in CJS. Unfortunately, we cannot use `import()` here, because
      // it will be transpiled down to `require()` by Babel. So instead, we require
      // a CJS export from `@storybook/docs-mdx` that does the `async import` for us.
      // eslint-disable-next-line global-require

      var _await$require = await require('@storybook/docs-mdx'),
          analyze = _await$require.analyze;

      var content = await fs.readFile(absolutePath, 'utf8');
      var result = analyze(content); // Templates are not indexed

      if (result.isTemplate) return false;
      var absoluteImports = result.imports.map(function (p) {
        return makeAbsolute(p, normalizedPath, _this4.options.workingDir);
      }); // Go through the cache and collect all of the cache entries that this docs file depends on.
      // We'll use this to make sure this docs cache entry is invalidated when any of its dependents
      // are invalidated.

      var dependencies = this.findDependencies(absoluteImports); // Also, if `result.of` is set, it means that we're using the `<Meta of={XStories} />` syntax,
      // so find the `title` defined the file that `meta` points to.

      var ofTitle;

      if (result.of) {
        var absoluteOf = makeAbsolute(result.of, normalizedPath, this.options.workingDir);
        dependencies.forEach(function (dep) {
          if (dep.entries.length > 0) {
            var first = dep.entries[0];

            if (path.resolve(_this4.options.workingDir, first.importPath).startsWith(absoluteOf)) {
              ofTitle = first.title;
            }
          }
        });
        if (!ofTitle) throw new Error(`Could not find "${result.of}" for docs file "${relativePath}".`);
      } // Track that we depend on this for easy invalidation later.


      dependencies.forEach(function (dep) {
        dep.dependents.push(absolutePath);
      });
      var title = ofTitle || userOrAutoTitleFromSpecifier(importPath, specifier, result.title);
      var name = result.name || this.options.docs.defaultName;
      var id = toId(title, name);
      var docsEntry = {
        id: id,
        title: title,
        name: name,
        importPath: importPath,
        storiesImports: dependencies.map(function (dep) {
          return dep.entries[0].importPath;
        }),
        type: 'docs',
        standalone: true
      };
      return docsEntry;
    } catch (err) {
      logger.warn(`🚨 Extraction error on ${relativePath}: ${err}`);
      throw err;
    }
  }

  chooseDuplicate(firstEntry, secondEntry) {
    var firstIsBetter = true;

    if (secondEntry.type === 'story') {
      firstIsBetter = false;
    } else if (secondEntry.standalone && firstEntry.type === 'docs' && !firstEntry.standalone) {
      firstIsBetter = false;
    }

    var betterEntry = firstIsBetter ? firstEntry : secondEntry;
    var worseEntry = firstIsBetter ? secondEntry : firstEntry;
    var changeDocsName = 'Use `<Meta of={} name="Other Name">` to distinguish them.'; // This shouldn't be possible, but double check and use for typing

    if (worseEntry.type === 'story') throw new Error(`Duplicate stories with id: ${firstEntry.id}`);

    if (betterEntry.type === 'story') {
      var worseDescriptor = worseEntry.standalone ? `component docs page` : `automatically generated docs page`;

      if (betterEntry.name === this.options.docs.defaultName) {
        logger.warn(`🚨 You have a story for ${betterEntry.title} with the same name as your default docs entry name (${betterEntry.name}), so the docs page is being dropped. Consider changing the story name.`);
      } else {
        logger.warn(`🚨 You have a story for ${betterEntry.title} with the same name as your ${worseDescriptor} (${worseEntry.name}), so the docs page is being dropped. ${changeDocsName}`);
      }
    } else if (betterEntry.standalone) {
      // Both entries are standalone but pointing at the same place
      if (worseEntry.standalone) {
        logger.warn(`🚨 You have two component docs pages with the same name ${betterEntry.title}:${betterEntry.name}. ${changeDocsName}`);
      } // If one entry is standalone (i.e. .mdx of={}) we are OK with it overriding a template
      //   - docs page templates, this is totally fine and expected
      //   - not sure if it is even possible to have a .mdx of={} pointing at a stories.mdx file

    } else {
      // If both entries are templates (e.g. you have two CSF files with the same title), then
      //   we need to merge the entries. We'll use the the first one's name and importPath,
      //   but ensure we include both as storiesImports so they are both loaded before rendering
      //   the story (for the <Stories> block & friends)
      return _objectSpread(_objectSpread({}, betterEntry), {}, {
        storiesImports: [...betterEntry.storiesImports, worseEntry.importPath, ...worseEntry.storiesImports]
      });
    }

    return betterEntry;
  }

  async sortStories(storiesList) {
    var _this5 = this;

    var entries = {};
    storiesList.forEach(function (entry) {
      var existing = entries[entry.id];

      if (existing) {
        entries[entry.id] = _this5.chooseDuplicate(existing, entry);
      } else {
        entries[entry.id] = entry;
      }
    });
    var sortableStories = Object.values(entries); // Skip sorting if we're in v6 mode because we don't have
    // all the info we need here

    if (this.options.storyStoreV7) {
      var storySortParameter = await this.getStorySortParameter();
      var fileNameOrder = this.storyFileNames();
      sortStoriesV7(sortableStories, storySortParameter, fileNameOrder);
    }

    return sortableStories.reduce(function (acc, item) {
      acc[item.id] = item;
      return acc;
    }, {});
  }

  async getIndex() {
    if (this.lastIndex) return this.lastIndex; // Extract any entries that are currently missing
    // Pull out each file's stories into a list of stories, to be composed and sorted

    var storiesList = await this.ensureExtracted();
    var sorted = await this.sortStories(storiesList);
    var compat = sorted;

    if (this.options.storiesV2Compatibility) {
      var titleToStoryCount = Object.values(sorted).reduce(function (acc, story) {
        acc[story.title] = (acc[story.title] || 0) + 1;
        return acc;
      }, {}); // @ts-expect-error (Converted from ts-ignore)

      compat = Object.entries(sorted).reduce(function (acc, entry) {
        var _entry = _slicedToArray(entry, 2),
            id = _entry[0],
            story = _entry[1];

        if (story.type === 'docs') return acc;
        acc[id] = _objectSpread(_objectSpread({}, story), {}, {
          kind: story.title,
          story: story.name,
          parameters: {
            __id: story.id,
            docsOnly: titleToStoryCount[story.title] === 1 && story.name === 'Page',
            fileName: story.importPath
          }
        });
        return acc;
      }, {});
    }

    this.lastIndex = {
      v: 4,
      entries: compat
    };
    return this.lastIndex;
  }

  invalidate(specifier, importPath, removed) {
    var _this6 = this;

    var absolutePath = slash(path.resolve(this.options.workingDir, importPath));
    var cache = this.specifierToCache.get(specifier);
    var cacheEntry = cache[absolutePath];

    if (cacheEntry && cacheEntry.type === 'stories') {
      var dependents = cacheEntry.dependents;
      var invalidated = new Set(); // the dependent can be in ANY cache, so we loop over all of them

      this.specifierToCache.forEach(function (otherCache) {
        dependents.forEach(function (dep) {
          if (otherCache[dep]) {
            invalidated.add(dep); // eslint-disable-next-line no-param-reassign

            otherCache[dep] = false;
          }
        });
      });
      var notFound = dependents.filter(function (dep) {
        return !invalidated.has(dep);
      });

      if (notFound.length > 0) {
        throw new Error(`Could not invalidate ${notFound.length} deps: ${notFound.join(', ')}`);
      }
    }

    if (removed) {
      if (cacheEntry && cacheEntry.type === 'docs') {
        var absoluteImports = cacheEntry.storiesImports.map(function (p) {
          return path.resolve(_this6.options.workingDir, p);
        });
        var dependencies = this.findDependencies(absoluteImports);
        dependencies.forEach(function (dep) {
          return dep.dependents.splice(dep.dependents.indexOf(absolutePath), 1);
        });
      }

      delete cache[absolutePath];
    } else {
      cache[absolutePath] = false;
    }

    this.lastIndex = null;
  }

  async getStorySortParameter() {
    var _this7 = this;

    var previewFile = ['js', 'jsx', 'ts', 'tsx'].map(function (ext) {
      return path.join(_this7.options.configDir, `preview.${ext}`);
    }).find(function (fname) {
      return fs.existsSync(fname);
    });
    var storySortParameter;

    if (previewFile) {
      var previewCode = (await fs.readFile(previewFile, 'utf-8')).toString();
      storySortParameter = await getStorySortParameter(previewCode);
    }

    return storySortParameter;
  } // Get the story file names in "imported order"


  storyFileNames() {
    return Array.from(this.specifierToCache.values()).flatMap(function (r) {
      return Object.keys(r);
    });
  }

}