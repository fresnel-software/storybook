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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = void 0;
const path_1 = __importDefault(require("path"));
const semver_1 = __importDefault(require("@storybook/semver"));
const webpack_1 = require("webpack");
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const ts_config_1 = __importDefault(require("./ts_config"));
const create_fork_ts_checker_plugin_1 = __importDefault(require("./create-fork-ts-checker-plugin"));
async function webpack(config, { configDir, angularBuilderContext }) {
    try {
        // Disable all this webpack stuff if we use angular-cli >= 12
        // Angular cli is in charge of doing all the necessary for angular. If there is any additional configuration to add, it must be done in the preset angular-cli versioned.
        const angularCliVersion = await Promise.resolve().then(() => __importStar(require('@angular/cli'))).then((m) => semver_1.default.coerce(m.VERSION.full));
        if ((semver_1.default.satisfies(angularCliVersion, '12.2.x') && angularBuilderContext) ||
            semver_1.default.satisfies(angularCliVersion, '>=13.0.0')) {
            return config;
        }
    }
    catch (error) {
        // do nothing, continue
    }
    const tsLoaderOptions = (0, ts_config_1.default)(configDir);
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: require.resolve('ts-loader'),
                            options: tsLoaderOptions,
                        },
                        { loader: path_1.default.resolve(__dirname, 'ngx-template-loader') },
                    ],
                },
                {
                    test: /[/\\]@angular[/\\]core[/\\].+\.js$/,
                    parser: { system: false },
                },
                {
                    test: /\.html$/,
                    loader: require.resolve('raw-loader'),
                    exclude: /\.async\.html$/,
                },
                {
                    test: /\.s(c|a)ss$/,
                    use: [
                        { loader: require.resolve('raw-loader') },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                postcssOptions: {
                                    plugins: [(0, autoprefixer_1.default)()],
                                },
                            },
                        },
                        { loader: require.resolve('sass-loader') },
                    ],
                },
            ],
        },
        resolve: {
            ...config.resolve,
        },
        plugins: [
            ...config.plugins,
            // See https://github.com/angular/angular/issues/11580#issuecomment-401127742
            new webpack_1.ContextReplacementPlugin(/@angular(\\|\/)core(\\|\/)(fesm5|bundles)/, path_1.default.resolve(__dirname, '..')),
            (0, create_fork_ts_checker_plugin_1.default)(tsLoaderOptions),
        ],
    };
}
exports.webpack = webpack;
