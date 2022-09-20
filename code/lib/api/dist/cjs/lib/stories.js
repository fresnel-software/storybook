"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformStoryIndexToStoriesHash = exports.transformSetStoriesStoryDataToStoriesHash = exports.getStoriesLookupList = exports.getComponentLookupList = exports.denormalizeStoryParameters = exports.addPreparedStories = void 0;

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = require("ts-dedent");

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _countBy = _interopRequireDefault(require("lodash/countBy"));

var _global = _interopRequireDefault(require("global"));

var _csf = require("@storybook/csf");

var _index = require("../index");

var _merge = _interopRequireDefault(require("./merge"));

const _excluded = ["docsOnly", "fileName"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const {
  FEATURES
} = _global.default;
const warnLegacyShowRoots = (0, _utilDeprecate.default)(() => {}, (0, _tsDedent.dedent)`
    The 'showRoots' config option is deprecated and will be removed in Storybook 7.0. Use 'sidebar.showRoots' instead.
    Read more about it in the migration guide: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md
  `);
const warnChangedDefaultHierarchySeparators = (0, _utilDeprecate.default)(() => {}, (0, _tsDedent.dedent)`
    The default hierarchy separators changed in Storybook 6.0.
    '|' and '.' will no longer create a hierarchy, but codemods are available.
    Read more about it in the migration guide: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md
  `);

const denormalizeStoryParameters = ({
  globalParameters,
  kindParameters,
  stories
}) => {
  return (0, _mapValues.default)(stories, storyData => Object.assign({}, storyData, {
    parameters: (0, _index.combineParameters)(globalParameters, kindParameters[storyData.kind], storyData.parameters)
  }));
};

exports.denormalizeStoryParameters = denormalizeStoryParameters;
const TITLE_PATH_SEPARATOR = /\s*\/\s*/; // We used to received a bit more data over the channel on the SET_STORIES event, including
// the full parameters for each story.

const transformSetStoriesStoryDataToStoriesHash = (data, {
  provider,
  docsOptions
}) => transformStoryIndexToStoriesHash(transformSetStoriesStoryDataToPreparedStoryIndex(data, {
  docsOptions
}), {
  provider,
  docsOptions
});

exports.transformSetStoriesStoryDataToStoriesHash = transformSetStoriesStoryDataToStoriesHash;

const transformSetStoriesStoryDataToPreparedStoryIndex = (stories, {
  docsOptions
}) => {
  const seenTitles = new Set();
  const entries = Object.entries(stories).reduce((acc, [id, story]) => {
    if (!story) return acc;

    const _story$parameters = story.parameters,
          {
      docsOnly,
      fileName
    } = _story$parameters,
          parameters = _objectWithoutPropertiesLoose(_story$parameters, _excluded);

    const base = {
      title: story.kind,
      id,
      name: story.name,
      importPath: fileName
    };

    if (docsOnly) {
      acc[id] = Object.assign({
        type: 'docs',
        storiesImports: []
      }, base);
    } else {
      if (!seenTitles.has(base.title) && docsOptions.docsPage) {
        const name = docsOptions.defaultName;
        const docsId = (0, _csf.toId)(story.componentId || base.title, name);
        seenTitles.add(base.title);
        acc[docsId] = Object.assign({
          type: 'docs',
          storiesImports: []
        }, base, {
          id: docsId,
          name
        });
      }

      const {
        argTypes,
        args,
        initialArgs
      } = story;
      acc[id] = Object.assign({
        type: 'story'
      }, base, {
        parameters,
        argTypes,
        args,
        initialArgs
      });
    }

    return acc;
  }, {});
  return {
    v: 4,
    entries
  };
};

const transformStoryIndexV3toV4 = index => {
  const countByTitle = (0, _countBy.default)(Object.values(index.stories), 'title');
  return {
    v: 4,
    entries: Object.values(index.stories).reduce((acc, entry) => {
      var _entry$parameters;

      let type = 'story';

      if ((_entry$parameters = entry.parameters) !== null && _entry$parameters !== void 0 && _entry$parameters.docsOnly || entry.name === 'Page' && countByTitle[entry.title] === 1) {
        type = 'docs';
      }

      acc[entry.id] = Object.assign({
        type
      }, type === 'docs' && {
        storiesImports: []
      }, entry);
      return acc;
    }, {})
  };
};

const transformStoryIndexToStoriesHash = (index, {
  provider,
  docsOptions
}) => {
  if (!index.v) throw new Error('Composition: Missing stories.json version');
  const v4Index = index.v === 4 ? index : transformStoryIndexV3toV4(index);
  const entryValues = Object.values(v4Index.entries);
  const {
    sidebar = {},
    showRoots: deprecatedShowRoots
  } = provider.getConfig();
  const {
    showRoots = deprecatedShowRoots,
    collapsedRoots = [],
    renderLabel
  } = sidebar;
  const usesOldHierarchySeparator = entryValues.some(({
    title
  }) => title.match(/\.|\|/)); // dot or pipe

  if (typeof deprecatedShowRoots !== 'undefined') {
    warnLegacyShowRoots();
  }

  const setShowRoots = typeof showRoots !== 'undefined';

  if (usesOldHierarchySeparator && !setShowRoots && FEATURES !== null && FEATURES !== void 0 && FEATURES.warnOnLegacyHierarchySeparator) {
    warnChangedDefaultHierarchySeparators();
  }

  const storiesHashOutOfOrder = Object.values(entryValues).reduce((acc, item) => {
    if (docsOptions.docsMode && item.type !== 'docs') return acc; // First, split the title into a set of names, separated by '/' and trimmed.

    const {
      title
    } = item;
    const groups = title.trim().split(TITLE_PATH_SEPARATOR);
    const root = (!setShowRoots || showRoots) && groups.length > 1 ? [groups.shift()] : [];
    const names = [...root, ...groups]; // Now create a "path" or sub id for each name

    const paths = names.reduce((list, name, idx) => {
      const parent = idx > 0 && list[idx - 1];
      const id = (0, _csf.sanitize)(parent ? `${parent}-${name}` : name);

      if (parent === id) {
        throw new Error((0, _tsDedent.dedent)`
          Invalid part '${name}', leading to id === parentId ('${id}'), inside title '${title}'
          
          Did you create a path that uses the separator char accidentally, such as 'Vue <docs/>' where '/' is a separator char? See https://github.com/storybookjs/storybook/issues/6128
          `);
      }

      list.push(id);
      return list;
    }, []); // Now, let's add an entry to the hash for each path/name pair

    paths.forEach((id, idx) => {
      // The child is the next path, OR the story/docs entry itself
      const childId = paths[idx + 1] || item.id;

      if (root.length && idx === 0) {
        acc[id] = (0, _merge.default)(acc[id] || {}, {
          type: 'root',
          id,
          name: names[idx],
          depth: idx,
          renderLabel,
          startCollapsed: collapsedRoots.includes(id),
          // Note that this will later get appended to the previous list of children (see below)
          children: [childId],
          // deprecated fields
          isRoot: true,
          isComponent: false,
          isLeaf: false
        }); // Usually the last path/name pair will be displayed as a component,
        // *unless* there are other stories that are more deeply nested under it
        //
        // For example, if we had stories for both
        //   - Atoms / Button
        //   - Atoms / Button / LabelledButton
        //
        // In this example the entry for 'atoms-button' would *not* be a component.
      } else if ((!acc[id] || acc[id].type === 'component') && idx === paths.length - 1) {
        acc[id] = (0, _merge.default)(acc[id] || {}, Object.assign({
          type: 'component',
          id,
          name: names[idx],
          parent: paths[idx - 1],
          depth: idx,
          renderLabel
        }, childId && {
          children: [childId]
        }, {
          // deprecated fields
          isRoot: false,
          isComponent: true,
          isLeaf: false
        }));
      } else {
        acc[id] = (0, _merge.default)(acc[id] || {}, Object.assign({
          type: 'group',
          id,
          name: names[idx],
          parent: paths[idx - 1],
          depth: idx,
          renderLabel
        }, childId && {
          children: [childId]
        }, {
          // deprecated fields
          isRoot: false,
          isComponent: false,
          isLeaf: false
        }));
      }
    }); // Finally add an entry for the docs/story itself

    acc[item.id] = Object.assign({
      type: 'story'
    }, item, {
      depth: paths.length,
      parent: paths[paths.length - 1],
      renderLabel
    }, item.type !== 'docs' && {
      prepared: !!item.parameters
    }, {
      // deprecated fields
      kind: item.title,
      isRoot: false,
      isComponent: false,
      isLeaf: true
    });
    return acc;
  }, {}); // This function adds a "root" or "orphan" and all of its descendents to the hash.

  function addItem(acc, item) {
    // If we were already inserted as part of a group, that's great.
    if (acc[item.id]) {
      return acc;
    }

    acc[item.id] = item; // Ensure we add the children depth-first *before* inserting any other entries

    if (item.type === 'root' || item.type === 'group' || item.type === 'component') {
      item.children.forEach(childId => addItem(acc, storiesHashOutOfOrder[childId]));
    }

    return acc;
  } // We'll do two passes over the data, adding all the orphans, then all the roots


  const orphanHash = Object.values(storiesHashOutOfOrder).filter(i => i.type !== 'root' && !i.parent).reduce(addItem, {});
  return Object.values(storiesHashOutOfOrder).filter(i => i.type === 'root').reduce(addItem, orphanHash);
};

exports.transformStoryIndexToStoriesHash = transformStoryIndexToStoriesHash;

const addPreparedStories = (newHash, oldHash) => {
  if (!oldHash) return newHash;
  return Object.fromEntries(Object.entries(newHash).map(([id, newEntry]) => {
    const oldEntry = oldHash[id];

    if (newEntry.type === 'story' && (oldEntry === null || oldEntry === void 0 ? void 0 : oldEntry.type) === 'story' && oldEntry.prepared) {
      return [id, Object.assign({}, oldEntry, newEntry, {
        prepared: true
      })];
    }

    return [id, newEntry];
  }));
};

exports.addPreparedStories = addPreparedStories;
const getComponentLookupList = (0, _memoizerific.default)(1)(hash => {
  return Object.entries(hash).reduce((acc, i) => {
    const value = i[1];

    if (value.type === 'component') {
      acc.push([...value.children]);
    }

    return acc;
  }, []);
});
exports.getComponentLookupList = getComponentLookupList;
const getStoriesLookupList = (0, _memoizerific.default)(1)(hash => {
  return Object.keys(hash).filter(k => ['story', 'docs'].includes(hash[k].type));
});
exports.getStoriesLookupList = getStoriesLookupList;