import { BuilderOutput } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import type { CLIOptions } from '@storybook/core-common';
import { ExtraEntryPoint, StylePreprocessorOptions } from '@angular-devkit/build-angular';
export declare type StorybookBuilderOptions = JsonObject & {
    browserTarget?: string | null;
    tsConfig?: string;
    compodoc: boolean;
    compodocArgs: string[];
    styles?: ExtraEntryPoint[];
    stylePreprocessorOptions?: StylePreprocessorOptions;
} & Pick<CLIOptions, 'outputDir' | 'configDir' | 'loglevel' | 'quiet' | 'docs' | 'webpackStatsJson'>;
export declare type StorybookBuilderOutput = JsonObject & BuilderOutput & {};
declare const _default: import("@angular-devkit/architect/src/internal").Builder<any>;
export default _default;
