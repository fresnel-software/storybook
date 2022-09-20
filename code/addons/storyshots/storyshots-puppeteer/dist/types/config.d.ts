/// <reference types="node" />
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import { ScreenshotOptions, Browser, Page, ElementHandle } from 'puppeteer';
declare type PuppeteerLifeCycleEvent = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
export interface Context {
    kind: string;
    story: string;
    parameters: {
        [key: string]: any;
    };
}
interface Options {
    context: Context;
    url: string;
}
interface Base64ScreenShotOptions extends ScreenshotOptions {
    encoding: 'base64';
}
interface DirectNavigationOptions {
    referer?: string;
    timeout?: number;
    waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
}
export interface CommonConfig {
    storybookUrl: string;
    chromeExecutablePath: string;
    getGotoOptions: (options: Options) => DirectNavigationOptions;
    customizePage: (page: Page) => Promise<void>;
    getCustomBrowser: () => Promise<Browser>;
    setupTimeout: number;
    testTimeout: number;
}
export interface PuppeteerTestConfig extends CommonConfig {
    testBody: ((page: Page, options: Options) => void | Promise<void>) & {
        filter?: (options: Options) => boolean;
    };
}
export interface ImageSnapshotConfig extends CommonConfig {
    getMatchOptions: (options: Options) => MatchImageSnapshotOptions;
    getScreenshotOptions: (options: Options) => Base64ScreenShotOptions;
    beforeScreenshot: (page: Page, options: Options) => Promise<void | ElementHandle>;
    afterScreenshot: (options: {
        image: string | void | Buffer;
        context: Context;
    }) => Promise<void>;
}
export interface AxeConfig extends CommonConfig {
    beforeAxeTest: (page: Page, options: Options) => Promise<void>;
}
export declare const defaultCommonConfig: CommonConfig;
export declare const defaultPuppeteerTestConfig: PuppeteerTestConfig;
export declare const defaultImageSnapshotConfig: ImageSnapshotConfig;
export declare const defaultAxeConfig: AxeConfig;
export {};
