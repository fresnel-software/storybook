import { StoryContext as StoryContext$1 } from '@storybook/csf';
import { Component, AsyncComponent } from 'vue';

declare type StoryFnVueReturnType = string | Component;
declare type StoryContext = StoryContext$1<VueFramework>;
interface IStorybookStory {
    name: string;
    render: (context: any) => any;
}
interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}
declare type VueFramework = {
    component: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
    storyResult: StoryFnVueReturnType;
};

export { IStorybookSection as I, StoryContext as S, VueFramework as V };
