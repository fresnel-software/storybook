"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeGeneratorPlugin = codeGeneratorPlugin;

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _vite = require("vite");

var _transformIframeHtml = require("../transform-iframe-html");

var _codegenIframeScript = require("../codegen-iframe-script");

var _codegenModernIframeScript = require("../codegen-modern-iframe-script");

var _codegenImportfnScript = require("../codegen-importfn-script");

var _codegenEntries = require("../codegen-entries");

var _codegenSetAddonChannel = require("../codegen-set-addon-channel");

var _virtualFileNames = require("../virtual-file-names");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-param-reassign */
function codeGeneratorPlugin(options) {
  const iframePath = path.resolve(__dirname, '../../..', 'input', 'iframe.html');
  let iframeId; // noinspection JSUnusedGlobalSymbols

  return {
    name: 'storybook:code-generator-plugin',
    enforce: 'pre',

    configureServer(server) {
      // invalidate the whole vite-app.js script on every file change.
      // (this might be a little too aggressive?)
      server.watcher.on('change', () => {
        const appModule = server.moduleGraph.getModuleById(_virtualFileNames.virtualFileId);

        if (appModule) {
          server.moduleGraph.invalidateModule(appModule);
        }

        const storiesModule = server.moduleGraph.getModuleById(_virtualFileNames.virtualStoriesFile);

        if (storiesModule) {
          server.moduleGraph.invalidateModule(storiesModule);
        }
      }); // Adding new story files is not covered by the change event above. So we need to detect this and trigger
      // HMR to update the importFn.

      server.watcher.on('add', path => {
        // TODO maybe use the stories declaration in main
        if (/\.stories\.([tj])sx?$/.test(path) || /\.(story|stories).mdx$/.test(path)) {
          // We need to emit a change event to trigger HMR
          server.watcher.emit('change', _virtualFileNames.virtualStoriesFile);
        }
      });
    },

    config(config, {
      command
    }) {
      // If we are building the static distribution, add iframe.html as an entry.
      // In development mode, it's not an entry - instead, we use an express middleware
      // to serve iframe.html. The reason is that Vite's dev server (at the time of writing)
      // does not support virtual files as entry points.
      if (command === 'build') {
        if (!config.build) {
          config.build = {};
        }

        config.build.rollupOptions = Object.assign({}, config.build.rollupOptions, {
          input: iframePath
        });
      } // Detect if react 18 is installed.  If not, alias it to a virtual placeholder file.


      try {
        require.resolve('react-dom/client', {
          paths: [config.root || process.cwd()]
        });
      } catch (e) {
        if (isNodeError(e) && e.code === 'MODULE_NOT_FOUND') {
          config.resolve = (0, _vite.mergeConfig)(config.resolve ?? {}, {
            alias: {
              'react-dom/client': path.resolve(__dirname, '../../..', 'input', 'react-dom-client-placeholder.js')
            }
          });
        }
      }
    },

    configResolved(config) {
      iframeId = `${config.root}/iframe.html`;
    },

    resolveId(source) {
      if (source === _virtualFileNames.virtualFileId) {
        return _virtualFileNames.virtualFileId;
      }

      if (source === iframePath) {
        return iframeId;
      }

      if (source === _virtualFileNames.virtualStoriesFile) {
        return _virtualFileNames.virtualStoriesFile;
      }

      if (source === _virtualFileNames.virtualPreviewFile) {
        return _virtualFileNames.virtualPreviewFile;
      }

      if (source === _virtualFileNames.virtualAddonSetupFile) {
        return _virtualFileNames.virtualAddonSetupFile;
      }

      return undefined;
    },

    async load(id) {
      var _options$features;

      const storyStoreV7 = (_options$features = options.features) === null || _options$features === void 0 ? void 0 : _options$features.storyStoreV7;

      if (id === _virtualFileNames.virtualStoriesFile) {
        if (storyStoreV7) {
          return (0, _codegenImportfnScript.generateImportFnScriptCode)(options);
        }

        return (0, _codegenEntries.generateVirtualStoryEntryCode)(options);
      }

      if (id === _virtualFileNames.virtualAddonSetupFile) {
        return (0, _codegenSetAddonChannel.generateAddonSetupCode)();
      }

      if (id === _virtualFileNames.virtualPreviewFile && !storyStoreV7) {
        return (0, _codegenEntries.generatePreviewEntryCode)(options);
      }

      if (id === _virtualFileNames.virtualFileId) {
        if (storyStoreV7) {
          return (0, _codegenModernIframeScript.generateModernIframeScriptCode)(options);
        }

        return (0, _codegenIframeScript.generateIframeScriptCode)(options);
      }

      if (id === iframeId) {
        return fs.readFileSync(path.resolve(__dirname, '../../..', 'input', 'iframe.html'), 'utf-8');
      }

      return undefined;
    },

    async transformIndexHtml(html, ctx) {
      if (ctx.path !== '/iframe.html') {
        return undefined;
      }

      return (0, _transformIframeHtml.transformIframeHtml)(html, options);
    }

  };
} // Refines an error received from 'catch' to be a NodeJS exception


const isNodeError = error => error instanceof Error;