"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-unresolved
const rax_test_renderer_1 = __importDefault(require("rax-test-renderer"));
function getRenderedTree(story, context, { renderer, ...rendererOptions }) {
    const storyElement = story.render();
    const currentRenderer = renderer || rax_test_renderer_1.default.create;
    const tree = currentRenderer(storyElement, rendererOptions);
    return tree;
}
exports.default = getRenderedTree;
