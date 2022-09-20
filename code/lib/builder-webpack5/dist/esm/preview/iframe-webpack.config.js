function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import path from 'path';
import { DefinePlugin, HotModuleReplacementPlugin, ProgressPlugin, ProvidePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'; // @ts-ignore

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import VirtualModulePlugin from 'webpack-virtual-modules';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { stringifyProcessEnvs, handlebars, interpolate, normalizeStories, readTemplate, loadPreviewOrConfigFile, isPreservingSymlinks, getFrameworkName } from '@storybook/core-common';
import { toRequireContextString, toImportFn } from '@storybook/core-webpack';
import { createBabelLoader } from './babel-loader-preview';

var storybookPaths = _objectSpread({
  global: path.dirname(require.resolve(`global/package.json`))
}, ['addons', 'api', 'store', 'channels', 'channel-postmessage', 'channel-websocket', 'components', 'core-events', 'router', 'theming', 'semver', 'preview-web', 'client-api', 'client-logger'].reduce(function (acc, sbPackage) {
  return _objectSpread(_objectSpread({}, acc), {}, {
    [`@storybook/${sbPackage}`]: path.dirname(require.resolve(`@storybook/${sbPackage}/package.json`))
  });
}, {}));

export default (async function (options) {
  var _coreOptions$builder;

  var _options$outputDir = options.outputDir,
      outputDir = _options$outputDir === void 0 ? path.join('.', 'public') : _options$outputDir,
      quiet = options.quiet,
      packageJson = options.packageJson,
      configType = options.configType,
      presets = options.presets,
      previewUrl = options.previewUrl,
      babelOptions = options.babelOptions,
      typescriptOptions = options.typescriptOptions,
      features = options.features,
      serverChannelUrl = options.serverChannelUrl;
  var frameworkName = await getFrameworkName(options);
  var frameworkOptions = await presets.apply('frameworkOptions');
  var isProd = configType === 'PRODUCTION';
  var envs = await presets.apply('env');
  var logLevel = await presets.apply('logLevel', undefined);
  var headHtmlSnippet = await presets.apply('previewHead');
  var bodyHtmlSnippet = await presets.apply('previewBody');
  var template = await presets.apply('previewMainTemplate');
  var coreOptions = await presets.apply('core');
  var builderOptions = typeof coreOptions.builder === 'string' ? {} : ((_coreOptions$builder = coreOptions.builder) === null || _coreOptions$builder === void 0 ? void 0 : _coreOptions$builder.options) || {};
  var docsOptions = await presets.apply('docs');
  var previewAnnotations = [...(await presets.apply('previewAnnotations', [], options)), loadPreviewOrConfigFile(options)].filter(Boolean);
  var entries = await presets.apply('entries', [], options);
  var workingDir = process.cwd();
  var stories = normalizeStories(await presets.apply('stories', [], options), {
    configDir: options.configDir,
    workingDir: workingDir
  });
  var virtualModuleMapping = {};

  if (features !== null && features !== void 0 && features.storyStoreV7) {
    var storiesFilename = 'storybook-stories.js';
    var storiesPath = path.resolve(path.join(workingDir, storiesFilename));
    var needPipelinedImport = !!builderOptions.lazyCompilation && !isProd;
    virtualModuleMapping[storiesPath] = toImportFn(stories, {
      needPipelinedImport: needPipelinedImport
    });
    var configEntryPath = path.resolve(path.join(workingDir, 'storybook-config-entry.js'));
    virtualModuleMapping[configEntryPath] = handlebars(await readTemplate(require.resolve('@storybook/builder-webpack5/templates/virtualModuleModernEntry.js.handlebars')), {
      storiesFilename: storiesFilename,
      previewAnnotations: previewAnnotations
    } // We need to double escape `\` for webpack. We may have some in windows paths
    ).replace(/\\/g, '\\\\');
    entries.push(configEntryPath);
  } else {
    var frameworkInitEntry = path.resolve(path.join(workingDir, 'storybook-init-framework-entry.js'));
    virtualModuleMapping[frameworkInitEntry] = `import '${frameworkName}';`;
    entries.push(frameworkInitEntry);
    var entryTemplate = await readTemplate(path.join(__dirname, 'virtualModuleEntry.template.js'));
    previewAnnotations.forEach(function (previewAnnotationFilename) {
      var clientApi = storybookPaths['@storybook/client-api'];
      var clientLogger = storybookPaths['@storybook/client-logger']; // NOTE: although this file is also from the `dist/cjs` directory, it is actually a ESM
      // file, see https://github.com/storybookjs/storybook/pull/16727#issuecomment-986485173

      virtualModuleMapping[`${previewAnnotationFilename}-generated-config-entry.js`] = interpolate(entryTemplate, {
        previewAnnotationFilename: previewAnnotationFilename,
        clientApi: clientApi,
        clientLogger: clientLogger
      });
      entries.push(`${previewAnnotationFilename}-generated-config-entry.js`);
    });

    if (stories.length > 0) {
      var storyTemplate = await readTemplate(path.join(__dirname, 'virtualModuleStory.template.js')); // NOTE: this file has a `.cjs` extension as it is a CJS file (from `dist/cjs`) and runs
      // in the user's webpack mode, which may be strict about the use of require/import.
      // See https://github.com/storybookjs/storybook/issues/14877

      var _storiesFilename = path.resolve(path.join(workingDir, `generated-stories-entry.cjs`));

      virtualModuleMapping[_storiesFilename] = interpolate(storyTemplate, {
        frameworkName: frameworkName
      }) // Make sure we also replace quotes for this one
      .replace("'{{stories}}'", stories.map(toRequireContextString).join(','));
      entries.push(_storiesFilename);
    }
  }

  var shouldCheckTs = typescriptOptions.check && !typescriptOptions.skipBabel;
  var tsCheckOptions = typescriptOptions.checkOptions || {};
  return {
    name: 'preview',
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: 'cheap-module-source-map',
    entry: entries,
    output: {
      path: path.resolve(process.cwd(), outputDir),
      filename: isProd ? '[name].[contenthash:8].iframe.bundle.js' : '[name].iframe.bundle.js',
      publicPath: ''
    },
    stats: {
      preset: 'none',
      logging: 'error'
    },
    watchOptions: {
      ignored: /node_modules/
    },
    ignoreWarnings: [{
      message: /export '\S+' was not found in 'global'/
    }],
    plugins: [Object.keys(virtualModuleMapping).length > 0 ? new VirtualModulePlugin(virtualModuleMapping) : null, new HtmlWebpackPlugin({
      filename: `iframe.html`,
      // FIXME: `none` isn't a known option
      chunksSortMode: 'none',
      alwaysWriteToDisk: true,
      inject: false,
      template: template,
      templateParameters: {
        version: packageJson.version,
        globals: {
          CONFIG_TYPE: configType,
          LOGLEVEL: logLevel,
          FRAMEWORK_OPTIONS: frameworkOptions,
          CHANNEL_OPTIONS: coreOptions.channelOptions,
          FEATURES: features,
          PREVIEW_URL: previewUrl,
          STORIES: stories.map(function (specifier) {
            return _objectSpread(_objectSpread({}, specifier), {}, {
              importPathMatcher: specifier.importPathMatcher.source
            });
          }),
          DOCS_OPTIONS: docsOptions,
          SERVER_CHANNEL_URL: serverChannelUrl
        },
        headHtmlSnippet: headHtmlSnippet,
        bodyHtmlSnippet: bodyHtmlSnippet
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }), new DefinePlugin(_objectSpread(_objectSpread({}, stringifyProcessEnvs(envs)), {}, {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    })), new ProvidePlugin({
      process: require.resolve('process/browser.js')
    }), isProd ? null : new HotModuleReplacementPlugin(), new CaseSensitivePathsPlugin(), quiet ? null : new ProgressPlugin({}), shouldCheckTs ? new ForkTsCheckerWebpackPlugin(tsCheckOptions) : null].filter(Boolean),
    module: {
      rules: [{
        test: /\.m?js$/,
        type: 'javascript/auto'
      }, {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      }, createBabelLoader(babelOptions, typescriptOptions), {
        test: /\.md$/,
        type: 'asset/source'
      }]
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.cjs'],
      modules: ['node_modules'].concat(envs.NODE_PATH || []),
      mainFields: ['browser', 'module', 'main'].filter(Boolean),
      alias: storybookPaths,
      fallback: {
        path: require.resolve('path-browserify'),
        assert: require.resolve('browser-assert'),
        util: require.resolve('util')
      },
      // Set webpack to resolve symlinks based on whether the user has asked node to.
      // This feels like it should be default out-of-the-box in webpack :shrug:
      symlinks: !isPreservingSymlinks()
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true,
      sideEffects: true,
      usedExports: isProd,
      moduleIds: 'named',
      minimizer: isProd ? [new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          sourceMap: true,
          mangle: false,
          keep_fnames: true
        }
      })] : []
    },
    performance: {
      hints: isProd ? 'warning' : false
    }
  };
});