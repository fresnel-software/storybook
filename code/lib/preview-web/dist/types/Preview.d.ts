import { Channel } from '@storybook/addons';
import { AnyFramework, StoryId, ProjectAnnotations, Args, Globals } from '@storybook/csf';
import { ModuleImportFn, Story, StoryStore, StoryIndex, PromiseLike, WebProjectAnnotations, RenderToDOM } from '@storybook/store';
import { StoryRender } from './render/StoryRender';
import { TemplateDocsRender } from './render/TemplateDocsRender';
import { StandaloneDocsRender } from './render/StandaloneDocsRender';
export declare type MaybePromise<T> = Promise<T> | T;
export declare class Preview<TFramework extends AnyFramework> {
    protected channel: Channel;
    serverChannel?: Channel;
    storyStore: StoryStore<TFramework>;
    getStoryIndex?: () => StoryIndex;
    importFn?: ModuleImportFn;
    renderToDOM?: RenderToDOM<TFramework>;
    storyRenders: StoryRender<TFramework>[];
    previewEntryError?: Error;
    constructor(channel?: Channel);
    initialize({ getStoryIndex, importFn, getProjectAnnotations, }: {
        getStoryIndex?: () => StoryIndex;
        importFn: ModuleImportFn;
        getProjectAnnotations: () => MaybePromise<WebProjectAnnotations<TFramework>>;
    }): Promise<void>;
    setupListeners(): void;
    getProjectAnnotationsOrRenderError(getProjectAnnotations: () => MaybePromise<WebProjectAnnotations<TFramework>>): PromiseLike<ProjectAnnotations<TFramework>>;
    initializeWithProjectAnnotations(projectAnnotations: WebProjectAnnotations<TFramework>): Promise<void>;
    setInitialGlobals(): Promise<void>;
    emitGlobals(): void;
    getStoryIndexFromServer(): Promise<StoryIndex>;
    initializeWithStoryIndex(storyIndex: StoryIndex): PromiseLike<void>;
    onGetProjectAnnotationsChanged({ getProjectAnnotations, }: {
        getProjectAnnotations: () => MaybePromise<ProjectAnnotations<TFramework>>;
    }): Promise<void>;
    onStoryIndexChanged(): Promise<void>;
    onStoriesChanged({ importFn, storyIndex, }: {
        importFn?: ModuleImportFn;
        storyIndex?: StoryIndex;
    }): Promise<void>;
    onUpdateGlobals({ globals }: {
        globals: Globals;
    }): Promise<void>;
    onUpdateArgs({ storyId, updatedArgs }: {
        storyId: StoryId;
        updatedArgs: Args;
    }): Promise<void>;
    onResetArgs({ storyId, argNames }: {
        storyId: string;
        argNames?: string[];
    }): Promise<void>;
    onForceReRender(): Promise<void>;
    onForceRemount({ storyId }: {
        storyId: StoryId;
    }): Promise<void>;
    renderStoryToElement(story: Story<TFramework>, element: HTMLElement): () => Promise<void>;
    teardownRender(render: StoryRender<TFramework> | TemplateDocsRender<TFramework> | StandaloneDocsRender<TFramework>, { viewModeChanged }?: {
        viewModeChanged?: boolean;
    }): Promise<void>;
    extract(options?: {
        includeDocsOnly: boolean;
    }): Promise<Record<string, import("@storybook/csf").StoryContextForEnhancers<TFramework, Args>>>;
    inlineStoryCallbacks(storyId: StoryId): {
        showMain: () => void;
        showError: (err: {
            title: string;
            description: string;
        }) => void;
        showException: (err: Error) => void;
    };
    renderPreviewEntryError(reason: string, err: Error): void;
}
