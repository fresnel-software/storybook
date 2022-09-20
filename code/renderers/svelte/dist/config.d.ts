import * as lib_docs_tools_dist_types from 'lib/docs-tools/dist/types';
import * as lib_addons_dist_types from 'lib/addons/dist/types';
import * as _storybook_csf from '@storybook/csf';
import { ArgsStoryFn } from '@storybook/csf';
import { RenderContext } from '@storybook/store';
import { S as SvelteFramework } from './types-e4260f4c.js';

declare type Component = any;
declare function extractComponentDescription(component?: Component): string;

declare const decorators: ((storyFn: any, context: _storybook_csf.StoryContext<_storybook_csf.AnyFramework, _storybook_csf.Args>) => any)[];
declare const argTypesEnhancers: (<TFramework extends _storybook_csf.AnyFramework>(context: _storybook_csf.StoryContextForEnhancers<TFramework, _storybook_csf.Args>) => _storybook_csf.StrictArgTypes<_storybook_csf.Args> | lib_addons_dist_types.Parameters)[];

declare function renderToDOM({ storyFn, kind, name, showMain, showError, storyContext }: RenderContext<SvelteFramework>, domElement: Element): void;
declare const render: ArgsStoryFn<SvelteFramework>;

declare function decorateStory(storyFn: any, decorators: any[]): any;

declare const parameters: {
    docs: {
        inlineStories: boolean;
        extractArgTypes: lib_docs_tools_dist_types.ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
    framework: "svelte";
};

export { decorateStory as applyDecorators, argTypesEnhancers, decorators, parameters, render, renderToDOM };
