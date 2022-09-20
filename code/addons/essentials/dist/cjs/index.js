"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addons = addons;

var _path = _interopRequireWildcard(require("path"));

var _nodeLogger = require("@storybook/node-logger");

var _coreCommon = require("@storybook/core-common");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const requireMain = configDir => {
  const absoluteConfigDir = _path.default.isAbsolute(configDir) ? configDir : _path.default.join(process.cwd(), configDir);

  const mainFile = _path.default.join(absoluteConfigDir, 'main');

  return (0, _coreCommon.serverRequire)(mainFile) ?? {};
};

function addons(options) {
  const checkInstalled = (addon, main) => {
    var _main$addons;

    const existingAddon = (_main$addons = main.addons) === null || _main$addons === void 0 ? void 0 : _main$addons.find(entry => {
      const name = typeof entry === 'string' ? entry : entry.name;
      return name === null || name === void 0 ? void 0 : name.startsWith(addon);
    });

    if (existingAddon) {
      _nodeLogger.logger.info(`Found existing addon ${JSON.stringify(existingAddon)}, skipping.`);
    }

    return !!existingAddon;
  };

  const main = requireMain(options.configDir);
  return ['docs', 'controls', 'actions', 'backgrounds', 'viewport', 'toolbars', 'measure', 'outline', 'highlight'].filter(key => options[key] !== false).map(key => `@storybook/addon-${key}`).filter(addon => !checkInstalled(addon, main)) // Use `require.resolve` to ensure Yarn PnP compatibility
  // Files of various addons should be resolved in the context of `addon-essentials` as they are listed as deps here
  // and not in `@storybook/core` nor in SB user projects. If `@storybook/core` make the require itself Yarn 2 will
  // throw an error saying that the package to require must be added as a dependency. Doing `require.resolve` will
  // allow `@storybook/core` to work with absolute path directly, no more require of dep no more issue.
  // File to load can be `preset.js`, `register.js`, or the package entry point, so we need to check all these cases
  // as it's done in `lib/core/src/server/presets.js`.
  .map(addon => {
    try {
      return (0, _path.dirname)(require.resolve((0, _path.join)(addon, 'package.json'))); // eslint-disable-next-line no-empty
    } catch (err) {}

    return require.resolve(addon);
  });
}