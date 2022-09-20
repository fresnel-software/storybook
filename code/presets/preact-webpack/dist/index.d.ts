import { StorybookConfig } from '@storybook/core-webpack';
export { BuilderResult, StorybookConfig, TypescriptOptions } from '@storybook/core-webpack';

declare const babelDefault: StorybookConfig['babelDefault'];
declare const webpackFinal: StorybookConfig['webpackFinal'];

export { babelDefault, webpackFinal };
