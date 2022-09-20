"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderToDOM = exports.render = exports.rendererFactory = void 0;
const helpers_1 = require("./angular/helpers");
const RendererFactory_1 = require("./angular-beta/RendererFactory");
exports.rendererFactory = new RendererFactory_1.RendererFactory();
const render = (props) => ({ props });
exports.render = render;
async function renderToDOM({ storyFn, showMain, forceRemount, storyContext: { parameters, component }, id, }, element) {
    showMain();
    if (parameters.angularLegacyRendering) {
        (0, helpers_1.renderNgApp)(storyFn, !forceRemount);
        return;
    }
    const renderer = await exports.rendererFactory.getRendererInstance(id, element);
    await renderer.render({
        storyFnAngular: storyFn(),
        component,
        parameters,
        forced: !forceRemount,
        targetDOMNode: element,
    });
}
exports.renderToDOM = renderToDOM;
