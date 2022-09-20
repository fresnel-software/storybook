import { Args, ComponentAnnotations, AnnotatedStoryFn, StoryAnnotations } from '@storybook/csf';
import { W as WebComponentsFramework, I as IStorybookSection } from './types-7ab3c005.js';
import { ClientStoryApi, Loadable } from '@storybook/addons';
import 'lit-html';

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
declare type Meta<TArgs = Args> = ComponentAnnotations<WebComponentsFramework, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryFn<TArgs = Args> = AnnotatedStoryFn<WebComponentsFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryObj<TArgs = Args> = StoryAnnotations<WebComponentsFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type Story<TArgs = Args> = StoryObj<TArgs>;

interface ClientApi extends ClientStoryApi<WebComponentsFramework['storyResult']> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
}
declare const storiesOf: ClientApi['storiesOf'];
declare const configure: ClientApi['configure'];
declare const addDecorator: ClientApi['addDecorator'];
declare const addParameters: ClientApi['addParameters'];
declare const clearDecorators: ClientApi['clearDecorators'];
declare const setAddon: ClientApi['setAddon'];
declare const forceReRender: ClientApi['forceReRender'];
declare const getStorybook: ClientApi['getStorybook'];
declare const raw: ClientApi['raw'];

declare function isValidComponent(tagName: string): boolean;
declare function isValidMetaData(customElements: any): boolean;
/**
 * @param customElements any for now as spec is not super stable yet
 */
declare function setCustomElements(customElements: any): void;
declare function setCustomElementsManifest(customElements: any): void;
declare function getCustomElements(): any;

export { Meta, Story, StoryFn, StoryObj, addDecorator, addParameters, clearDecorators, configure, forceReRender, getCustomElements, getStorybook, isValidComponent, isValidMetaData, raw, setAddon, setCustomElements, setCustomElementsManifest, storiesOf };
