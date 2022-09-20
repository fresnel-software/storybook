"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearRootHTMLElement = exports.getRenderType = exports.RendererFactory = void 0;
const AbstractRenderer_1 = require("./AbstractRenderer");
const DocsRenderer_1 = require("./DocsRenderer");
const CanvasRenderer_1 = require("./CanvasRenderer");
class RendererFactory {
    constructor() {
        this.rendererMap = new Map();
    }
    async getRendererInstance(storyId, targetDOMNode) {
        // do nothing if the target node is null
        // fix a problem when the docs asks 2 times the same component at the same time
        // the 1st targetDOMNode of the 1st requested rendering becomes null 🤷‍♂️
        if (targetDOMNode === null) {
            return null;
        }
        const renderType = (0, exports.getRenderType)(targetDOMNode);
        // keep only instances of the same type
        if (this.lastRenderType && this.lastRenderType !== renderType) {
            await AbstractRenderer_1.AbstractRenderer.resetPlatformBrowserDynamic();
            clearRootHTMLElement(renderType);
            this.rendererMap.clear();
        }
        if (!this.rendererMap.has(storyId)) {
            this.rendererMap.set(storyId, this.buildRenderer(storyId, renderType));
        }
        this.lastRenderType = renderType;
        return this.rendererMap.get(storyId);
    }
    buildRenderer(storyId, renderType) {
        if (renderType === 'docs') {
            return new DocsRenderer_1.DocsRenderer(storyId);
        }
        return new CanvasRenderer_1.CanvasRenderer(storyId);
    }
}
exports.RendererFactory = RendererFactory;
const getRenderType = (targetDOMNode) => {
    return targetDOMNode.id === 'storybook-root' ? 'canvas' : 'docs';
};
exports.getRenderType = getRenderType;
function clearRootHTMLElement(renderType) {
    switch (renderType) {
        case 'canvas':
            global.document.getElementById('storybook-docs').innerHTML = '';
            break;
        case 'docs':
            global.document.getElementById('storybook-root').innerHTML = '';
            break;
        default:
            break;
    }
}
exports.clearRootHTMLElement = clearRootHTMLElement;
