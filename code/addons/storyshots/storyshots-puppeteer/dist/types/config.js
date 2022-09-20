"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAxeConfig = exports.defaultImageSnapshotConfig = exports.defaultPuppeteerTestConfig = exports.defaultCommonConfig = void 0;
const noop = () => undefined;
const asyncNoop = async () => undefined;
exports.defaultCommonConfig = {
    storybookUrl: 'http://localhost:6006',
    chromeExecutablePath: process.env.SB_CHROMIUM_PATH,
    getGotoOptions: noop,
    customizePage: asyncNoop,
    getCustomBrowser: undefined,
    setupTimeout: 15000,
    testTimeout: 15000,
};
const getTestBody = (options) => options.context.parameters.puppeteerTest;
function defaultTestBody(page, options) {
    const testBody = getTestBody(options);
    if (testBody != null) {
        return testBody(page, options);
    }
    return null;
}
defaultTestBody.filter = (options) => getTestBody(options) != null;
exports.defaultPuppeteerTestConfig = {
    ...exports.defaultCommonConfig,
    testBody: defaultTestBody,
};
// We consider taking the full page is a reasonable default.
const defaultScreenshotOptions = () => ({ fullPage: true, encoding: 'base64' });
exports.defaultImageSnapshotConfig = {
    ...exports.defaultCommonConfig,
    getMatchOptions: noop,
    getScreenshotOptions: defaultScreenshotOptions,
    beforeScreenshot: noop,
    afterScreenshot: noop,
};
exports.defaultAxeConfig = {
    ...exports.defaultCommonConfig,
    beforeAxeTest: noop,
};
