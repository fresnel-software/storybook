"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSnapshot = void 0;
const jest_image_snapshot_1 = require("jest-image-snapshot");
const config_1 = require("./config");
const puppeteerTest_1 = require("./puppeteerTest");
expect.extend({ toMatchImageSnapshot: jest_image_snapshot_1.toMatchImageSnapshot });
const imageSnapshot = (customConfig = {}) => {
    const config = { ...config_1.defaultImageSnapshotConfig, ...customConfig };
    const { getMatchOptions, getScreenshotOptions, beforeScreenshot, afterScreenshot } = config;
    return (0, puppeteerTest_1.puppeteerTest)({
        ...config,
        async testBody(page, options) {
            expect.hasAssertions();
            const element = await beforeScreenshot(page, options);
            const image = await (element || page).screenshot(getScreenshotOptions(options));
            await afterScreenshot({ image, context: options.context });
            expect(image).toMatchImageSnapshot(getMatchOptions(options));
        },
    });
};
exports.imageSnapshot = imageSnapshot;
