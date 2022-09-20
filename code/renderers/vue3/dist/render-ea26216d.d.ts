import { RenderContext } from '@storybook/store';
import { ArgsStoryFn } from '@storybook/csf';
import { ConcreteComponent } from 'vue';

declare type StoryFnVueReturnType = ConcreteComponent<any>;
interface IStorybookStory {
    name: string;
    render: (context: any) => any;
}
interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}
declare type VueFramework = {
    component: ConcreteComponent<any>;
    storyResult: StoryFnVueReturnType;
};

declare const render: ArgsStoryFn<VueFramework>;
declare const setup: (fn: (app: any) => void) => void;
declare function renderToDOM({ title, name, storyFn, showMain, showError, showException }: RenderContext<VueFramework>, domElement: Element): void;

export { IStorybookSection as I, VueFramework as V, renderToDOM as a, render as r, setup as s };
