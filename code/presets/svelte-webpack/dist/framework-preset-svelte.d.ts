import { StorybookConfig } from '@storybook/core-webpack';

declare const webpack: StorybookConfig['webpack'];
declare const babelDefault: StorybookConfig['babelDefault'];

export { babelDefault, webpack };
