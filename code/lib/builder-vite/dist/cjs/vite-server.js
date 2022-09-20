"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createViteServer = createViteServer;

var _vite = require("vite");

var _viteConfig = require("./vite-config");

var _optimizeDeps = require("./optimizeDeps");

async function createViteServer(options, devServer) {
  const {
    presets
  } = options;
  const config = await (0, _viteConfig.commonConfig)(options, 'development'); // Set up dev server

  config.server = {
    middlewareMode: true,
    hmr: {
      port: options.port,
      server: devServer
    },
    fs: {
      strict: true
    }
  };
  config.appType = 'custom'; // TODO: find a way to avoid having to do this in a separate step.

  config.optimizeDeps = await (0, _optimizeDeps.getOptimizeDeps)(config, options);
  const finalConfig = await presets.apply('viteFinal', config, options);
  return (0, _vite.createServer)(finalConfig);
}