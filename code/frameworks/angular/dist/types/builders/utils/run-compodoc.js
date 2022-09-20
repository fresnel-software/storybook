"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCompodoc = void 0;
const child_process_1 = require("child_process");
const rxjs_1 = require("rxjs");
const path = __importStar(require("path"));
const hasTsConfigArg = (args) => args.indexOf('-p') !== -1;
// path.relative is necessary to workaround a compodoc issue with
// absolute paths on windows machines
const toRelativePath = (pathToTsConfig) => {
    return path.isAbsolute(pathToTsConfig) ? path.relative('.', pathToTsConfig) : pathToTsConfig;
};
const runCompodoc = ({ compodocArgs, tsconfig }, context) => {
    return new rxjs_1.Observable((observer) => {
        const tsConfigPath = toRelativePath(tsconfig);
        const finalCompodocArgs = [
            'compodoc',
            // Default options
            ...(hasTsConfigArg(compodocArgs) ? [] : ['-p', tsConfigPath]),
            '-d',
            `${context.workspaceRoot}`,
            ...compodocArgs,
        ];
        try {
            context.logger.info(finalCompodocArgs.join(' '));
            const child = (0, child_process_1.spawn)('npx', finalCompodocArgs, {
                cwd: context.workspaceRoot,
                shell: true,
            });
            child.stdout.on('data', (data) => {
                context.logger.info(data.toString());
            });
            child.stderr.on('data', (data) => {
                context.logger.error(data.toString());
            });
            child.on('close', (code) => {
                if (code === 0) {
                    observer.next();
                    observer.complete();
                }
                else {
                    observer.error();
                }
            });
        }
        catch (error) {
            observer.error(error);
        }
    });
};
exports.runCompodoc = runCompodoc;
