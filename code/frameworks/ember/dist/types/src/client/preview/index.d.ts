import './globals';
declare const forceReRender: (() => never) | (() => void);
export declare const setAddon: ((addon: any) => void) | (() => never), addDecorator: (() => never) | ((decorator: import("@storybook/csf").DecoratorFunction<import("./types").EmberFramework, import("@storybook/csf").Args>) => void), addParameters: (({ globals, globalTypes, ...parameters }: import("@storybook/csf").Parameters & {
    globals?: import("@storybook/csf").Globals | undefined;
    globalTypes?: import("@storybook/csf").GlobalTypes | undefined;
}) => void) | (() => never), clearDecorators: (() => void) | (() => never), getStorybook: (() => never) | (() => import("lib/client-api/dist/types/ClientApi").GetStorybookKind<import("./types").EmberFramework>[]), raw: (() => never) | (() => import("lib/store/dist/types").BoundStory<import("./types").EmberFramework>[]);
export declare const storiesOf: (kind: string, m: any) => import("lib/addons/dist/types").StoryApi<import("./types").OptionsArgs>;
export declare const configure: (loadable: any, m: any) => void;
export { forceReRender };
