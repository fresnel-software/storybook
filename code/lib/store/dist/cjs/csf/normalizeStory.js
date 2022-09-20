"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeStory = normalizeStory;

var _csf = require("@storybook/csf");

var _tsDedent = require("ts-dedent");

var _clientLogger = require("@storybook/client-logger");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _normalizeInputTypes = require("./normalizeInputTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deprecatedStoryAnnotation = (0, _tsDedent.dedent)`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
const deprecatedStoryAnnotationWarning = (0, _utilDeprecate.default)(() => {}, deprecatedStoryAnnotation);

function normalizeStory(key, storyAnnotations, meta) {
  const storyObject = storyAnnotations;
  const userStoryFn = typeof storyAnnotations === 'function' ? storyAnnotations : null;
  const {
    story
  } = storyObject;

  if (story) {
    _clientLogger.logger.debug('deprecated story', story);

    deprecatedStoryAnnotationWarning();
  }

  const exportName = (0, _csf.storyNameFromExport)(key);
  const name = typeof storyObject !== 'function' && storyObject.name || storyObject.storyName || (story === null || story === void 0 ? void 0 : story.name) || exportName;
  const decorators = [...(storyObject.decorators || []), ...((story === null || story === void 0 ? void 0 : story.decorators) || [])];
  const parameters = Object.assign({}, story === null || story === void 0 ? void 0 : story.parameters, storyObject.parameters);
  const args = Object.assign({}, story === null || story === void 0 ? void 0 : story.args, storyObject.args);
  const argTypes = Object.assign({}, story === null || story === void 0 ? void 0 : story.argTypes, storyObject.argTypes);
  const loaders = [...(storyObject.loaders || []), ...((story === null || story === void 0 ? void 0 : story.loaders) || [])];
  const {
    render,
    play
  } = storyObject; // eslint-disable-next-line no-underscore-dangle

  const id = parameters.__id || (0, _csf.toId)(meta.id, exportName);
  return Object.assign({
    moduleExport: storyAnnotations,
    id,
    name,
    decorators,
    parameters,
    args,
    argTypes: (0, _normalizeInputTypes.normalizeInputTypes)(argTypes),
    loaders
  }, render && {
    render
  }, userStoryFn && {
    userStoryFn
  }, play && {
    play
  });
}