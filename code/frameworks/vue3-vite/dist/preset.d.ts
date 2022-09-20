import { StorybookConfig } from '@storybook/builder-vite';

declare const addons: StorybookConfig['addons'];
declare const core: StorybookConfig['core'];
declare function readPackageJson(): Record<string, any> | false;
declare const viteFinal: StorybookConfig['viteFinal'];

export { addons, core, readPackageJson, viteFinal };
