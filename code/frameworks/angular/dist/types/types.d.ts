import type { StorybookConfig as StorybookConfigBase, TypescriptOptions as TypescriptOptionsReact } from '@storybook/core-webpack';
import type { StorybookConfigWebpack, BuilderOptions, TypescriptOptions as TypescriptOptionsBuilder } from '@storybook/builder-webpack5';
declare type FrameworkName = '@storybook/angular';
declare type BuilderName = '@storybook/builder-webpack5';
export declare type FrameworkOptions = AngularOptions & {
    builder?: BuilderOptions;
};
declare type StorybookConfigFramework = {
    framework: FrameworkName | {
        name: FrameworkName;
        options: FrameworkOptions;
    };
    core?: StorybookConfigBase['core'] & {
        builder?: BuilderName | {
            name: BuilderName;
            options: BuilderOptions;
        };
    };
    typescript?: Partial<TypescriptOptionsBuilder & TypescriptOptionsReact> & StorybookConfigBase['typescript'];
};
/**
 * The interface for Storybook configuration in `main.ts` files.
 */
export declare type StorybookConfig = Omit<StorybookConfigBase, keyof StorybookConfigWebpack | keyof StorybookConfigFramework> & StorybookConfigWebpack & StorybookConfigFramework;
export interface AngularOptions {
    enableIvy: boolean;
}
export {};
