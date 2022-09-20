"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  setProjectAnnotations: true,
  composeStory: true,
  composeStories: true
};
exports.composeStories = composeStories;
exports.composeStory = composeStory;
exports.setProjectAnnotations = setProjectAnnotations;

var _csf = require("@storybook/csf");

var _composeConfigs = require("../composeConfigs");

var _prepareStory = require("../prepareStory");

var _normalizeStory = require("../normalizeStory");

var _hooks = require("../../hooks");

var _normalizeComponentAnnotations = require("../normalizeComponentAnnotations");

var _getValuesFromArgTypes = require("../getValuesFromArgTypes");

var _normalizeProjectAnnotations = require("../normalizeProjectAnnotations");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
const _excluded = ["default", "__esModule", "__namedExportsOrder"];

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

let GLOBAL_STORYBOOK_PROJECT_ANNOTATIONS = {};

function setProjectAnnotations(projectAnnotations) {
  const annotations = Array.isArray(projectAnnotations) ? projectAnnotations : [projectAnnotations];
  GLOBAL_STORYBOOK_PROJECT_ANNOTATIONS = (0, _composeConfigs.composeConfigs)(annotations);
}

function composeStory(storyAnnotations, componentAnnotations, projectAnnotations = GLOBAL_STORYBOOK_PROJECT_ANNOTATIONS, defaultConfig = {}, exportsName) {
  var _storyAnnotations$sto;

  if (storyAnnotations === undefined) {
    throw new Error('Expected a story but received undefined.');
  } // @TODO: Support auto title
  // eslint-disable-next-line no-param-reassign


  componentAnnotations.title = componentAnnotations.title ?? 'ComposedStory';
  const normalizedComponentAnnotations = (0, _normalizeComponentAnnotations.normalizeComponentAnnotations)(componentAnnotations);
  const storyName = exportsName || storyAnnotations.storyName || ((_storyAnnotations$sto = storyAnnotations.story) === null || _storyAnnotations$sto === void 0 ? void 0 : _storyAnnotations$sto.name) || storyAnnotations.name || 'unknown';
  const normalizedStory = (0, _normalizeStory.normalizeStory)(storyName, storyAnnotations, normalizedComponentAnnotations);
  const normalizedProjectAnnotations = (0, _normalizeProjectAnnotations.normalizeProjectAnnotations)(Object.assign({}, projectAnnotations, defaultConfig));
  const story = (0, _prepareStory.prepareStory)(normalizedStory, normalizedComponentAnnotations, normalizedProjectAnnotations);
  const defaultGlobals = (0, _getValuesFromArgTypes.getValuesFromArgTypes)(projectAnnotations.globalTypes);

  const composedStory = extraArgs => {
    const context = Object.assign({}, story, {
      hooks: new _hooks.HooksContext(),
      globals: defaultGlobals,
      args: Object.assign({}, story.initialArgs, extraArgs)
    });
    return story.unboundStoryFn(context);
  };

  composedStory.storyName = storyName;
  composedStory.args = story.initialArgs;
  composedStory.play = story.playFunction;
  composedStory.parameters = story.parameters;
  return composedStory;
}

function composeStories(storiesImport, globalConfig, composeStoryFn) {
  const {
    default: meta
  } = storiesImport,
        stories = _objectWithoutPropertiesLoose(storiesImport, _excluded);

  const composedStories = Object.entries(stories).reduce((storiesMap, [exportsName, story]) => {
    if (!(0, _csf.isExportStory)(exportsName, meta)) {
      return storiesMap;
    }

    const result = Object.assign(storiesMap, {
      [exportsName]: composeStoryFn(story, meta, globalConfig, exportsName)
    });
    return result;
  }, {});
  return composedStories;
}