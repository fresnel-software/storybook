"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptimizeDeps = getOptimizeDeps;

var path = _interopRequireWildcard(require("path"));

var _vite = require("vite");

var _listStories = require("./list-stories");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const INCLUDE_CANDIDATES = ['@base2/pretty-print-object', '@emotion/core', '@emotion/is-prop-valid', '@emotion/styled', '@mdx-js/react', '@storybook/addon-docs > acorn-jsx', '@storybook/addon-docs', '@storybook/addons', '@storybook/channel-postmessage', '@storybook/channel-websocket', '@storybook/client-api', '@storybook/client-logger', '@storybook/core/client', '@storybook/csf', '@storybook/preview-web', '@storybook/react > acorn-jsx', '@storybook/react', '@storybook/svelte', '@storybook/vue3', 'acorn-jsx', 'acorn-walk', 'acorn', 'airbnb-js-shims', 'ansi-to-html', 'axe-core', 'color-convert', 'deep-object-diff', 'doctrine', 'emotion-theming', 'escodegen', 'estraverse', 'fast-deep-equal', 'global', 'html-tags', 'isobject', 'jest-mock', 'loader-utils', 'lodash/cloneDeep', 'lodash/isFunction', 'lodash/isPlainObject', 'lodash/isString', 'lodash/mapKeys', 'lodash/mapValues', 'lodash/pick', 'lodash/pickBy', 'lodash/startCase', 'lodash/throttle', 'lodash/uniq', 'markdown-to-jsx', 'memoizerific', 'overlayscrollbars', 'polished', 'prettier/parser-babel', 'prettier/parser-flow', 'prettier/parser-typescript', 'prop-types', 'qs', 'react-dom', 'react-dom/client', 'react-fast-compare', 'react-is', 'react-textarea-autosize', 'react', 'react/jsx-runtime', 'refractor/core', 'refractor/lang/bash.js', 'refractor/lang/css.js', 'refractor/lang/graphql.js', 'refractor/lang/js-extras.js', 'refractor/lang/json.js', 'refractor/lang/jsx.js', 'refractor/lang/markdown.js', 'refractor/lang/markup.js', 'refractor/lang/tsx.js', 'refractor/lang/typescript.js', 'refractor/lang/yaml.js', 'regenerator-runtime/runtime.js', 'slash', 'store2', 'synchronous-promise', 'telejson', 'ts-dedent', 'unfetch', 'util-deprecate', 'uuid-browser/v4', 'vue', 'warning'];
/**
 * Helper function which allows us to `filter` with an async predicate.  Uses Promise.all for performance.
 */

const asyncFilter = async (arr, predicate) => Promise.all(arr.map(predicate)).then(results => arr.filter((_v, index) => results[index]));

async function getOptimizeDeps(config, options) {
  const {
    root = process.cwd()
  } = config;
  const absoluteStories = await (0, _listStories.listStories)(options);
  const stories = absoluteStories.map(storyPath => (0, _vite.normalizePath)(path.relative(root, storyPath))); // TODO: check if resolveConfig takes a lot of time, possible optimizations here

  const resolvedConfig = await (0, _vite.resolveConfig)(config, 'serve', 'development'); // This function converts ids which might include ` > ` to a real path, if it exists on disk.
  // See https://github.com/vitejs/vite/blob/67d164392e8e9081dc3f0338c4b4b8eea6c5f7da/packages/vite/src/node/optimizer/index.ts#L182-L199

  const resolve = resolvedConfig.createResolver({
    asSrc: false
  });
  const include = await asyncFilter(INCLUDE_CANDIDATES, async id => Boolean(await resolve(id)));
  return {
    // We don't need to resolve the glob since vite supports globs for entries.
    entries: stories,
    // We need Vite to precompile these dependencies, because they contain non-ESM code that would break
    // if we served it directly to the browser.
    include
  };
}