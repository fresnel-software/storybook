import { TemplateResult, SVGTemplateResult } from 'lit-html';

declare type StoryFnHtmlReturnType = string | Node | TemplateResult | SVGTemplateResult;
declare type WebComponentsFramework = {
    component: string;
    storyResult: StoryFnHtmlReturnType;
};
interface IStorybookStory {
    name: string;
    render: (context: any) => any;
}
interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}

export { IStorybookSection as I, WebComponentsFramework as W };
