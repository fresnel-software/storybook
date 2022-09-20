import { StorybookConfig } from '@storybook/core-webpack';
export { BuilderResult, StorybookConfig, TypescriptOptions } from '@storybook/core-webpack';

declare type SvelteOptions = {
    preprocess?: any;
};

declare const addons: StorybookConfig['addons'];

export { SvelteOptions, addons };
