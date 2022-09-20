import { StorybookConfig as StorybookConfig$1, TypescriptOptions as TypescriptOptions$1 } from '@storybook/preset-server-webpack';
import { BuilderOptions, StorybookConfigWebpack, TypescriptOptions } from '@storybook/builder-webpack5';

declare type FrameworkName = '@storybook/server-webpack5';
declare type BuilderName = '@storybook/builder-webpack5';
declare type FrameworkOptions = {
    builder?: BuilderOptions;
};
declare type StorybookConfigFramework = {
    framework: FrameworkName | {
        name: FrameworkName;
        options: FrameworkOptions;
    };
    core?: StorybookConfig$1['core'] & {
        builder?: BuilderName | {
            name: BuilderName;
            options: BuilderOptions;
        };
    };
    typescript?: Partial<TypescriptOptions & TypescriptOptions$1> & StorybookConfig$1['typescript'];
};
/**
 * The interface for Storybook configuration in `main.ts` files.
 */
declare type StorybookConfig = Omit<StorybookConfig$1, keyof StorybookConfigWebpack | keyof StorybookConfigFramework> & StorybookConfigWebpack & StorybookConfigFramework;

export { FrameworkOptions as F, StorybookConfig as S };