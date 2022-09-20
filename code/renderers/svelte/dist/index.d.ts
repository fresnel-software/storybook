import * as lib_addons_dist_types from 'lib/addons/dist/types';
import * as lib_store_dist_types from 'lib/store/dist/types';
import * as lib_client_api_dist_types_ClientApi from 'lib/client-api/dist/types/ClientApi';
import * as _storybook_csf from '@storybook/csf';
import { Args, ComponentAnnotations, AnnotatedStoryFn, StoryAnnotations } from '@storybook/csf';
export { ArgTypes, Args, Parameters, StoryContext } from '@storybook/csf';
import { S as SvelteFramework } from './types-e4260f4c.js';

declare const forceReRender: (() => never) | (() => void);
declare const setAddon: (() => never) | ((addon: any) => void);
declare const addDecorator: (() => never) | ((decorator: _storybook_csf.DecoratorFunction<SvelteFramework, _storybook_csf.Args>) => void);
declare const addParameters: (() => never) | (({ globals, globalTypes, ...parameters }: _storybook_csf.Parameters & {
    globals?: _storybook_csf.Globals | undefined;
    globalTypes?: _storybook_csf.GlobalTypes | undefined;
}) => void);
declare const clearDecorators: (() => never) | (() => void);
declare const getStorybook: (() => never) | (() => lib_client_api_dist_types_ClientApi.GetStorybookKind<SvelteFramework>[]);
declare const raw: (() => never) | (() => lib_store_dist_types.BoundStory<SvelteFramework>[]);
declare const storiesOf: (kind: string, m: any) => lib_addons_dist_types.StoryApi<any>;
declare const configure: (loadable: any, m: any) => void;

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
declare type Meta<TArgs = Args> = ComponentAnnotations<SvelteFramework, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryFn<TArgs = Args> = AnnotatedStoryFn<SvelteFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryObj<TArgs = Args> = StoryAnnotations<SvelteFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type Story<TArgs = Args> = StoryObj<TArgs>;

export { Meta, Story, StoryFn, StoryObj, addDecorator, addParameters, clearDecorators, configure, forceReRender, getStorybook, raw, setAddon, storiesOf };
