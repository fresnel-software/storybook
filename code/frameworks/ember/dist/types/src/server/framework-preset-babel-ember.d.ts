import type { TransformOptions } from '@babel/core';
import type { StorybookConfig, Options } from '@storybook/core-common';
export declare function babel(config: TransformOptions, options: Options): TransformOptions;
export declare const previewAnnotations: StorybookConfig['previewAnnotations'];
