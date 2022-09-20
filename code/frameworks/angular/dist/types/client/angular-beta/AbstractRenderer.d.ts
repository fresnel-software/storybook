import { Subject } from 'rxjs';
import { ICollection, StoryFnAngularReturnType, Parameters } from '../types';
declare type StoryRenderInfo = {
    storyFnAngular: StoryFnAngularReturnType;
    moduleMetadataSnapshot: string;
};
export declare abstract class AbstractRenderer {
    storyId: string;
    /**
     * Wait and destroy the platform
     */
    static resetPlatformBrowserDynamic(): Promise<void>;
    /**
     * Reset compiled components because we often want to compile the same component with
     * more than one NgModule.
     */
    protected static resetCompiledComponents: () => Promise<void>;
    protected previousStoryRenderInfo: StoryRenderInfo;
    protected storyProps$: Subject<ICollection | undefined>;
    constructor(storyId: string);
    protected abstract beforeFullRender(): Promise<void>;
    protected abstract afterFullRender(): Promise<void>;
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
    render({ storyFnAngular, forced, parameters, component, targetDOMNode, }: {
        storyFnAngular: StoryFnAngularReturnType;
        forced: boolean;
        component?: any;
        parameters: Parameters;
        targetDOMNode: HTMLElement;
    }): Promise<void>;
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
    protected generateTargetSelectorFromStoryId(): string;
    protected initAngularRootElement(targetDOMNode: HTMLElement, targetSelector: string): void;
    private fullRendererRequired;
}
export {};
