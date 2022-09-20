"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axeTest = void 0;
const puppeteer_1 = __importDefault(require("@axe-core/puppeteer"));
const config_1 = require("./config");
const puppeteerTest_1 = require("./puppeteerTest");
const axeTest = (customConfig = {}) => {
    const extendedConfig = { ...config_1.defaultAxeConfig, ...customConfig };
    const { beforeAxeTest } = extendedConfig;
    return (0, puppeteerTest_1.puppeteerTest)({
        ...extendedConfig,
        async testBody(page, testOptions) {
            const { element = '#storybook-root', exclude, disabledRules, options, config, } = testOptions.context.parameters.a11y || {};
            await beforeAxeTest(page, options);
            const axe = new puppeteer_1.default(page);
            axe.include(element);
            if (exclude) {
                axe.exclude(exclude);
            }
            if (options) {
                axe.options(options);
            }
            if (disabledRules) {
                axe.disableRules(disabledRules);
            }
            if (config) {
                axe.configure(config);
            }
            const { violations } = await axe.analyze();
            expect(violations).toHaveLength(0);
        },
    });
};
exports.axeTest = axeTest;
