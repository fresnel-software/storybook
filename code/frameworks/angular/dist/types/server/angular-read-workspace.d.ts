import { workspaces } from '@angular-devkit/core';
/**
 * Returns the workspace definition
 *
 * - Either from NX if it is present
 * - Either from `@angular-devkit/core` -> https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/core
 */
export declare const readAngularWorkspaceConfig: (dirToSearch: string) => Promise<workspaces.WorkspaceDefinition>;
export declare const getDefaultProjectName: (workspace: workspaces.WorkspaceDefinition) => string;
export declare const findAngularProjectTarget: (workspace: workspaces.WorkspaceDefinition, projectName: string, targetName: string) => {
    project: workspaces.ProjectDefinition;
    target: workspaces.TargetDefinition;
};
