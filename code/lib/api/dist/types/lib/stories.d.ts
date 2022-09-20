import React from 'react';
import type { StoryId, ComponentTitle, StoryKind, StoryName, Args, ArgTypes, Parameters, ComponentId } from '@storybook/csf';
import type { DocsOptions } from '@storybook/core-common';
import type { Provider } from '../modules/provider';
import type { ViewMode } from '../modules/addons';
export type { StoryId };
export interface BaseEntry {
    id: StoryId;
    depth: number;
    name: string;
    refId?: string;
    renderLabel?: (item: BaseEntry) => React.ReactNode;
    /** @deprecated */
    isRoot: boolean;
    /** @deprecated */
    isComponent: boolean;
    /** @deprecated */
    isLeaf: boolean;
}
export interface RootEntry extends BaseEntry {
    type: 'root';
    startCollapsed?: boolean;
    children: StoryId[];
    /** @deprecated */
    isRoot: true;
    /** @deprecated */
    isComponent: false;
    /** @deprecated */
    isLeaf: false;
}
export interface GroupEntry extends BaseEntry {
    type: 'group';
    parent?: StoryId;
    children: StoryId[];
    /** @deprecated */
    isRoot: false;
    /** @deprecated */
    isComponent: false;
    /** @deprecated */
    isLeaf: false;
}
export interface ComponentEntry extends BaseEntry {
    type: 'component';
    parent?: StoryId;
    children: StoryId[];
    /** @deprecated */
    isRoot: false;
    /** @deprecated */
    isComponent: true;
    /** @deprecated */
    isLeaf: false;
}
export interface DocsEntry extends BaseEntry {
    type: 'docs';
    parent: StoryId;
    title: ComponentTitle;
    /** @deprecated */
    kind: ComponentTitle;
    importPath: Path;
    /** @deprecated */
    isRoot: false;
    /** @deprecated */
    isComponent: false;
    /** @deprecated */
    isLeaf: true;
}
export interface StoryEntry extends BaseEntry {
    type: 'story';
    parent: StoryId;
    title: ComponentTitle;
    /** @deprecated */
    kind: ComponentTitle;
    importPath: Path;
    prepared: boolean;
    parameters?: {
        [parameterName: string]: any;
    };
    args?: Args;
    argTypes?: ArgTypes;
    initialArgs?: Args;
    /** @deprecated */
    isRoot: false;
    /** @deprecated */
    isComponent: false;
    /** @deprecated */
    isLeaf: true;
}
export declare type LeafEntry = DocsEntry | StoryEntry;
export declare type HashEntry = RootEntry | GroupEntry | ComponentEntry | DocsEntry | StoryEntry;
/** @deprecated */
export declare type Root = RootEntry;
/** @deprecated */
export declare type Group = GroupEntry | ComponentEntry;
/** @deprecated */
export declare type Story = LeafEntry;
/**
 * The `StoriesHash` is our manager-side representation of the `StoryIndex`.
 * We create entries in the hash not only for each story or docs entry, but
 * also for each "group" of the component (split on '/'), as that's how things
 * are manipulated in the manager (i.e. in the sidebar)
 */
export interface StoriesHash {
    [id: string]: HashEntry;
}
export interface SetStoriesStory {
    id: StoryId;
    name: string;
    refId?: string;
    componentId?: ComponentId;
    kind: StoryKind;
    parameters: {
        fileName: string;
        options: {
            [optionName: string]: any;
        };
        docsOnly?: boolean;
        viewMode?: ViewMode;
        [parameterName: string]: any;
    };
    argTypes?: ArgTypes;
    args?: Args;
    initialArgs?: Args;
}
export interface SetStoriesStoryData {
    [id: string]: SetStoriesStory;
}
export interface StoryKey {
    id: StoryId;
    refId?: string;
}
export declare type SetStoriesPayload = {
    v: 2;
    error?: Error;
    globals: Args;
    globalParameters: Parameters;
    stories: SetStoriesStoryData;
    kindParameters: {
        [kind: string]: Parameters;
    };
} | ({
    v?: number;
    stories: SetStoriesStoryData;
} & Record<string, never>);
declare type Path = string;
interface BaseIndexEntry {
    id: StoryId;
    name: StoryName;
    title: ComponentTitle;
    importPath: Path;
}
export declare type StoryIndexEntry = BaseIndexEntry & {
    type?: 'story';
};
interface V3IndexEntry extends BaseIndexEntry {
    parameters?: Parameters;
}
export interface StoryIndexV3 {
    v: 3;
    stories: Record<StoryId, V3IndexEntry>;
}
export declare type DocsIndexEntry = BaseIndexEntry & {
    storiesImports: Path[];
    type: 'docs';
};
export declare type IndexEntry = StoryIndexEntry | DocsIndexEntry;
export interface StoryIndex {
    v: number;
    entries: Record<StoryId, IndexEntry>;
}
export declare const denormalizeStoryParameters: ({ globalParameters, kindParameters, stories, }: SetStoriesPayload) => SetStoriesStoryData;
declare type PreparedIndexEntry = IndexEntry & {
    parameters?: Parameters;
    argTypes?: ArgTypes;
    args?: Args;
    initialArgs?: Args;
};
export interface PreparedStoryIndex {
    v: number;
    entries: Record<StoryId, PreparedIndexEntry>;
}
export declare const transformSetStoriesStoryDataToStoriesHash: (data: SetStoriesStoryData, { provider, docsOptions }: {
    provider: Provider;
    docsOptions: DocsOptions;
}) => StoriesHash;
export declare const transformStoryIndexToStoriesHash: (index: PreparedStoryIndex, { provider, docsOptions, }: {
    provider: Provider;
    docsOptions: DocsOptions;
}) => StoriesHash;
export declare const addPreparedStories: (newHash: StoriesHash, oldHash?: StoriesHash) => StoriesHash;
export declare const getComponentLookupList: (hash: StoriesHash) => string[][];
export declare const getStoriesLookupList: (hash: StoriesHash) => string[];
