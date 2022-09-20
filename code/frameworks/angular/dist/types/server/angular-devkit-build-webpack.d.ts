/**
 * This file is to be watched !
 * The code must be compatible from @angular-devkit version 6.1.0 to the latest supported
 *
 * It uses code block of angular cli to extract parts of webpack configuration
 */
import { Configuration } from 'webpack';
import { workspaces } from '@angular-devkit/core';
export declare type AngularCliWebpackConfig = {
    cliCommonWebpackConfig: {
        plugins: Configuration['plugins'];
        resolve: {
            modules: string[];
        };
        resolveLoader: Configuration['resolveLoader'];
    };
    cliStyleWebpackConfig: {
        entry: Configuration['entry'];
        module: {
            rules: Configuration['module']['rules'];
        };
        plugins: Configuration['plugins'];
    };
    tsConfigPath: string;
};
/**
 * Uses angular cli to extract webpack configuration.
 * The `AngularCliWebpackConfig` type lists the parts used by storybook
 */
export declare function extractAngularCliWebpackConfig(dirToSearch: string, project: workspaces.ProjectDefinition, target: workspaces.TargetDefinition, confName?: string): Promise<AngularCliWebpackConfig>;
