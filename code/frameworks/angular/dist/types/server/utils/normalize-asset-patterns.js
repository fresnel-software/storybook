"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAssetPatterns = exports.MissingAssetSourceRootException = void 0;
/**
 * Clone of `normalizeAssetPatterns` function from angular-cli v11.2.*
 * > https://github.com/angular/angular-cli/blob/de63f41d669e42ada84f94ca1795d2791b9b45cc/packages/angular_devkit/build_angular/src/utils/normalize-asset-patterns.ts
 *
 * It is not possible to use the original because arguments have changed between version 6.1.* and 11.*.* of angular-cli
 */
const fs_1 = require("fs");
const core_1 = require("@angular-devkit/core");
class MissingAssetSourceRootException extends core_1.BaseException {
    constructor(path) {
        super(`The ${path} asset path must start with the project source root.`);
    }
}
exports.MissingAssetSourceRootException = MissingAssetSourceRootException;
function normalizeAssetPatterns(assetPatterns, root, projectRoot, maybeSourceRoot) {
    // When sourceRoot is not available, we default to ${projectRoot}/src.
    const sourceRoot = maybeSourceRoot || (0, core_1.join)(projectRoot, 'src');
    const resolvedSourceRoot = (0, core_1.resolve)(root, sourceRoot);
    if (assetPatterns.length === 0) {
        return [];
    }
    return assetPatterns.map((assetPattern) => {
        // Normalize string asset patterns to objects.
        if (typeof assetPattern === 'string') {
            const assetPath = (0, core_1.normalize)(assetPattern);
            const resolvedAssetPath = (0, core_1.resolve)(root, assetPath);
            // Check if the string asset is within sourceRoot.
            if (!resolvedAssetPath.startsWith(resolvedSourceRoot)) {
                throw new MissingAssetSourceRootException(assetPattern);
            }
            let glob;
            let input;
            let isDirectory = false;
            try {
                isDirectory = (0, fs_1.statSync)((0, core_1.getSystemPath)(resolvedAssetPath)).isDirectory();
            }
            catch {
                isDirectory = true;
            }
            if (isDirectory) {
                // Folders get a recursive star glob.
                glob = '**/*';
                // Input directory is their original path.
                input = assetPath;
            }
            else {
                // Files are their own glob.
                glob = (0, core_1.basename)(assetPath);
                // Input directory is their original dirname.
                input = (0, core_1.dirname)(assetPath);
            }
            // Output directory for both is the relative path from source root to input.
            const output = (0, core_1.relative)(resolvedSourceRoot, (0, core_1.resolve)(root, input));
            // Return the asset pattern in object format.
            return { glob, input, output };
        }
        // It's already an AssetPatternObject, no need to convert.
        return assetPattern;
    });
}
exports.normalizeAssetPatterns = normalizeAssetPatterns;
