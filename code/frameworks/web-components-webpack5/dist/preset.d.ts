import { PresetProperty } from '@storybook/core-common';
import { S as StorybookConfig } from './types-98e4eb62.js';
import '@storybook/preset-web-components-webpack';
import '@storybook/builder-webpack5';

declare const addons: PresetProperty<'addons', StorybookConfig>;
declare const core: PresetProperty<'core', StorybookConfig>;

export { addons, core };
