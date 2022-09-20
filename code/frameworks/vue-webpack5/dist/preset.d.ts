import { PresetProperty } from '@storybook/core-common';
import { S as StorybookConfig } from './types-9ed1b837.js';
import '@storybook/preset-vue-webpack';
import '@storybook/builder-webpack5';

declare const addons: PresetProperty<'addons', StorybookConfig>;
declare const core: PresetProperty<'core', StorybookConfig>;
declare const typescript: (config: StorybookConfig['typescript']) => Promise<StorybookConfig['typescript']>;

export { addons, core, typescript };
