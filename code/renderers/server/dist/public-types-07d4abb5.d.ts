import { Args, ComponentAnnotations, AnnotatedStoryFn, StoryAnnotations } from '@storybook/csf';

declare type StoryFnServerReturnType = any;
declare type ServerFramework = {
    component: string;
    storyResult: StoryFnServerReturnType;
};
interface IStorybookStory {
    name: string;
    render: (context: any) => any;
}
interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
declare type Meta<TArgs = Args> = ComponentAnnotations<ServerFramework, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryFn<TArgs = Args> = AnnotatedStoryFn<ServerFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type StoryObj<TArgs = Args> = StoryAnnotations<ServerFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
declare type Story<TArgs = Args> = StoryObj<TArgs>;

export { IStorybookSection as I, Meta as M, ServerFramework as S, StoryFn as a, StoryObj as b, Story as c };
