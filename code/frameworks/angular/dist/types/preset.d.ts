import type { PresetProperty } from '@storybook/core-common';
import { StorybookConfig } from './types';
export declare const addons: PresetProperty<'addons', StorybookConfig>;
export declare const previewAnnotations: StorybookConfig['previewAnnotations'];
export declare const core: PresetProperty<'core', StorybookConfig>;
export declare const typescript: PresetProperty<'typescript', StorybookConfig>;