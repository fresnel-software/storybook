import { ComponentId } from '@storybook/csf';
import type { StoryId, AnyFramework, StoryFn } from '@storybook/csf';
import { StoryStore } from '@storybook/store';
import type { NormalizedProjectAnnotations, Path, ModuleExports, IndexEntry } from '@storybook/store';
export interface GetStorybookStory<TFramework extends AnyFramework> {
    name: string;
    render: StoryFn<TFramework>;
}
export interface GetStorybookKind<TFramework extends AnyFramework> {
    kind: string;
    fileName: string;
    stories: GetStorybookStory<TFramework>[];
}
export declare class StoryStoreFacade<TFramework extends AnyFramework> {
    projectAnnotations: NormalizedProjectAnnotations<TFramework>;
    entries: Record<StoryId, IndexEntry & {
        componentId?: ComponentId;
    }>;
    csfExports: Record<Path, ModuleExports>;
    constructor();
    importFn(path: Path): Promise<ModuleExports>;
    getStoryIndex(store: StoryStore<TFramework>): {
        v: number;
        entries: Record<string, IndexEntry>;
    };
    clearFilenameExports(fileName: Path): void;
    addStoriesFromExports(fileName: Path, fileExports: ModuleExports): void;
}
