"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAngularProjectTarget = exports.getDefaultProjectName = exports.readAngularWorkspaceConfig = void 0;
const node_1 = require("@angular-devkit/core/node");
const core_1 = require("@angular-devkit/core");
/**
 * Returns the workspace definition
 *
 * - Either from NX if it is present
 * - Either from `@angular-devkit/core` -> https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/core
 */
const readAngularWorkspaceConfig = async (dirToSearch) => {
    const host = core_1.workspaces.createWorkspaceHost(new node_1.NodeJsSyncHost());
    try {
        /**
         * Apologies for the following line
         * If there's a better way to do it, let's do it
         */
        /* eslint-disable global-require */
        // catch if nx.json does not exist
        require('@nrwl/workspace').readNxJson();
        const nxWorkspace = require('@nrwl/workspace').readWorkspaceConfig({
            format: 'angularCli',
            path: dirToSearch,
        });
        // Use the workspace version of nx when angular looks for the angular.json file
        host.readFile = (path) => {
            if (typeof path === 'string' && path.endsWith('angular.json')) {
                return Promise.resolve(JSON.stringify(nxWorkspace));
            }
            return host.readFile(path);
        };
        host.isFile = (path) => {
            if (typeof path === 'string' && path.endsWith('angular.json')) {
                return Promise.resolve(true);
            }
            return host.isFile(path);
        };
    }
    catch (e) {
        // Ignore if the client does not use NX
    }
    return (await core_1.workspaces.readWorkspace(dirToSearch, host)).workspace;
};
exports.readAngularWorkspaceConfig = readAngularWorkspaceConfig;
const getDefaultProjectName = (workspace) => {
    const environmentProjectName = process.env.STORYBOOK_ANGULAR_PROJECT;
    if (environmentProjectName) {
        return environmentProjectName;
    }
    if (workspace.projects.has('storybook')) {
        return 'storybook';
    }
    if (workspace.extensions.defaultProject) {
        return workspace.extensions.defaultProject;
    }
    const firstProjectName = workspace.projects.keys().next().value;
    if (firstProjectName) {
        return firstProjectName;
    }
    throw new Error('No angular projects found');
};
exports.getDefaultProjectName = getDefaultProjectName;
const findAngularProjectTarget = (workspace, projectName, targetName) => {
    if (!workspace.projects || !Object.keys(workspace.projects).length) {
        throw new Error('No angular projects found');
    }
    const project = workspace.projects.get(projectName);
    if (!project) {
        throw new Error(`"${projectName}" project is not found in angular.json`);
    }
    if (!project.targets.has(targetName)) {
        throw new Error(`"${targetName}" target is not found in "${projectName}" project`);
    }
    const target = project.targets.get(targetName);
    return { project, target };
};
exports.findAngularProjectTarget = findAngularProjectTarget;
