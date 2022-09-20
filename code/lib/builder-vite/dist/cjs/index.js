"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.build = void 0;

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _transformIframeHtml = require("./transform-iframe-html");

var _viteServer = require("./vite-server");

var _build = require("./build");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// noinspection JSUnusedGlobalSymbols
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
    const generated = await (0, _transformIframeHtml.transformIframeHtml)(indexHtml, options);
    const transformed = await server.transformIndexHtml('/iframe.html', generated);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(transformed);
  };
}

const start = async ({
  startTime,
  options,
  router,
  server: devServer
}) => {
  const server = await (0, _viteServer.createViteServer)(options, devServer); // Just mock this endpoint (which is really Webpack-specific) so we don't get spammed with 404 in browser devtools
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

exports.start = start;

const build = async ({
  options
}) => {
  return (0, _build.build)(options);
};

exports.build = build;