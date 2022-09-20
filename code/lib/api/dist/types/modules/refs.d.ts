import { SetStoriesStory, StoriesHash, SetStoriesStoryData, StoryIndex } from '../lib/stories';
import type { ModuleFn } from '../index';
export interface SubState {
    refs: Refs;
}
declare type Versions = Record<string, string>;
export declare type SetRefData = Partial<ComposedRef & {
    setStoriesData: SetStoriesStoryData;
    storyIndex: StoryIndex;
}>;
export interface SubAPI {
    findRef: (source: string) => ComposedRef;
    setRef: (id: string, data: SetRefData, ready?: boolean) => void;
    updateRef: (id: string, ref: ComposedRefUpdate) => void;
    getRefs: () => Refs;
    checkRef: (ref: SetRefData) => Promise<void>;
    changeRefVersion: (id: string, url: string) => void;
    changeRefState: (id: string, ready: boolean) => void;
}
export declare type StoryMapper = (ref: ComposedRef, story: SetStoriesStory) => SetStoriesStory;
export interface ComposedRef {
    id: string;
    title?: string;
    url: string;
    type?: 'auto-inject' | 'unknown' | 'lazy' | 'server-checked';
    expanded?: boolean;
    stories: StoriesHash;
    versions?: Versions;
    loginUrl?: string;
    version?: string;
    ready?: boolean;
    error?: any;
}
export declare type ComposedRefUpdate = Partial<Pick<ComposedRef, 'title' | 'type' | 'expanded' | 'stories' | 'versions' | 'loginUrl' | 'version' | 'ready' | 'error'>>;
export declare type Refs = Record<string, ComposedRef>;
export declare type RefId = string;
export declare type RefUrl = string;
export declare const getSourceType: (source: string, refId: string) => string[];
export declare const defaultStoryMapper: StoryMapper;
export declare const init: ModuleFn<SubAPI, SubState, void>;
export {};
