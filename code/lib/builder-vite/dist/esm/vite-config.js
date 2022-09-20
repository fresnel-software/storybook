import * as path from 'path';
import fs from 'fs';
import { loadConfigFromFile, mergeConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { isPreservingSymlinks, getFrameworkName } from '@storybook/core-common';
import { stringifyProcessEnvs } from './envs';
import { codeGeneratorPlugin, injectExportOrderPlugin, mdxPlugin, stripStoryHMRBoundary } from './plugins';
export function readPackageJson() {
  const packageJsonPath = path.resolve('package.json');

  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const jsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  return JSON.parse(jsonContent);
}
const configEnvServe = {
  mode: 'development',
  command: 'serve',
  ssrBuild: false
};
const configEnvBuild = {
  mode: 'production',
  command: 'build',
  ssrBuild: false
}; // Vite config that is common to development and production mode

export async function commonConfig(options, _type) {
  const {
    presets
  } = options;
  const configEnv = _type === 'development' ? configEnvServe : configEnvBuild;
  const {
    config: userConfig = {}
  } = (await loadConfigFromFile(configEnv)) ?? {};
  const sbConfig = {
    configFile: false,
    cacheDir: 'node_modules/.vite-storybook',
    root: path.resolve(options.configDir, '..'),
    plugins: await pluginConfig(options),
    resolve: {
      preserveSymlinks: isPreservingSymlinks()
    },
    // If an envPrefix is specified in the vite config, add STORYBOOK_ to it,
    // otherwise, add VITE_ and STORYBOOK_ so that vite doesn't lose its default.
    envPrefix: userConfig.envPrefix ? 'STORYBOOK_' : ['VITE_', 'STORYBOOK_']
  };
  const config = mergeConfig(userConfig, sbConfig); // Sanitize environment variables if needed

  const envsRaw = await presets.apply('env');

  if (Object.keys(envsRaw).length) {
    // Stringify env variables after getting `envPrefix` from the  config
    const envs = stringifyProcessEnvs(envsRaw, config.envPrefix);
    config.define = Object.assign({}, config.define, envs);
  }

  return config;
}
export async function pluginConfig(options) {
  const frameworkName = await getFrameworkName(options);
  const plugins = [codeGeneratorPlugin(options), // sourceLoaderPlugin(options),
  mdxPlugin(options), injectExportOrderPlugin, stripStoryHMRBoundary()]; // We need the react plugin here to support MDX in non-react projects.

  if (frameworkName !== '@storybook/react-vite') {
    plugins.push(viteReact({
      exclude: [/\.stories\.([tj])sx?$/, /node_modules/, /\.([tj])sx?$/]
    }));
  } // TODO: framework doesn't exist, should move into framework when/if built


  if (frameworkName === '@storybook/preact-vite') {
    // eslint-disable-next-line global-require
    plugins.push(require('@preact/preset-vite').default());
  } // TODO: framework doesn't exist, should move into framework when/if built


  if (frameworkName === '@storybook/glimmerx-vite') {
    // eslint-disable-next-line global-require, import/extensions
    const plugin = require('vite-plugin-glimmerx/index.cjs');

    plugins.push(plugin.default());
  }

  return plugins;
}