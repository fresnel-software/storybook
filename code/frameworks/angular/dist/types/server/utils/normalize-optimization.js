"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptimization = void 0;
const module_is_available_1 = require("./module-is-available");
const importAngularCliNormalizeOptimization = () => {
    // First we look for webpack config according to directory structure of Angular
    // present since the version 7.2.0
    if ((0, module_is_available_1.moduleIsAvailable)('@angular-devkit/build-angular/src/utils/normalize-optimization')) {
        // eslint-disable-next-line global-require
        return require('@angular-devkit/build-angular/src/utils/normalize-optimization');
    }
    return undefined;
};
const normalizeOptimization = (options) => {
    if (importAngularCliNormalizeOptimization()) {
        return importAngularCliNormalizeOptimization().normalizeOptimization(options);
    }
    // Best effort to stay compatible with 6.1.*
    return options;
};
exports.normalizeOptimization = normalizeOptimization;
