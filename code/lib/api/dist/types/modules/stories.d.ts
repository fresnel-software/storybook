import { toId } from '@storybook/csf';
import { HashEntry, LeafEntry } from '../lib/stories';
import type { StoriesHash, StoryEntry, StoryId, SetStoriesStoryData, StoryIndex } from '../lib/stories';
import type { Args, ModuleFn } from '../index';
import type { ComposedRef } from './refs';
declare type Direction = -1 | 1;
declare type ParameterName = string;
declare type ViewMode = 'story' | 'info' | 'settings' | string | undefined;
declare type StoryUpdate = Pick<StoryEntry, 'parameters' | 'initialArgs' | 'argTypes' | 'args'>;
export interface SubState {
    storiesHash: StoriesHash;
    storyId: StoryId;
    viewMode: ViewMode;
    storiesConfigured: boolean;
    storiesFailed?: Error;
}
export interface SubAPI {
    storyId: typeof toId;
    resolveStory: (storyId: StoryId, refsId?: string) => HashEntry;
    selectFirstStory: () => void;
    selectStory: (kindOrId?: string, story?: string, obj?: {
        ref?: string;
        viewMode?: ViewMode;
    }) => void;
    getCurrentStoryData: () => LeafEntry;
    setStories: (stories: SetStoriesStoryData, failed?: Error) => Promise<void>;
    jumpToComponent: (direction: Direction) => void;
    jumpToStory: (direction: Direction) => void;
    getData: (storyId: StoryId, refId?: string) => LeafEntry;
    isPrepared: (storyId: StoryId, refId?: string) => boolean;
    getParameters: (storyId: StoryId | {
        storyId: StoryId;
        refId: string;
    }, parameterName?: ParameterName) => StoryEntry['parameters'] | any;
    getCurrentParameter<S>(parameterName?: ParameterName): S;
    updateStoryArgs(story: StoryEntry, newArgs: Args): void;
    resetStoryArgs: (story: StoryEntry, argNames?: string[]) => void;
    findLeafEntry(StoriesHash: StoriesHash, storyId: StoryId): LeafEntry;
    findLeafStoryId(StoriesHash: StoriesHash, storyId: StoryId): StoryId;
    findSiblingStoryId(storyId: StoryId, hash: StoriesHash, direction: Direction, toSiblingGroup: boolean): StoryId;
    fetchStoryList: () => Promise<void>;
    setStoryList: (storyList: StoryIndex) => Promise<void>;
    updateStory: (storyId: StoryId, update: StoryUpdate, ref?: ComposedRef) => Promise<void>;
}
export declare const init: ModuleFn<SubAPI, SubState, true>;
export {};
