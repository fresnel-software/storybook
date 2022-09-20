"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoryIndexStore = void 0;

var _tsDedent = require("ts-dedent");

var _memoizerific = _interopRequireDefault(require("memoizerific"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getImportPathMap = (0, _memoizerific.default)(1)(entries => Object.values(entries).reduce((acc, entry) => {
  acc[entry.importPath] = acc[entry.importPath] || entry;
  return acc;
}, {}));

class StoryIndexStore {
  constructor({
    entries
  } = {
    v: 4,
    entries: {}
  }) {
    this.entries = void 0;
    this.entries = entries;
  }

  entryFromSpecifier(specifier) {
    const entries = Object.values(this.entries);

    if (specifier === '*') {
      // '*' means select the first entry. If there is none, we have no selection.
      return entries[0];
    }

    if (typeof specifier === 'string') {
      // Find the story with the exact id that matches the specifier (see #11571)
      if (this.entries[specifier]) {
        return this.entries[specifier];
      } // Fallback to the first story that starts with the specifier


      return entries.find(entry => entry.id.startsWith(specifier));
    } // Try and find a story matching the name/kind, setting no selection if they don't exist.


    const {
      name,
      title
    } = specifier;
    return entries.find(entry => entry.name === name && entry.title === title);
  }

  storyIdToEntry(storyId) {
    const storyEntry = this.entries[storyId];

    if (!storyEntry) {
      throw new Error((0, _tsDedent.dedent)`Couldn't find story matching '${storyId}' after HMR.
      - Did you remove it from your CSF file?
      - Are you sure a story with that id exists?
      - Please check your entries field of your main.js config.
      - Also check the browser console and terminal for error messages.`);
    }

    return storyEntry;
  }

  importPathToEntry(importPath) {
    return getImportPathMap(this.entries)[importPath];
  }

}

exports.StoryIndexStore = StoryIndexStore;