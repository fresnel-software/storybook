import { RenderContext } from '@storybook/store';
import { P as PreactFramework } from './types-ed8e97dc.js';
import 'preact';

declare function renderToDOM({ storyFn, title, name, showMain, showError, forceRemount }: RenderContext<PreactFramework>, domElement: Element): void;

declare const parameters: {
    framework: "preact";
};

export { parameters, renderToDOM };
