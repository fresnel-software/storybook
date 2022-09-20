"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderToDOM = renderToDOM;

var _global = _interopRequireDefault(require("global"));

var _tsDedent = require("ts-dedent");

var _component = _interopRequireDefault(require("@ember/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-expect-error (Converted from ts-ignore)
const {
  window: globalWindow,
  document
} = _global.default;
const rootEl = document.getElementById('storybook-root');

const config = globalWindow.require(`${globalWindow.STORYBOOK_NAME}/config/environment`);

const app = globalWindow.require(`${globalWindow.STORYBOOK_NAME}/app`).default.create(Object.assign({
  autoboot: false,
  rootElement: rootEl
}, config.APP));

let lastPromise = app.boot();
let hasRendered = false;
let isRendering = false;

function render(options, el) {
  if (isRendering) return;
  isRendering = true;
  const {
    template,
    context = {},
    element
  } = options;

  if (hasRendered) {
    lastPromise = lastPromise.then(instance => instance.destroy());
  }

  lastPromise = lastPromise.then(() => {
    const appInstancePrivate = app.buildInstance();
    return appInstancePrivate.boot().then(() => appInstancePrivate);
  }).then(instance => {
    instance.register('component:story-mode', _component.default.extend(Object.assign({
      layout: template || options
    }, context)));
    const component = instance.lookup('component:story-mode');

    if (element) {
      component.appendTo(element);
      element.appendTo(el);
    } else {
      component.appendTo(el);
    }

    hasRendered = true;
    isRendering = false;
    return instance;
  });
}

function renderToDOM({
  storyFn,
  kind,
  name,
  showMain,
  showError
}, domElement) {
  const element = storyFn();

  if (!element) {
    showError({
      title: `Expecting a Ember element from the story: "${name}" of "${kind}".`,
      description: (0, _tsDedent.dedent)`
        Did you forget to return the Ember element from the story?
        Use "() => hbs('{{component}}')" or "() => { return {
          template: hbs\`{{component}}\`
        } }" when defining the story.
      `
    });
    return;
  }

  showMain();
  render(element, domElement);
}