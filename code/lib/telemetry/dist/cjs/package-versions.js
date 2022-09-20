"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActualPackageVersions = exports.getActualPackageVersion = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getActualPackageVersions = async packages => {
  const packageNames = Object.keys(packages);
  return Promise.all(packageNames.map(getActualPackageVersion));
};

exports.getActualPackageVersions = getActualPackageVersions;

const getActualPackageVersion = async packageName => {
  try {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const packageJson = require(_path.default.join(packageName, 'package.json'));

    return {
      name: packageName,
      version: packageJson.version
    };
  } catch (err) {
    return {
      name: packageName,
      version: null
    };
  }
};

exports.getActualPackageVersion = getActualPackageVersion;