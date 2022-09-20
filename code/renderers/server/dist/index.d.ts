import * as lib_store_dist_types from 'lib/store/dist/types';
import * as lib_client_api_dist_types_ClientApi from 'lib/client-api/dist/types/ClientApi';
import * as _storybook_csf from '@storybook/csf';
export { ArgTypes, Args, Parameters, StoryContext } from '@storybook/csf';
import * as _storybook_addons from '@storybook/addons';
import { ClientStoryApi, Loadable } from '@storybook/addons';
import { S as ServerFramework, I as IStorybookSection } from './public-types-07d4abb5.js';
export { M as Meta, c as Story, a as StoryFn, b as StoryObj } from './public-types-07d4abb5.js';

interface ClientApi extends ClientStoryApi<ServerFramework['storyResult']> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
}
declare const storiesOf: ClientApi['storiesOf'];
declare const configure: ClientApi['configure'];
declare const addDecorator: (() => never) | ((decorator: _storybook_csf.DecoratorFunction<ServerFramework, _storybook_addons.Args>) => void);
declare const addParameters: (() => never) | (({ globals, globalTypes, ...parameters }: _storybook_csf.Parameters & {
    globals?: _storybook_csf.Globals;
    globalTypes?: _storybook_csf.GlobalTypes;
}) => void);
declare const clearDecorators: (() => never) | (() => void);
declare const setAddon: (() => never) | ((addon: any) => void);
declare const getStorybook: (() => never) | (() => lib_client_api_dist_types_ClientApi.GetStorybookKind<ServerFramework>[]);
declare const raw: (() => never) | (() => lib_store_dist_types.BoundStory<ServerFramework>[]);
declare const forceReRender: (() => never) | (() => void);

export { addDecorator, addParameters, clearDecorators, configure, forceReRender, getStorybook, raw, setAddon, storiesOf };
