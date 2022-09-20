import { storyNameFromExport, toId } from '@storybook/csf';
import { dedent } from 'ts-dedent';
import { logger } from '@storybook/client-logger';
import deprecate from 'util-deprecate';
import { normalizeInputTypes } from './normalizeInputTypes';
const deprecatedStoryAnnotation = dedent`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
const deprecatedStoryAnnotationWarning = deprecate(() => {}, deprecatedStoryAnnotation);
export function normalizeStory(key, storyAnnotations, meta) {
  const storyObject = storyAnnotations;
  const userStoryFn = typeof storyAnnotations === 'function' ? storyAnnotations : null;
  const {
    story
  } = storyObject;

  if (story) {
    logger.debug('deprecated story', story);
    deprecatedStoryAnnotationWarning();
  }

  const exportName = storyNameFromExport(key);
  const name = typeof storyObject !== 'function' && storyObject.name || storyObject.storyName || story?.name || exportName;
  const decorators = [...(storyObject.decorators || []), ...(story?.decorators || [])];
  const parameters = Object.assign({}, story?.parameters, storyObject.parameters);
  const args = Object.assign({}, story?.args, storyObject.args);
  const argTypes = Object.assign({}, story?.argTypes, storyObject.argTypes);
  const loaders = [...(storyObject.loaders || []), ...(story?.loaders || [])];
  const {
    render,
    play
  } = storyObject; // eslint-disable-next-line no-underscore-dangle

  const id = parameters.__id || toId(meta.id, exportName);
  return Object.assign({
    moduleExport: storyAnnotations,
    id,
    name,
    decorators,
    parameters,
    args,
    argTypes: normalizeInputTypes(argTypes),
    loaders
  }, render && {
    render
  }, userStoryFn && {
    userStoryFn
  }, play && {
    play
  });
}