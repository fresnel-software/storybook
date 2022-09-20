import * as lib_docs_tools_dist_types from 'lib/docs-tools/dist/types';
import * as lib_addons_dist_types from 'lib/addons/dist/types';
import * as _storybook_csf from '@storybook/csf';
import { LegacyStoryFn, DecoratorFunction } from '@storybook/csf';
import { V as VueFramework } from './render-ea26216d.js';
export { r as render, a as renderToDOM } from './render-ea26216d.js';
import '@storybook/store';
import 'vue';

declare const argTypesEnhancers: (<TFramework extends _storybook_csf.AnyFramework>(context: _storybook_csf.StoryContextForEnhancers<TFramework, _storybook_csf.Args>) => _storybook_csf.StrictArgTypes<_storybook_csf.Args> | lib_addons_dist_types.Parameters)[];

declare function decorateStory(storyFn: LegacyStoryFn<VueFramework>, decorators: DecoratorFunction<VueFramework>[]): LegacyStoryFn<VueFramework>;

declare const parameters: {
    docs: {
        inlineStories: boolean;
        extractArgTypes: lib_docs_tools_dist_types.ArgTypesExtractor;
        extractComponentDescription: typeof lib_docs_tools_dist_types.extractComponentDescription;
    };
    framework: "vue3";
};

export { decorateStory as applyDecorators, argTypesEnhancers, parameters };
