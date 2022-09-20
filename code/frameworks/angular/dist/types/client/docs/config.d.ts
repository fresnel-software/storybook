import { SourceType } from '@storybook/docs-tools';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        extractArgTypes: (component: import("./types").Directive) => import("lib/api/dist/types").ArgTypes;
        extractComponentDescription: (component: import("./types").Directive) => string;
        source: {
            type: SourceType;
            language: string;
        };
    };
};
export declare const decorators: ((storyFn: import("@storybook/csf").PartialStoryFn<import("../types").AngularFramework, import("@storybook/csf").Args>, context: import("../types").StoryContext) => import("..").IStory)[];
export declare const argTypesEnhancers: (<TFramework extends import("@storybook/csf").AnyFramework>(context: import("@storybook/csf").StoryContextForEnhancers<TFramework, import("@storybook/csf").Args>) => import("@storybook/csf").StrictArgTypes<import("@storybook/csf").Args> | import("lib/addons/dist/types").Parameters)[];
