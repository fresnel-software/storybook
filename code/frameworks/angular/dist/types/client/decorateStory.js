"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateStory = void 0;
const store_1 = require("@storybook/store");
const ComputesTemplateFromComponent_1 = require("./angular-beta/ComputesTemplateFromComponent");
function decorateStory(mainStoryFn, decorators) {
    const returnDecorators = [cleanArgsDecorator, ...decorators].reduce((previousStoryFn, decorator) => (context) => {
        const decoratedStory = decorator((update) => {
            return previousStoryFn({
                ...context,
                ...(0, store_1.sanitizeStoryContextUpdate)(update),
            });
        }, context);
        return decoratedStory;
    }, (context) => prepareMain(mainStoryFn(context), context));
    return returnDecorators;
}
exports.default = decorateStory;
exports.decorateStory = decorateStory;
const prepareMain = (story, context) => {
    let { template } = story;
    const component = story.component ?? context.component;
    const userDefinedTemplate = !hasNoTemplate(template);
    if (!userDefinedTemplate && component) {
        template = (0, ComputesTemplateFromComponent_1.computesTemplateFromComponent)(component, story.props, '');
    }
    return {
        ...story,
        ...(template ? { template, userDefinedTemplate } : {}),
    };
};
function hasNoTemplate(template) {
    return template === null || template === undefined;
}
const cleanArgsDecorator = (storyFn, context) => {
    if (!context.argTypes || !context.args) {
        return storyFn();
    }
    const argsToClean = context.args;
    context.args = Object.entries(argsToClean).reduce((obj, [key, arg]) => {
        const argType = context.argTypes[key];
        // Only keeps args with a control or an action in argTypes
        if (argType.action || argType.control) {
            return { ...obj, [key]: arg };
        }
        return obj;
    }, {});
    return storyFn();
};