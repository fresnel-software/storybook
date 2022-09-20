import { PresetProperty } from '@storybook/core-common';
import { S as StorybookConfig } from './types-00986772.js';
import '@storybook/preset-server-webpack';
import '@storybook/builder-webpack5';

declare const addons: PresetProperty<'addons', StorybookConfig>;
declare const core: PresetProperty<'core', StorybookConfig>;

export { addons, core };
