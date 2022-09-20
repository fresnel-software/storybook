"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.puppeteerTest = void 0;
const node_logger_1 = require("@storybook/node-logger");
const url_1 = require("./url");
const config_1 = require("./config");
const puppeteerTest = (customConfig = {}) => {
    const { storybookUrl, chromeExecutablePath, getGotoOptions, customizePage, getCustomBrowser, testBody, setupTimeout, testTimeout, } = { ...config_1.defaultPuppeteerTestConfig, ...customConfig };
    let browser; // holds ref to browser. (ie. Chrome)
    let page; // Hold ref to the page to screenshot.
    const testFn = async ({ context }) => {
        const { kind, framework, name, id } = context;
        if (framework === 'react-native') {
            // Skip tests since RN is not a browser environment.
            node_logger_1.logger.error("It seems you are running puppeteer test on RN app and it's not supported. Skipping test.");
            return;
        }
        const url = (0, url_1.constructUrl)(storybookUrl, id);
        const options = { context, url };
        if (testBody.filter != null && !testBody.filter(options)) {
            return;
        }
        if (!browser || !page) {
            node_logger_1.logger.error(`Error when running puppeteer test for ${kind} - ${name} : It seems the headless browser is not running.`);
            throw new Error('no-headless-browser-running');
        }
        try {
            await customizePage(page);
            await page.goto(url, getGotoOptions(options));
        }
        catch (e) {
            node_logger_1.logger.error(`Error when connecting to ${url}, did you start or build the storybook first? A storybook instance should be running or a static version should be built when using puppeteer test feature.`);
            throw e;
        }
        await testBody(page, options);
    };
    testFn.timeout = testTimeout;
    const cleanup = async () => {
        if (getCustomBrowser && page) {
            await page.close();
        }
        else if (browser) {
            await browser.close();
        }
    };
    process.on('SIGINT', async () => {
        await cleanup();
        process.exit();
    });
    testFn.afterAll = cleanup;
    const beforeAll = async () => {
        if (getCustomBrowser) {
            browser = await getCustomBrowser();
        }
        else {
            // eslint-disable-next-line global-require
            const puppeteer = require('puppeteer');
            // add some options "no-sandbox" to make it work properly on some Linux systems as proposed here: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322851507
            browser = await puppeteer.launch({
                args: ['--no-sandbox ', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
                executablePath: chromeExecutablePath,
            });
        }
        page = await browser.newPage();
    };
    beforeAll.timeout = setupTimeout;
    testFn.beforeAll = beforeAll;
    return testFn;
};
exports.puppeteerTest = puppeteerTest;
