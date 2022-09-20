"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdxPlugin = mdxPlugin;

var _vite = require("vite");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const isStorybookMdx = id => id.endsWith('stories.mdx') || id.endsWith('story.mdx');

function injectRenderer(code, mdx2) {
  if (mdx2) {
    return `
           import React from 'react';
           ${code}
           `;
  }

  return `
        /* @jsx mdx */
        import React from 'react';
        import { mdx } from '@mdx-js/react';
        ${code}
        `;
}
/**
 * Storybook uses two different loaders when dealing with MDX:
 *
 * - *stories.mdx and *story.mdx are compiled with the CSF compiler
 * - *.mdx are compiled with the MDX compiler directly
 *
 * @see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx
 */


function mdxPlugin(options) {
  const {
    features
  } = options;
  let reactRefresh;
  const include = /\.mdx?$/;
  const filter = (0, _vite.createFilter)(include);
  return {
    name: 'storybook:mdx-plugin',
    enforce: 'pre',

    configResolved({
      plugins
    }) {
      // @vitejs/plugin-react-refresh has been upgraded to @vitejs/plugin-react,
      // and the name of the plugin performing `transform` has been changed from 'react-refresh' to 'vite:react-babel',
      // to be compatible, we need to look for both plugin name.
      // We should also look for the other plugins names exported from @vitejs/plugin-react in case there are some internal refactors.
      const reactRefreshPlugins = plugins.filter(p => p.name === 'react-refresh' || p.name === 'vite:react-babel' || p.name === 'vite:react-refresh' || p.name === 'vite:react-jsx');
      reactRefresh = reactRefreshPlugins.find(p => p.transform);
    },

    async transform(src, id, options) {
      var _reactRefresh;

      if (!filter(id)) return undefined; // @ts-expect-error typescript doesn't think compile exists, but it does.

      const {
        compile
      } = features !== null && features !== void 0 && features.previewMdx2 ? await Promise.resolve().then(() => _interopRequireWildcard(require('@storybook/mdx2-csf'))) : await Promise.resolve().then(() => _interopRequireWildcard(require('@storybook/mdx1-csf')));
      const mdxCode = String(await compile(src, {
        skipCsf: !isStorybookMdx(id)
      }));
      const modifiedCode = injectRenderer(mdxCode, Boolean(features === null || features === void 0 ? void 0 : features.previewMdx2)); // Hooks in recent rollup versions can be functions or objects, and though react hasn't changed, the typescript defs have

      const rTransform = (_reactRefresh = reactRefresh) === null || _reactRefresh === void 0 ? void 0 : _reactRefresh.transform;
      const transform = rTransform && 'handler' in rTransform ? rTransform.handler : rTransform; // It's safe to disable this, because we know it'll be there, since we added it ourselves.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      const result = await transform.call(this, modifiedCode, `${id}.jsx`, options);
      if (!result) return modifiedCode;
      if (typeof result === 'string') return result;
      const {
        code,
        map: resultMap
      } = result;
      return {
        code,
        map: !resultMap || typeof resultMap === 'string' ? resultMap : Object.assign({}, resultMap, {
          sources: [id]
        })
      };
    }

  };
}