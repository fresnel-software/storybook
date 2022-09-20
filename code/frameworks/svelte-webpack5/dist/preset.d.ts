import { PresetProperty } from '@storybook/core-common';
import { S as StorybookConfig } from './types-c609bcdb.js';
import '@storybook/preset-svelte-webpack';
import '@storybook/builder-webpack5';

declare const addons: PresetProperty<'addons', StorybookConfig>;
declare const core: PresetProperty<'core', StorybookConfig>;

export { addons, core };
