"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withActions = void 0;

var _global = _interopRequireDefault(require("global"));

var _addons = require("@storybook/addons");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = require("ts-dedent");

var _actions = require("./actions");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Based on http://backbonejs.org/docs/backbone.html#section-164
const {
  document,
  Element
} = _global.default;
const delegateEventSplitter = /^(\S+)\s*(.*)$/;
const isIE = Element != null && !Element.prototype.matches;
const matchesMethod = isIE ? 'msMatchesSelector' : 'matches';

const hasMatchInAncestry = (element, selector) => {
  if (element[matchesMethod](selector)) {
    return true;
  }

  const parent = element.parentElement;

  if (!parent) {
    return false;
  }

  return hasMatchInAncestry(parent, selector);
};

const createHandlers = (actionsFn, ...handles) => {
  const actionsObject = actionsFn(...handles);
  return Object.entries(actionsObject).map(([key, action]) => {
    const [_, eventName, selector] = key.match(delegateEventSplitter) || [];
    return {
      eventName,
      handler: e => {
        if (!selector || hasMatchInAncestry(e.target, selector)) {
          action(e);
        }
      }
    };
  });
};

const applyEventHandlers = (0, _utilDeprecate.default)((actionsFn, ...handles) => {
  const root = document && document.getElementById('storybook-root');
  (0, _addons.useEffect)(() => {
    if (root != null) {
      const handlers = createHandlers(actionsFn, ...handles);
      handlers.forEach(({
        eventName,
        handler
      }) => root.addEventListener(eventName, handler));
      return () => handlers.forEach(({
        eventName,
        handler
      }) => root.removeEventListener(eventName, handler));
    }

    return undefined;
  }, [root, actionsFn, handles]);
}, (0, _tsDedent.dedent)`
    withActions(options) is deprecated, please configure addon-actions using the addParameter api:

    addParameters({
      actions: {
        handles: options
      },
    });
  `);

const applyDeprecatedOptions = (actionsFn, options) => {
  if (options) {
    applyEventHandlers(actionsFn, options);
  }
};

const withActions = (0, _addons.makeDecorator)({
  name: 'withActions',
  parameterName: _constants.PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, {
    parameters,
    options
  }) => {
    applyDeprecatedOptions(_actions.actions, options);
    if (parameters && parameters.handles) applyEventHandlers(_actions.actions, ...parameters.handles);
    return getStory(context);
  }
});
exports.withActions = withActions;