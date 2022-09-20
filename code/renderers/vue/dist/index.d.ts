import { ClientStoryApi, Loadable } from '@storybook/addons';
import { V as VueFramework, I as IStorybookSection } from './types-ac5da9dd.js';
import { Args, ComponentAnnotations, AnnotatedStoryFn, StoryAnnotations } from '@storybook/csf';
export { ArgTypes, Args, Parameters, StoryContext } from '@storybook/csf';
import 'vue';

interface ClientApi extends ClientStoryApi<VueFramework['storyResult']> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
    load: (...args: any[]) => void;
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

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
declare type Meta<TArgs = Args> = ComponentAnnotations<VueFramework, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryFn<TArgs = Args> = AnnotatedStoryFn<VueFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryObj<TArgs = Args> = StoryAnnotations<VueFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type Story<TArgs = Args> = StoryObj<TArgs>;

export { Meta, Story, StoryFn, StoryObj, addDecorator, addParameters, clearDecorators, configure, forceReRender, getStorybook, raw, setAddon, storiesOf };
