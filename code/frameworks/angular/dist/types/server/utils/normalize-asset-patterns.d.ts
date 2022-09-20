import { BaseException, Path } from '@angular-devkit/core';
import { AssetPattern } from '@angular-devkit/build-angular';
import { AssetPatternClass } from '@angular-devkit/build-angular/src/builders/browser/schema';
export declare class MissingAssetSourceRootException extends BaseException {
    constructor(path: string);
}
export declare function normalizeAssetPatterns(assetPatterns: AssetPattern[], root: Path, projectRoot: Path, maybeSourceRoot: Path | undefined): AssetPatternClass[];
