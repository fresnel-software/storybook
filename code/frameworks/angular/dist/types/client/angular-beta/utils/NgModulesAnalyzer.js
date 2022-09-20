"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComponentAlreadyDeclaredInModules = void 0;
const core_1 = require("@angular/core");
const reflectionCapabilities = new core_1.ɵReflectionCapabilities();
/**
 * Avoid component redeclaration
 *
 * Checks recursively if the component has already been declared in all import Module
 */
const isComponentAlreadyDeclaredInModules = (componentToFind, moduleDeclarations, moduleImports) => {
    if (moduleDeclarations &&
        moduleDeclarations.some((declaration) => declaration === componentToFind)) {
        // Found component in declarations array
        return true;
    }
    if (!moduleImports) {
        return false;
    }
    return moduleImports.some((importItem) => {
        const extractedNgModuleMetadata = extractNgModuleMetadata(importItem);
        if (!extractedNgModuleMetadata) {
            // Not an NgModule
            return false;
        }
        return (0, exports.isComponentAlreadyDeclaredInModules)(componentToFind, extractedNgModuleMetadata.declarations, extractedNgModuleMetadata.imports);
    });
};
exports.isComponentAlreadyDeclaredInModules = isComponentAlreadyDeclaredInModules;
const extractNgModuleMetadata = (importItem) => {
    const target = importItem && importItem.ngModule ? importItem.ngModule : importItem;
    const decorators = reflectionCapabilities.annotations(target);
    if (!decorators || decorators.length === 0) {
        return null;
    }
    const ngModuleDecorator = decorators.find((decorator) => decorator instanceof core_1.NgModule);
    if (!ngModuleDecorator) {
        return null;
    }
    return ngModuleDecorator;
};
