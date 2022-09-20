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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRenderer = void 0;
const core_1 = require("@angular/core");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const rxjs_1 = require("rxjs");
const telejson_1 = require("telejson");
const StorybookModule_1 = require("./StorybookModule");
// platform must be init only if render is called at least once
let platformRef;
function getPlatform(newPlatform) {
    if (!platformRef || newPlatform) {
        platformRef = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
    }
    return platformRef;
}
class AbstractRenderer {
    constructor(storyId) {
        this.storyId = storyId;
        if (typeof NODE_ENV === 'string' && NODE_ENV !== 'development') {
            try {
                // platform should be set after enableProdMode()
                (0, core_1.enableProdMode)();
            }
            catch (e) {
                // eslint-disable-next-line no-console
                console.debug(e);
            }
        }
    }
    /**
     * Wait and destroy the platform
     */
    static resetPlatformBrowserDynamic() {
        return new Promise((resolve) => {
            if (platformRef && !platformRef.destroyed) {
                platformRef.onDestroy(async () => {
                    resolve();
                });
                // Destroys the current Angular platform and all Angular applications on the page.
                // So call each angular ngOnDestroy and avoid memory leaks
                platformRef.destroy();
                return;
            }
            resolve();
        }).then(() => {
            getPlatform(true);
        });
    }
    /**
     * Bootstrap main angular module with main component or send only new `props` with storyProps$
     *
     * @param storyFnAngular {StoryFnAngularReturnType}
     * @param forced {boolean} If :
     * - true render will only use the StoryFn `props' in storyProps observable that will update sotry's component/template properties. Improves performance without reloading the whole module&component if props changes
     * - false fully recharges or initializes angular module & component
     * @param component {Component}
     * @param parameters {Parameters}
     */
    async render({ storyFnAngular, forced, parameters, component, targetDOMNode, }) {
        const targetSelector = `${this.generateTargetSelectorFromStoryId()}`;
        const newStoryProps$ = new rxjs_1.BehaviorSubject(storyFnAngular.props);
        const moduleMetadata = (0, StorybookModule_1.getStorybookModuleMetadata)({ storyFnAngular, component, targetSelector }, newStoryProps$);
        if (!this.fullRendererRequired({
            storyFnAngular,
            moduleMetadata,
            forced,
        })) {
            this.storyProps$.next(storyFnAngular.props);
            return;
        }
        await this.beforeFullRender();
        // Complete last BehaviorSubject and set a new one for the current module
        if (this.storyProps$) {
            this.storyProps$.complete();
        }
        this.storyProps$ = newStoryProps$;
        this.initAngularRootElement(targetDOMNode, targetSelector);
        await getPlatform().bootstrapModule((0, StorybookModule_1.createStorybookModule)(moduleMetadata), parameters.bootstrapModuleOptions ?? undefined);
        await this.afterFullRender();
    }
    /**
     * Only ASCII alphanumerics can be used as HTML tag name.
     * https://html.spec.whatwg.org/#elements-2
     *
     * Therefore, stories break when non-ASCII alphanumerics are included in target selector.
     * https://github.com/storybookjs/storybook/issues/15147
     *
     * This method returns storyId when it doesn't contain any non-ASCII alphanumerics.
     * Otherwise, it generates a valid HTML tag name from storyId by removing non-ASCII alphanumerics from storyId, prefixing "sb-", and suffixing "-component"
     * @protected
     * @memberof AbstractRenderer
     */
    generateTargetSelectorFromStoryId() {
        const invalidHtmlTag = /[^A-Za-z0-9-]/g;
        const storyIdIsInvalidHtmlTagName = invalidHtmlTag.test(this.storyId);
        return storyIdIsInvalidHtmlTagName
            ? `sb-${this.storyId.replace(invalidHtmlTag, '')}-component`
            : this.storyId;
    }
    initAngularRootElement(targetDOMNode, targetSelector) {
        // Adds DOM element that angular will use as bootstrap component
        // eslint-disable-next-line no-param-reassign
        targetDOMNode.innerHTML = '';
        targetDOMNode.appendChild(document.createElement(targetSelector));
    }
    fullRendererRequired({ storyFnAngular, moduleMetadata, forced, }) {
        const { previousStoryRenderInfo } = this;
        const currentStoryRender = {
            storyFnAngular,
            moduleMetadataSnapshot: (0, telejson_1.stringify)(moduleMetadata),
        };
        this.previousStoryRenderInfo = currentStoryRender;
        if (
        // check `forceRender` of story RenderContext
        !forced ||
            // if it's the first rendering and storyProps$ is not init
            !this.storyProps$) {
            return true;
        }
        // force the rendering if the template has changed
        const hasChangedTemplate = !!storyFnAngular?.template &&
            previousStoryRenderInfo?.storyFnAngular?.template !== storyFnAngular.template;
        if (hasChangedTemplate) {
            return true;
        }
        // force the rendering if the metadata structure has changed
        const hasChangedModuleMetadata = currentStoryRender.moduleMetadataSnapshot !== previousStoryRenderInfo?.moduleMetadataSnapshot;
        return hasChangedModuleMetadata;
    }
}
exports.AbstractRenderer = AbstractRenderer;
_a = AbstractRenderer;
/**
 * Reset compiled components because we often want to compile the same component with
 * more than one NgModule.
 */
AbstractRenderer.resetCompiledComponents = async () => {
    try {
        // Clear global Angular component cache in order to be able to re-render the same component across multiple stories
        //
        // References:
        // https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_angular/src/webpack/plugins/hmr/hmr-accept.ts#L50
        // https://github.com/angular/angular/blob/2ebe2bcb2fe19bf672316b05f15241fd7fd40803/packages/core/src/render3/jit/module.ts#L377-L384
        const { ɵresetCompiledComponents } = await Promise.resolve().then(() => __importStar(require('@angular/core')));
        ɵresetCompiledComponents();
    }
    catch (e) {
        /**
         * noop catch
         * This means angular removed or modified ɵresetCompiledComponents
         */
    }
};
