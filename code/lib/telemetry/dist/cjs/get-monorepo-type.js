"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monorepoConfigs = exports.getMonorepoType = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _coreCommon = require("@storybook/core-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const monorepoConfigs = {
  Nx: 'nx.json',
  Turborepo: 'turbo.json',
  Lerna: 'lerna.json',
  Rush: 'rush.json',
  Lage: 'lage.config.json'
};
exports.monorepoConfigs = monorepoConfigs;

const getMonorepoType = () => {
  const projectRootPath = (0, _coreCommon.getProjectRoot)();
  if (!projectRootPath) return undefined;
  const keys = Object.keys(monorepoConfigs);
  const monorepoType = keys.find(monorepo => {
    const configFile = _path.default.join(projectRootPath, monorepoConfigs[monorepo]);

    return _fsExtra.default.existsSync(configFile);
  });

  if (monorepoType) {
    return monorepoType;
  }

  if (!_fsExtra.default.existsSync(_path.default.join(projectRootPath, 'package.json'))) {
    return undefined;
  }

  const packageJson = _fsExtra.default.readJsonSync(_path.default.join(projectRootPath, 'package.json'));

  if (packageJson !== null && packageJson !== void 0 && packageJson.workspaces) {
    return 'Workspaces';
  }

  return undefined;
};

exports.getMonorepoType = getMonorepoType;