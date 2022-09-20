import * as _storybook_csf from '@storybook/csf';
import { PartialStoryFn, StoryContext as StoryContext$1 } from '@storybook/csf';
import * as lib_docs_tools_dist_types from 'lib/docs-tools/dist/types';
import * as lib_addons_dist_types from 'lib/addons/dist/types';
import { RenderContext } from '@storybook/store';

declare function sourceDecorator(storyFn: PartialStoryFn<HtmlFramework>, context: StoryContext): StoryFnHtmlReturnType;

declare const decorators: (typeof sourceDecorator)[];
declare const argTypesEnhancers: (<TFramework extends _storybook_csf.AnyFramework>(context: _storybook_csf.StoryContextForEnhancers<TFramework, _storybook_csf.Args>) => _storybook_csf.StrictArgTypes<_storybook_csf.Args> | lib_addons_dist_types.Parameters)[];

declare function renderToDOM({ storyFn, kind, name, showMain, showError, forceRemount }: RenderContext<HtmlFramework>, domElement: Element): void;

declare const parameters: {
    docs: {
        inlineStories: boolean;
        transformSource: unknown;
        source: {
            type: lib_docs_tools_dist_types.SourceType;
            language: string;
            code: unknown;
            excludeDecorators: unknown;
        };
    };
    framework: "html";
};

declare type StoryFnHtmlReturnType = string | Node;
interface IStorybookStory {
    name: string;
    render: (context: any) => any;
}
interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}
declare type HtmlFramework = {
    component: HTMLElement;
    storyResult: StoryFnHtmlReturnType;
};
declare type StoryContext = StoryContext$1<HtmlFramework> & {
    parameters: StoryContext$1<HtmlFramework>['parameters'] & typeof parameters;
};

export { HtmlFramework as H, IStorybookSection as I, argTypesEnhancers as a, decorators as d, parameters as p, renderToDOM as r };
