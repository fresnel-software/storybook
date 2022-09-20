import * as lib_docs_tools_dist_types from 'lib/docs-tools/dist/types';
import * as lib_addons_dist_types from 'lib/addons/dist/types';
import * as _storybook_csf from '@storybook/csf';
import { ArgsStoryFn } from '@storybook/csf';
import { R as ReactFramework, S as StoryFnReactReturnType } from './types-9f8d440a.js';
import { RenderContext } from '@storybook/store';
import 'react';

declare const decorators: ((storyFn: _storybook_csf.PartialStoryFn<ReactFramework, _storybook_csf.Args>, context: _storybook_csf.StoryContext<ReactFramework, _storybook_csf.Args>) => StoryFnReactReturnType)[];
declare const argTypesEnhancers: (<TFramework extends _storybook_csf.AnyFramework>(context: _storybook_csf.StoryContextForEnhancers<TFramework, _storybook_csf.Args>) => _storybook_csf.StrictArgTypes<_storybook_csf.Args> | lib_addons_dist_types.Parameters)[];

declare const render: ArgsStoryFn<ReactFramework>;
declare function renderToDOM({ storyContext, unboundStoryFn, showMain, showException, forceRemount, }: RenderContext<ReactFramework>, domElement: Element): Promise<() => void>;

declare const parameters: {
    docs: {
        inlineStories: boolean;
        extractArgTypes: lib_docs_tools_dist_types.ArgTypesExtractor;
        extractComponentDescription: typeof lib_docs_tools_dist_types.extractComponentDescription;
    };
    framework: string;
};

export { argTypesEnhancers, decorators, parameters, render, renderToDOM };
