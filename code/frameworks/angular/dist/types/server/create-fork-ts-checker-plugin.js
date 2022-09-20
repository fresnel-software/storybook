"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable func-names */
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const node_logger_1 = require("@storybook/node-logger");
function default_1(tsLoaderOptions) {
    if (tsLoaderOptions && tsLoaderOptions.configFile) {
        return new fork_ts_checker_webpack_plugin_1.default({
            typescript: { configFile: tsLoaderOptions.configFile },
            async: true,
        });
    }
    node_logger_1.logger.info('=> Using default options for ForkTsCheckerWebpackPlugin');
    return new fork_ts_checker_webpack_plugin_1.default();
}
exports.default = default_1;
