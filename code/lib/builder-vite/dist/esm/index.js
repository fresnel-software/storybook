// noinspection JSUnusedGlobalSymbols
import * as fs from 'fs';
import * as path from 'path';
import { transformIframeHtml } from './transform-iframe-html';
import { createViteServer } from './vite-server';
import { build as viteBuild } from './build';

function iframeMiddleware(options, server) {
  return async (req, res, next) => {
    if (!req.url.match(/^\/iframe\.html($|\?)/)) {
      next();
      return;
    } // We need to handle `html-proxy` params for style tag HMR https://github.com/storybookjs/builder-vite/issues/266#issuecomment-1055677865
    // e.g. /iframe.html?html-proxy&index=0.css


    if (req.query['html-proxy'] !== undefined) {
      next();
      return;
    }

    const indexHtml = fs.readFileSync(path.resolve(__dirname, '../..', 'input', 'iframe.html'), 'utf-8');
    const generated = await transformIframeHtml(indexHtml, options);
    const transformed = await server.transformIndexHtml('/iframe.html', generated);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(transformed);
  };
}

export const start = async ({
  startTime,
  options,
  router,
  server: devServer
}) => {
  const server = await createViteServer(options, devServer); // Just mock this endpoint (which is really Webpack-specific) so we don't get spammed with 404 in browser devtools
  // TODO: we should either show some sort of progress from Vite, or just try to disable the whole Loader in the Manager UI.

  router.get('/progress', (req, res) => {
    res.header('Cache-Control', 'no-cache');
    res.header('Content-Type', 'text/event-stream');
  });
  router.use(iframeMiddleware(options, server));
  router.use(server.middlewares);

  async function bail(e) {
    try {
      return await server.close();
    } catch (err) {
      console.warn('unable to close vite server');
    }

    throw e;
  }

  return {
    bail,
    stats: {
      toJson: () => null
    },
    totalTime: process.hrtime(startTime)
  };
};
export const build = async ({
  options
}) => {
  return viteBuild(options);
};