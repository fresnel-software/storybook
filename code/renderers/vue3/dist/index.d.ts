import * as lib_store_dist_types from 'lib/store/dist/types';
import * as lib_client_api_dist_types_ClientApi from 'lib/client-api/dist/types/ClientApi';
import * as _storybook_csf from '@storybook/csf';
import { Args, ComponentAnnotations, AnnotatedStoryFn, StoryAnnotations } from '@storybook/csf';
export { ArgTypes, Args, Parameters, StoryContext } from '@storybook/csf';
import * as _storybook_addons from '@storybook/addons';
import { ClientStoryApi, Loadable } from '@storybook/addons';
import { App } from 'vue';
import { V as VueFramework, I as IStorybookSection } from './render-ea26216d.js';
export { s as setup } from './render-ea26216d.js';
import '@storybook/store';

interface ClientApi extends ClientStoryApi<VueFramework['storyResult']> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
    load: (...args: any[]) => void;
    app: App;
}
declare const storiesOf: ClientApi['storiesOf'];
declare const configure: ClientApi['configure'];
declare const addDecorator: (() => never) | ((decorator: _storybook_csf.DecoratorFunction<VueFramework, _storybook_addons.Args>) => void);
declare const addParameters: (() => never) | (({ globals, globalTypes, ...parameters }: _storybook_csf.Parameters & {
    globals?: _storybook_csf.Globals;
    globalTypes?: _storybook_csf.GlobalTypes;
}) => void);
declare const clearDecorators: (() => never) | (() => void);
declare const setAddon: (() => never) | ((addon: any) => void);
declare const forceReRender: (() => never) | (() => void);
declare const getStorybook: (() => never) | (() => lib_client_api_dist_types_ClientApi.GetStorybookKind<VueFramework>[]);
declare const raw: (() => never) | (() => lib_store_dist_types.BoundStory<VueFramework>[]);

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
