import * as lib_docs_tools_dist_types from 'lib/docs-tools/dist/types';
import * as lib_addons_dist_types from 'lib/addons/dist/types';
import * as _storybook_csf from '@storybook/csf';
import { ArgsStoryFn, LegacyStoryFn, DecoratorFunction } from '@storybook/csf';
import { S as StoryContext, V as VueFramework } from './types-ac5da9dd.js';
import { RenderContext } from '@storybook/store';
import 'vue';

declare const decorators: ((storyFn: any, context: StoryContext) => any)[];
declare const argTypesEnhancers: (<TFramework extends _storybook_csf.AnyFramework>(context: _storybook_csf.StoryContextForEnhancers<TFramework, _storybook_csf.Args>) => _storybook_csf.StrictArgTypes<_storybook_csf.Args> | lib_addons_dist_types.Parameters)[];

declare const render: ArgsStoryFn<VueFramework>;
declare function renderToDOM({ title, name, storyFn, storyContext: { args }, showMain, showError, showException, forceRemount, }: RenderContext<VueFramework>, domElement: Element): void;

declare function decorateStory(storyFn: LegacyStoryFn<VueFramework>, decorators: DecoratorFunction<VueFramework>[]): LegacyStoryFn<VueFramework>;

declare const parameters: {
    docs: {
        inlineStories: boolean;
        iframeHeight: number;
        extractArgTypes: lib_docs_tools_dist_types.ArgTypesExtractor;
        extractComponentDescription: typeof lib_docs_tools_dist_types.extractComponentDescription;
    };
    framework: "vue";
};

export { decorateStory as applyDecorators, argTypesEnhancers, decorators, parameters, render, renderToDOM };
