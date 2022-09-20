"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const find_up_1 = require("find-up");
const read_pkg_up_1 = require("read-pkg-up");
const core_server_1 = require("@storybook/core-server");
const run_compodoc_1 = require("../utils/run-compodoc");
const build_standalone_errors_handler_1 = require("../utils/build-standalone-errors-handler");
exports.default = (0, architect_1.createBuilder)(commandBuilder);
function commandBuilder(options, context) {
    return (0, rxjs_1.from)(setup(options, context)).pipe((0, operators_1.switchMap)(({ tsConfig }) => {
        const runCompodoc$ = options.compodoc
            ? (0, run_compodoc_1.runCompodoc)({ compodocArgs: options.compodocArgs, tsconfig: tsConfig }, context).pipe((0, operators_1.mapTo)({ tsConfig }))
            : (0, rxjs_1.of)({});
        return runCompodoc$.pipe((0, operators_1.mapTo)({ tsConfig }));
    }), (0, operators_1.map)(({ tsConfig }) => {
        const { browserTarget, stylePreprocessorOptions, styles, ci, configDir, docs, host, https, port, quiet, smokeTest, sslCa, sslCert, sslKey, } = options;
        const standaloneOptions = {
            packageJson: (0, read_pkg_up_1.sync)({ cwd: __dirname }).packageJson,
            ci,
            configDir,
            docs,
            host,
            https,
            port,
            quiet,
            smokeTest,
            sslCa,
            sslCert,
            sslKey,
            angularBrowserTarget: browserTarget,
            angularBuilderContext: context,
            angularBuilderOptions: {
                ...(stylePreprocessorOptions ? { stylePreprocessorOptions } : {}),
                ...(styles ? { styles } : {}),
            },
            tsConfig,
        };
        return standaloneOptions;
    }), (0, operators_1.switchMap)((standaloneOptions) => runInstance(standaloneOptions)), (0, operators_1.map)(() => {
        return { success: true };
    }));
}
async function setup(options, context) {
    let browserOptions;
    let browserTarget;
    if (options.browserTarget) {
        browserTarget = (0, architect_1.targetFromTargetString)(options.browserTarget);
        browserOptions = await context.validateOptions(await context.getTargetOptions(browserTarget), await context.getBuilderNameForTarget(browserTarget));
    }
    return {
        tsConfig: options.tsConfig ??
            (0, find_up_1.sync)('tsconfig.json', { cwd: options.configDir }) ??
            browserOptions.tsConfig,
    };
}
function runInstance(options) {
    return new rxjs_1.Observable((observer) => {
        // This Observable intentionally never complete, leaving the process running ;)
        (0, core_server_1.buildDevStandalone)(options).then(() => observer.next(), (error) => observer.error((0, build_standalone_errors_handler_1.buildStandaloneErrorHandler)(error)));
    });
}
