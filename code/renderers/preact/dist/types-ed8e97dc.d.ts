import { AnyComponent } from 'preact';

declare type StoryFnPreactReturnType = string | Node | preact.JSX.Element;
interface IStorybookStory {
    name: string;
    render: (context: any) => any;
}
interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}
declare type PreactFramework = {
    component: AnyComponent<any, any>;
    storyResult: StoryFnPreactReturnType;
};

export { IStorybookSection as I, PreactFramework as P };
