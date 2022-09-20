"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortStoriesV7 = exports.sortStoriesV6 = void 0;

var _tsDedent = require("ts-dedent");

var _storySort = require("./storySort");

const sortStoriesCommon = (stories, storySortParameter, fileNameOrder) => {
  if (storySortParameter) {
    let sortFn;

    if (typeof storySortParameter === 'function') {
      sortFn = storySortParameter;
    } else {
      sortFn = (0, _storySort.storySort)(storySortParameter);
    }

    stories.sort(sortFn);
  } else {
    stories.sort((s1, s2) => fileNameOrder.indexOf(s1.importPath) - fileNameOrder.indexOf(s2.importPath));
  }

  return stories;
};

const sortStoriesV7 = (stories, storySortParameter, fileNameOrder) => {
  try {
    return sortStoriesCommon(stories, storySortParameter, fileNameOrder);
  } catch (err) {
    throw new Error((0, _tsDedent.dedent)`
    Error sorting stories with sort parameter ${storySortParameter}:

    > ${err.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
  }
};

exports.sortStoriesV7 = sortStoriesV7;

const toIndexEntry = story => {
  const {
    id,
    title,
    name,
    parameters,
    type
  } = story;
  return {
    id,
    title,
    name,
    importPath: parameters.fileName,
    type
  };
};

const sortStoriesV6 = (stories, storySortParameter, fileNameOrder) => {
  if (storySortParameter && typeof storySortParameter === 'function') {
    stories.sort(storySortParameter);
    return stories.map(s => toIndexEntry(s[1]));
  }

  const storiesV7 = stories.map(s => toIndexEntry(s[1]));
  return sortStoriesCommon(storiesV7, storySortParameter, fileNameOrder);
};

exports.sortStoriesV6 = sortStoriesV6;