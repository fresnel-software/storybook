import * as lib_docs_tools_dist_types from 'lib/docs-tools/dist/types';
import * as lib_api_dist_types from 'lib/api/dist/types';
import * as lib_addons_dist_types from 'lib/addons/dist/types';
import * as _storybook_csf from '@storybook/csf';
import { PartialStoryFn, StoryContext } from '@storybook/csf';
import { W as WebComponentsFramework } from './types-7ab3c005.js';
import { RenderContext } from '@storybook/store';
import 'lit-html';

declare function sourceDecorator(storyFn: PartialStoryFn<WebComponentsFramework>, context: StoryContext<WebComponentsFramework>): WebComponentsFramework['storyResult'];

declare const decorators: (typeof sourceDecorator)[];
declare const argTypesEnhancers: (<TFramework extends _storybook_csf.AnyFramework>(context: _storybook_csf.StoryContextForEnhancers<TFramework, _storybook_csf.Args>) => _storybook_csf.StrictArgTypes<_storybook_csf.Args> | lib_addons_dist_types.Parameters)[];

declare function renderToDOM({ storyFn, kind, name, showMain, showError, forceRemount }: RenderContext<WebComponentsFramework>, domElement: Element): void;

declare const parameters: {
    docs: {
        extractArgTypes: (tagName: string) => {
            [x: string]: lib_api_dist_types.ArgType;
        };
        extractComponentDescription: (tagName: string) => string;
        inlineStories: boolean;
        source: {
            type: lib_docs_tools_dist_types.SourceType;
            language: string;
        };
    };
    framework: "web-components";
};

export { argTypesEnhancers, decorators, parameters, renderToDOM };
