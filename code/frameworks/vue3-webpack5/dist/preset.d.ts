import { PresetProperty } from '@storybook/core-common';
import { S as StorybookConfig } from './types-6ffb1842.js';
import '@storybook/preset-vue3-webpack';
import '@storybook/builder-webpack5';

declare const addons: PresetProperty<'addons', StorybookConfig>;
declare const core: PresetProperty<'core', StorybookConfig>;

export { addons, core };
