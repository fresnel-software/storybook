import type { RenderContext } from '@storybook/store';
import type { ArgsStoryFn } from '@storybook/csf';
import type { AngularFramework } from './types';
import { RendererFactory } from './angular-beta/RendererFactory';
export declare const rendererFactory: RendererFactory;
export declare const render: ArgsStoryFn<AngularFramework>;
export declare function renderToDOM({ storyFn, showMain, forceRemount, storyContext: { parameters, component }, id, }: RenderContext<AngularFramework>, element: HTMLElement): Promise<void>;
