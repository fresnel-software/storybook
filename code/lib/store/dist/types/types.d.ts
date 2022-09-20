import { SynchronousPromise } from 'synchronous-promise';
import type { DecoratorFunction, Args, StoryContextForEnhancers, StoryId, StoryName, StoryIdentifier, ViewMode, LegacyStoryFn, StoryContextForLoaders, StoryContext, ComponentTitle, AnyFramework, ProjectAnnotations, ComponentAnnotations, StoryAnnotations, StoryFn, StrictArgTypes, StrictGlobalTypes, ComponentId, PartialStoryFn, Parameters } from '@storybook/csf';
import type { StoryIndexEntry, DocsIndexEntry, TemplateDocsIndexEntry, StandaloneDocsIndexEntry, IndexEntry } from '@storybook/addons';
export type { StoryIndexEntry, DocsIndexEntry, IndexEntry, TemplateDocsIndexEntry, StandaloneDocsIndexEntry, };
export type { StoryId, Parameters };
export declare type Path = string;
export declare type ModuleExport = any;
export declare type ModuleExports = Record<string, ModuleExport>;
export declare type PromiseLike<T> = Promise<T> | SynchronousPromise<T>;
export declare type ModuleImportFn = (path: Path) => PromiseLike<ModuleExports>;
declare type MaybePromise<T> = Promise<T> | T;
export declare type TeardownRenderToDOM = () => MaybePromise<void>;
export declare type RenderToDOM<TFramework extends AnyFramework> = (context: RenderContext<TFramework>, element: Element) => MaybePromise<void | TeardownRenderToDOM>;
export declare type WebProjectAnnotations<TFramework extends AnyFramework> = ProjectAnnotations<TFramework> & {
    renderToDOM?: RenderToDOM<TFramework>;
};
export declare type NormalizedProjectAnnotations<TFramework extends AnyFramework = AnyFramework> = ProjectAnnotations<TFramework> & {
    argTypes?: StrictArgTypes;
    globalTypes?: StrictGlobalTypes;
};
export declare type NormalizedComponentAnnotations<TFramework extends AnyFramework = AnyFramework> = ComponentAnnotations<TFramework> & {
    id: ComponentId;
    title: ComponentTitle;
    argTypes?: StrictArgTypes;
};
export declare type NormalizedStoryAnnotations<TFramework extends AnyFramework = AnyFramework> = Omit<StoryAnnotations<TFramework>, 'storyName' | 'story'> & {
    moduleExport: ModuleExport;
    id: StoryId;
    argTypes?: StrictArgTypes;
    name: StoryName;
    userStoryFn?: StoryFn<TFramework>;
};
export declare type CSFFile<TFramework extends AnyFramework = AnyFramework> = {
    meta: NormalizedComponentAnnotations<TFramework>;
    stories: Record<StoryId, NormalizedStoryAnnotations<TFramework>>;
};
export declare type Story<TFramework extends AnyFramework = AnyFramework> = StoryContextForEnhancers<TFramework> & {
    moduleExport: ModuleExport;
    originalStoryFn: StoryFn<TFramework>;
    undecoratedStoryFn: LegacyStoryFn<TFramework>;
    unboundStoryFn: LegacyStoryFn<TFramework>;
    applyLoaders: (context: StoryContextForLoaders<TFramework>) => Promise<StoryContextForLoaders<TFramework> & {
        loaded: StoryContext<TFramework>['loaded'];
    }>;
    playFunction?: (context: StoryContext<TFramework>) => Promise<void> | void;
};
export declare type BoundStory<TFramework extends AnyFramework = AnyFramework> = Story<TFramework> & {
    storyFn: PartialStoryFn<TFramework>;
};
export declare type RenderContext<TFramework extends AnyFramework = AnyFramework> = StoryIdentifier & {
    showMain: () => void;
    showError: (error: {
        title: string;
        description: string;
    }) => void;
    showException: (err: Error) => void;
    forceRemount: boolean;
    storyContext: StoryContext<TFramework>;
    storyFn: PartialStoryFn<TFramework>;
    unboundStoryFn: LegacyStoryFn<TFramework>;
};
export interface V2CompatIndexEntry extends Omit<StoryIndexEntry, 'type'> {
    kind: StoryIndexEntry['title'];
    story: StoryIndexEntry['name'];
    parameters: Parameters;
}
export interface StoryIndexV3 {
    v: number;
    stories: Record<StoryId, V2CompatIndexEntry>;
}
export interface StoryIndex {
    v: number;
    entries: Record<StoryId, IndexEntry>;
}
export declare type StorySpecifier = StoryId | {
    name: StoryName;
    title: ComponentTitle;
} | '*';
export interface SelectionSpecifier {
    storySpecifier: StorySpecifier;
    viewMode: ViewMode;
    args?: Args;
    globals?: Args;
}
export interface Selection {
    storyId: StoryId;
    viewMode: ViewMode;
}
export declare type DecoratorApplicator<TFramework extends AnyFramework = AnyFramework> = (storyFn: LegacyStoryFn<TFramework>, decorators: DecoratorFunction<TFramework>[]) => LegacyStoryFn<TFramework>;
export interface StoriesSpecifier {
    directory: string;
    titlePrefix?: string;
}
export interface NormalizedStoriesSpecifier {
    glob?: string;
    specifier?: StoriesSpecifier;
}
export declare type ExtractOptions = {
    includeDocsOnly?: boolean;
};
