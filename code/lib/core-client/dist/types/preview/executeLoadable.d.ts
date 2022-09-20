/// <reference types="webpack-env" />
/// <reference types="node" />
import { ModuleExports } from '@storybook/store';
import { Loadable } from './types';
/**
 * Executes a Loadable (function that returns exports or require context(s))
 * and returns a map of filename => module exports
 *
 * @param loadable Loadable
 * @returns Map<Path, ModuleExports>
 */
export declare function executeLoadable(loadable: Loadable): Map<string, ModuleExports>;
/**
 * Executes a Loadable (function that returns exports or require context(s))
 * and compares it's output to the last time it was run (as stored on a node module)
 *
 * @param loadable Loadable
 * @param m NodeModule
 * @returns { added: Map<Path, ModuleExports>, removed: Map<Path, ModuleExports> }
 */
export declare function executeLoadableForChanges(loadable: Loadable, m?: NodeModule): {
    added: Map<string, ModuleExports>;
    removed: Map<string, ModuleExports>;
};
