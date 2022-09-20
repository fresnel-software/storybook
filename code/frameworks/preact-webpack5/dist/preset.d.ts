import { PresetProperty } from '@storybook/core-common';
import { S as StorybookConfig } from './types-4f015207.js';
import '@storybook/preset-preact-webpack';
import '@storybook/builder-webpack5';

declare const addons: PresetProperty<'addons', StorybookConfig>;
declare const core: PresetProperty<'core', StorybookConfig>;

export { addons, core };
