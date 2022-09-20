const _excluded = ["docsOnly", "fileName"];

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import memoize from 'memoizerific';
import deprecate from 'util-deprecate';
import { dedent } from 'ts-dedent';
import mapValues from 'lodash/mapValues';
import countBy from 'lodash/countBy';
import global from 'global';
import { toId, sanitize } from '@storybook/csf';
import { combineParameters } from '../index';
import merge from './merge';
const {
  FEATURES
} = global;
const warnLegacyShowRoots = deprecate(() => {}, dedent`
    The 'showRoots' config option is deprecated and will be removed in Storybook 7.0. Use 'sidebar.showRoots' instead.
    Read more about it in the migration guide: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md
  `);
const warnChangedDefaultHierarchySeparators = deprecate(() => {}, dedent`
    The default hierarchy separators changed in Storybook 6.0.
    '|' and '.' will no longer create a hierarchy, but codemods are available.
    Read more about it in the migration guide: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md
  `);
export const denormalizeStoryParameters = ({
  globalParameters,
  kindParameters,
  stories
}) => {
  return mapValues(stories, storyData => Object.assign({}, storyData, {
    parameters: combineParameters(globalParameters, kindParameters[storyData.kind], storyData.parameters)
  }));
};
const TITLE_PATH_SEPARATOR = /\s*\/\s*/; // We used to received a bit more data over the channel on the SET_STORIES event, including
// the full parameters for each story.

export const transformSetStoriesStoryDataToStoriesHash = (data, {
  provider,
  docsOptions
}) => transformStoryIndexToStoriesHash(transformSetStoriesStoryDataToPreparedStoryIndex(data, {
  docsOptions
}), {
  provider,
  docsOptions
});

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
        const docsId = toId(story.componentId || base.title, name);
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
  const countByTitle = countBy(Object.values(index.stories), 'title');
  return {
    v: 4,
    entries: Object.values(index.stories).reduce((acc, entry) => {
      let type = 'story';

      if (entry.parameters?.docsOnly || entry.name === 'Page' && countByTitle[entry.title] === 1) {
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

export const transformStoryIndexToStoriesHash = (index, {
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

  if (usesOldHierarchySeparator && !setShowRoots && FEATURES?.warnOnLegacyHierarchySeparator) {
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
      const id = sanitize(parent ? `${parent}-${name}` : name);

      if (parent === id) {
        throw new Error(dedent`
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
        acc[id] = merge(acc[id] || {}, {
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
        acc[id] = merge(acc[id] || {}, Object.assign({
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
        acc[id] = merge(acc[id] || {}, Object.assign({
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
export const addPreparedStories = (newHash, oldHash) => {
  if (!oldHash) return newHash;
  return Object.fromEntries(Object.entries(newHash).map(([id, newEntry]) => {
    const oldEntry = oldHash[id];

    if (newEntry.type === 'story' && oldEntry?.type === 'story' && oldEntry.prepared) {
      return [id, Object.assign({}, oldEntry, newEntry, {
        prepared: true
      })];
    }

    return [id, newEntry];
  }));
};
export const getComponentLookupList = memoize(1)(hash => {
  return Object.entries(hash).reduce((acc, i) => {
    const value = i[1];

    if (value.type === 'component') {
      acc.push([...value.children]);
    }

    return acc;
  }, []);
});
export const getStoriesLookupList = memoize(1)(hash => {
  return Object.keys(hash).filter(k => ['story', 'docs'].includes(hash[k].type));
});