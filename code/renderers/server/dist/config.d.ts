import { RenderContext } from '@storybook/store';
import { a as StoryFn, S as ServerFramework } from './public-types-07d4abb5.js';
import '@storybook/csf';

declare const render: StoryFn<ServerFramework>;
declare function renderToDOM({ id, title, name, showMain, showError, forceRemount, storyFn, storyContext, storyContext: { parameters, args, argTypes }, }: RenderContext<ServerFramework>, domElement: Element): Promise<void>;

declare const parameters: {
    framework: "server";
};

export { parameters, render, renderToDOM };
