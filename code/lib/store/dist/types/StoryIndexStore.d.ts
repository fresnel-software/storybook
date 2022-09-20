import type { StoryId } from '@storybook/csf';
import type { StorySpecifier, StoryIndex, IndexEntry, Path } from './types';
export declare class StoryIndexStore {
    entries: StoryIndex['entries'];
    constructor({ entries }?: StoryIndex);
    entryFromSpecifier(specifier: StorySpecifier): IndexEntry | undefined;
    storyIdToEntry(storyId: StoryId): IndexEntry;
    importPathToEntry(importPath: Path): IndexEntry;
}
