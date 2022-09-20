import type { Builder, StorybookConfig as StorybookBaseConfig, Options } from '@storybook/core-common';
import type { InlineConfig, UserConfig } from 'vite';
export type { TypescriptOptions } from '@storybook/core-common';
export declare type ViteStats = {
    toJson: () => any;
};
export declare type ViteBuilder = Builder<UserConfig, ViteStats>;
export declare type ViteFinal = (config: InlineConfig, options: Options) => InlineConfig | Promise<InlineConfig>;
export declare type StorybookConfig = StorybookBaseConfig & {
    viteFinal?: ViteFinal;
};
export declare const start: ViteBuilder['start'];
export declare const build: ViteBuilder['build'];
