import type { Options as CoreOptions } from '@storybook/core-common';
import { BuilderContext } from '@angular-devkit/architect';
import { ExtraEntryPoint, StylePreprocessorOptions } from '@angular-devkit/build-angular';
export declare type PresetOptions = CoreOptions & {
    angularBrowserTarget?: string | null;
    angularBuilderOptions?: {
        styles?: ExtraEntryPoint[];
        stylePreprocessorOptions?: StylePreprocessorOptions;
    };
    angularBuilderContext?: BuilderContext | null;
    tsConfig?: string;
};