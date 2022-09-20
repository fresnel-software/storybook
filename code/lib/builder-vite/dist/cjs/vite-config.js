"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonConfig = commonConfig;
exports.pluginConfig = pluginConfig;
exports.readPackageJson = readPackageJson;

var path = _interopRequireWildcard(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _vite = require("vite");

var _pluginReact = _interopRequireDefault(require("@vitejs/plugin-react"));

var _coreCommon = require("@storybook/core-common");

var _envs = require("./envs");

var _plugins = require("./plugins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function readPackageJson() {
  const packageJsonPath = path.resolve('package.json');

  if (!_fs.default.existsSync(packageJsonPath)) {
    return false;
  }

  const jsonContent = _fs.default.readFileSync(packageJsonPath, 'utf8');

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

async function commonConfig(options, _type) {
  const {
    presets
  } = options;
  const configEnv = _type === 'development' ? configEnvServe : configEnvBuild;
  const {
    config: userConfig = {}
  } = (await (0, _vite.loadConfigFromFile)(configEnv)) ?? {};
  const sbConfig = {
    configFile: false,
    cacheDir: 'node_modules/.vite-storybook',
    root: path.resolve(options.configDir, '..'),
    plugins: await pluginConfig(options),
    resolve: {
      preserveSymlinks: (0, _coreCommon.isPreservingSymlinks)()
    },
    // If an envPrefix is specified in the vite config, add STORYBOOK_ to it,
    // otherwise, add VITE_ and STORYBOOK_ so that vite doesn't lose its default.
    envPrefix: userConfig.envPrefix ? 'STORYBOOK_' : ['VITE_', 'STORYBOOK_']
  };
  const config = (0, _vite.mergeConfig)(userConfig, sbConfig); // Sanitize environment variables if needed

  const envsRaw = await presets.apply('env');

  if (Object.keys(envsRaw).length) {
    // Stringify env variables after getting `envPrefix` from the  config
    const envs = (0, _envs.stringifyProcessEnvs)(envsRaw, config.envPrefix);
    config.define = Object.assign({}, config.define, envs);
  }

  return config;
}

async function pluginConfig(options) {
  const frameworkName = await (0, _coreCommon.getFrameworkName)(options);
  const plugins = [(0, _plugins.codeGeneratorPlugin)(options), // sourceLoaderPlugin(options),
  (0, _plugins.mdxPlugin)(options), _plugins.injectExportOrderPlugin, (0, _plugins.stripStoryHMRBoundary)()]; // We need the react plugin here to support MDX in non-react projects.

  if (frameworkName !== '@storybook/react-vite') {
    plugins.push((0, _pluginReact.default)({
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