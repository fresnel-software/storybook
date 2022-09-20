"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceLoaderPlugin = sourceLoaderPlugin;

var _sourceLoader = _interopRequireDefault(require("@storybook/source-loader"));

var _magicString = _interopRequireDefault(require("magic-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storyPattern = /\.stories\.[jt]sx?$/;
const storySourcePattern = /var __STORY__ = "(.*)"/;
const storySourceReplacement = '--STORY_SOURCE_REPLACEMENT--';

const mockClassLoader = id => ({
  // eslint-disable-next-line no-console
  emitWarning: message => console.warn(message),
  resourcePath: id
}); // HACK: Until we can support only node 15+ and use string.prototype.replaceAll


const replaceAll = (str, search, replacement) => {
  return str.split(search).join(replacement);
};

function sourceLoaderPlugin(config) {
  if (config.configType === 'DEVELOPMENT') {
    return {
      name: 'storybook:source-loader-plugin',
      enforce: 'pre',

      async transform(src, id) {
        if (id.match(storyPattern)) {
          const code = await _sourceLoader.default.call(mockClassLoader(id), src);
          const s = new _magicString.default(src); // Entirely replace with new code

          s.overwrite(0, src.length, code);
          return {
            code: s.toString(),
            map: s.generateMap({
              hires: true,
              source: id
            })
          };
        }

        return undefined;
      }

    };
  } // In production, we need to be fancier, to avoid vite:define plugin from replacing values inside the `__STORY__` string


  const storySources = new WeakMap();
  return [{
    name: 'storybook-vite-source-loader-plugin',
    enforce: 'pre',

    buildStart() {
      storySources.set(config, new Map());
    },

    async transform(src, id) {
      if (id.match(storyPattern)) {
        let code = await _sourceLoader.default.call(mockClassLoader(id), src);
        const [_, sourceString] = code.match(storySourcePattern) ?? [null, null];

        if (sourceString) {
          const map = storySources.get(config);
          map === null || map === void 0 ? void 0 : map.set(id, sourceString); // Remove story source so that it is not processed by vite:define plugin

          code = replaceAll(code, sourceString, storySourceReplacement);
        }

        const s = new _magicString.default(src); // Entirely replace with new code

        s.overwrite(0, src.length, code);
        return {
          code: s.toString(),
          map: s.generateMap()
        };
      }

      return undefined;
    }

  }, {
    name: 'storybook-vite-source-loader-plugin-post',
    enforce: 'post',

    buildStart() {
      storySources.set(config, new Map());
    },

    async transform(src, id) {
      if (id.match(storyPattern)) {
        const s = new _magicString.default(src);
        const map = storySources.get(config);
        const storySourceStatement = map === null || map === void 0 ? void 0 : map.get(id); // Put the previously-extracted source back in

        if (storySourceStatement) {
          const newCode = replaceAll(src, storySourceReplacement, storySourceStatement);
          s.overwrite(0, src.length, newCode);
        }

        return {
          code: s.toString(),
          map: s.generateMap()
        };
      }

      return undefined;
    }

  }];
}