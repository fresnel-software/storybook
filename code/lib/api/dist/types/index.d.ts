import React, { Component, FC, ReactElement, ReactNode } from 'react';
import { Conditional } from '@storybook/csf';
import type { RouterData } from '@storybook/router';
import type { Listener } from '@storybook/channels';
import type { DocsOptions } from '@storybook/core-common';
import Store, { Options } from './store';
import type { StoriesHash, RootEntry, GroupEntry, ComponentEntry, DocsEntry, StoryEntry, HashEntry, LeafEntry } from './lib/stories';
import type { ComposedRef, Refs } from './modules/refs';
import * as provider from './modules/provider';
import * as addons from './modules/addons';
import * as channel from './modules/channel';
import * as notifications from './modules/notifications';
import * as settings from './modules/settings';
import * as releaseNotes from './modules/release-notes';
import * as stories from './modules/stories';
import * as refs from './modules/refs';
import * as layout from './modules/layout';
import * as shortcuts from './modules/shortcuts';
import * as url from './modules/url';
import * as version from './modules/versions';
import * as globals from './modules/globals';
declare const ActiveTabs: {
    SIDEBAR: "sidebar";
    CANVAS: "canvas";
    ADDONS: "addons";
};
export { default as merge } from './lib/merge';
export type { Options as StoreOptions, Listener as ChannelListener };
export { ActiveTabs };
export declare const ManagerContext: React.Context<{
    api: API;
    state: State;
}>;
export declare type ModuleArgs = RouterData & ProviderData & {
    mode?: 'production' | 'development';
    state: State;
    fullAPI: API;
    store: Store;
};
declare type OptionsData = {
    docsOptions: DocsOptions;
};
export declare type State = layout.SubState & stories.SubState & refs.SubState & notifications.SubState & version.SubState & url.SubState & shortcuts.SubState & releaseNotes.SubState & settings.SubState & globals.SubState & RouterData & OptionsData & Other;
export declare type API = addons.SubAPI & channel.SubAPI & provider.SubAPI & stories.SubAPI & refs.SubAPI & globals.SubAPI & layout.SubAPI & notifications.SubAPI & shortcuts.SubAPI & releaseNotes.SubAPI & settings.SubAPI & version.SubAPI & url.SubAPI & Other;
interface Other {
    [key: string]: any;
}
export interface Combo {
    api: API;
    state: State;
}
interface ProviderData {
    provider: provider.Provider;
    docsOptions: DocsOptions;
}
export declare type ManagerProviderProps = RouterData & ProviderData & {
    children: ReactNode | ((props: Combo) => ReactNode);
};
export declare type StoryId = string;
export declare type StoryKind = string;
export interface Args {
    [key: string]: any;
}
export interface ArgType {
    name?: string;
    description?: string;
    defaultValue?: any;
    if?: Conditional;
    [key: string]: any;
}
export interface ArgTypes {
    [key: string]: ArgType;
}
export interface Parameters {
    [key: string]: any;
}
export declare const combineParameters: (...parameterSets: Parameters[]) => any;
interface ModuleWithInit<APIType = unknown, StateType = unknown> {
    init: () => void | Promise<void>;
    api: APIType;
    state: StateType;
}
declare type ModuleWithoutInit<APIType = unknown, StateType = unknown> = Omit<ModuleWithInit<APIType, StateType>, 'init'>;
export declare type ModuleFn<APIType = unknown, StateType = unknown, HasInit = false> = (m: ModuleArgs) => HasInit extends true ? ModuleWithInit<APIType, StateType> : ModuleWithoutInit<APIType, StateType>;
declare class ManagerProvider extends Component<ManagerProviderProps, State> {
    api: API;
    modules: (ModuleWithInit | ModuleWithoutInit)[];
    static displayName: string;
    constructor(props: ManagerProviderProps);
    static getDerivedStateFromProps(props: ManagerProviderProps, state: State): State;
    shouldComponentUpdate(nextProps: ManagerProviderProps, nextState: State): boolean;
    initModules: () => void;
    render(): JSX.Element;
}
interface ManagerConsumerProps<P = unknown> {
    filter?: (combo: Combo) => P;
    children: FC<P> | ReactNode;
}
declare function ManagerConsumer<P = Combo>({ filter, children, }: ManagerConsumerProps<P>): ReactElement;
export declare function useStorybookState(): State;
export declare function useStorybookApi(): API;
export type { StoriesHash, RootEntry, GroupEntry, ComponentEntry, DocsEntry, StoryEntry, HashEntry, LeafEntry, ComposedRef, Refs, };
export { ManagerConsumer as Consumer, ManagerProvider as Provider };
export interface EventMap {
    [eventId: string]: Listener;
}
export declare const useChannel: (eventMap: EventMap, deps?: any[]) => (type: string, ...args: any[]) => void;
export declare function useStoryPrepared(storyId?: StoryId): boolean;
export declare function useParameter<S>(parameterKey: string, defaultValue?: S): S;
declare type StateMerger<S> = (input: S) => S;
export declare function useSharedState<S>(stateId: string, defaultState?: S): [S, (newStateOrMerger: S | StateMerger<S>, options?: Options) => void];
export declare function useAddonState<S>(addonId: string, defaultState?: S): [S, (newStateOrMerger: S | StateMerger<S>, options?: Options) => void];
export declare function useArgs(): [Args, (newArgs: Args) => void, (argNames?: string[]) => void];
export declare function useGlobals(): [Args, (newGlobals: Args) => void];
export declare function useGlobalTypes(): ArgTypes;
export declare function useArgTypes(): ArgTypes;
