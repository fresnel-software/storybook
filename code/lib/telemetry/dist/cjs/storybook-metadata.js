"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeAddonName = exports.metaFrameworks = exports.getStorybookMetadata = exports.computeStorybookMetadata = void 0;

var _readPkgUp = _interopRequireDefault(require("read-pkg-up"));

var _detectPackageManager = require("detect-package-manager");

var _coreCommon = require("@storybook/core-common");

var _packageVersions = require("./package-versions");

var _getMonorepoType = require("./get-monorepo-type");

var _sanitize = require("./sanitize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const metaFrameworks = {
  next: 'Next',
  'react-scripts': 'CRA',
  gatsby: 'Gatsby',
  '@nuxtjs/storybook': 'nuxt',
  '@nrwl/storybook': 'nx',
  '@vue/cli-service': 'vue-cli',
  '@sveltejs/kit': 'svelte-kit'
}; // @TODO: This should be removed in 7.0 as the framework.options field in main.js will replace this

exports.metaFrameworks = metaFrameworks;

const getFrameworkOptions = mainConfig => {
  const possibleOptions = ['angular', 'ember', 'html', 'preact', 'react', 'server', 'svelte', 'vue', 'vue3', 'webComponents'].map(opt => `${opt}Options`); // eslint-disable-next-line no-restricted-syntax

  for (const opt of possibleOptions) {
    if (opt in mainConfig) {
      return mainConfig[opt];
    }
  }

  return undefined;
};

const sanitizeAddonName = name => {
  return (0, _sanitize.cleanPaths)(name).replace(/\/dist\/.*/, '').replace(/\.[mc]?[tj]?s[x]?$/, '').replace(/\/register$/, '').replace(/\/manager$/, '').replace(/\/preset$/, '');
}; // Analyze a combination of information from main.js and package.json
// to provide telemetry over a Storybook project


exports.sanitizeAddonName = sanitizeAddonName;

const computeStorybookMetadata = async ({
  packageJson,
  mainConfig
}) => {
  var _mainConfig$core, _storybookPackages$st;

  const metadata = {
    generatedAt: new Date().getTime(),
    builder: {
      name: 'webpack5'
    },
    hasCustomBabel: false,
    hasCustomWebpack: false,
    hasStaticDirs: false,
    hasStorybookEslint: false,
    refCount: 0
  };
  const allDependencies = Object.assign({}, packageJson === null || packageJson === void 0 ? void 0 : packageJson.dependencies, packageJson === null || packageJson === void 0 ? void 0 : packageJson.devDependencies, packageJson === null || packageJson === void 0 ? void 0 : packageJson.peerDependencies);
  const metaFramework = Object.keys(allDependencies).find(dep => !!metaFrameworks[dep]);

  if (metaFramework) {
    const {
      version
    } = await (0, _packageVersions.getActualPackageVersion)(metaFramework);
    metadata.metaFramework = {
      name: metaFrameworks[metaFramework],
      packageName: metaFramework,
      version
    };
  }

  const monorepoType = (0, _getMonorepoType.getMonorepoType)();

  if (monorepoType) {
    metadata.monorepo = monorepoType;
  }

  try {
    const packageManagerType = await (0, _detectPackageManager.detect)({
      cwd: (0, _coreCommon.getProjectRoot)()
    });
    const packageManagerVerson = await (0, _detectPackageManager.getNpmVersion)(packageManagerType);
    metadata.packageManager = {
      type: packageManagerType,
      version: packageManagerVerson
    }; // Better be safe than sorry, some codebases/paths might end up breaking with something like "spawn pnpm ENOENT"
    // so we just set the package manager if the detection is successful
    // eslint-disable-next-line no-empty
  } catch (err) {}

  metadata.hasCustomBabel = !!mainConfig.babel;
  metadata.hasCustomWebpack = !!mainConfig.webpackFinal;
  metadata.hasStaticDirs = !!mainConfig.staticDirs;

  if (mainConfig.typescript) {
    metadata.typescriptOptions = mainConfig.typescript;
  }

  if ((_mainConfig$core = mainConfig.core) !== null && _mainConfig$core !== void 0 && _mainConfig$core.builder) {
    const {
      builder
    } = mainConfig.core;
    metadata.builder = {
      name: typeof builder === 'string' ? builder : builder.name,
      options: typeof builder === 'string' ? undefined : (builder === null || builder === void 0 ? void 0 : builder.options) ?? undefined
    };
  }

  if (mainConfig.refs) {
    metadata.refCount = Object.keys(mainConfig.refs).length;
  }

  if (mainConfig.features) {
    metadata.features = mainConfig.features;
  }

  const addons = {};

  if (mainConfig.addons) {
    mainConfig.addons.forEach(addon => {
      let addonName;
      let options;

      if (typeof addon === 'string') {
        addonName = sanitizeAddonName(addon);
      } else {
        options = addon.options;
        addonName = sanitizeAddonName(addon.name);
      }

      addons[addonName] = {
        options,
        version: undefined
      };
    });
  }

  const addonVersions = await (0, _packageVersions.getActualPackageVersions)(addons);
  addonVersions.forEach(({
    name,
    version
  }) => {
    addons[name].version = version;
  });
  const addonNames = Object.keys(addons); // all Storybook deps minus the addons

  const storybookPackages = Object.keys(allDependencies).filter(dep => dep.includes('storybook') && !addonNames.includes(dep)).reduce((acc, dep) => {
    return Object.assign({}, acc, {
      [dep]: {
        version: undefined
      }
    });
  }, {});
  const storybookPackageVersions = await (0, _packageVersions.getActualPackageVersions)(storybookPackages);
  storybookPackageVersions.forEach(({
    name,
    version
  }) => {
    storybookPackages[name].version = version;
  });
  const language = allDependencies.typescript ? 'typescript' : 'javascript';
  const hasStorybookEslint = !!allDependencies['eslint-plugin-storybook']; // FIXME: resolve framework/renderer split in 7.0
  //        OR should be getting this from mainConfig instead?

  const storybookInfo = (0, _coreCommon.getStorybookInfo)(packageJson);
  const storybookVersion = ((_storybookPackages$st = storybookPackages[storybookInfo.frameworkPackage]) === null || _storybookPackages$st === void 0 ? void 0 : _storybookPackages$st.version) || storybookInfo.version;
  return Object.assign({}, metadata, {
    storybookVersion,
    language,
    storybookPackages,
    framework: {
      name: storybookInfo.framework,
      options: getFrameworkOptions(mainConfig)
    },
    addons,
    hasStorybookEslint
  });
};

exports.computeStorybookMetadata = computeStorybookMetadata;
let cachedMetadata;

const getStorybookMetadata = async _configDir => {
  var _packageJson$scripts;

  if (cachedMetadata) {
    return cachedMetadata;
  }

  const {
    packageJson = {}
  } = _readPkgUp.default.sync({
    cwd: process.cwd(),
    normalize: false
  }) || {};
  const configDir = (_configDir || (0, _coreCommon.getStorybookConfiguration)((packageJson === null || packageJson === void 0 ? void 0 : (_packageJson$scripts = packageJson.scripts) === null || _packageJson$scripts === void 0 ? void 0 : _packageJson$scripts.storybook) || '', '-c', '--config-dir')) ?? '.storybook';
  const mainConfig = (0, _coreCommon.loadMainConfig)({
    configDir
  });
  cachedMetadata = await computeStorybookMetadata({
    mainConfig,
    packageJson
  });
  return cachedMetadata;
};

exports.getStorybookMetadata = getStorybookMetadata;