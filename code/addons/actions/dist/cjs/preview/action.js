"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = action;

var _v = _interopRequireDefault(require("uuid-browser/v4"));

var _addons = require("@storybook/addons");

var _constants = require("../constants");

var _configureActions = require("./configureActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import('react').SyntheticEvent;
const findProto = (obj, callback) => {
  const proto = Object.getPrototypeOf(obj);
  if (!proto || callback(proto)) return proto;
  return findProto(proto, callback);
};

const isReactSyntheticEvent = e => Boolean(typeof e === 'object' && e && findProto(e, proto => /^Synthetic(?:Base)?Event$/.test(proto.constructor.name)) && typeof e.persist === 'function');

const serializeArg = a => {
  if (isReactSyntheticEvent(a)) {
    const e = Object.create( // @ts-expect-error (Converted from ts-ignore)
    a.constructor.prototype, Object.getOwnPropertyDescriptors(a));
    e.persist();
    const viewDescriptor = Object.getOwnPropertyDescriptor(e, 'view'); // don't send the entire window object over.

    const view = viewDescriptor === null || viewDescriptor === void 0 ? void 0 : viewDescriptor.value;

    if (typeof view === 'object' && (view === null || view === void 0 ? void 0 : view.constructor.name) === 'Window') {
      Object.defineProperty(e, 'view', Object.assign({}, viewDescriptor, {
        value: Object.create(view.constructor.prototype)
      }));
    }

    return e;
  }

  return a;
};

function action(name, options = {}) {
  const actionOptions = Object.assign({}, _configureActions.config, options);

  const handler = function actionHandler(...args) {
    const channel = _addons.addons.getChannel();

    const id = (0, _v.default)();
    const minDepth = 5; // anything less is really just storybook internals

    const serializedArgs = args.map(serializeArg);
    const normalizedArgs = args.length > 1 ? serializedArgs : serializedArgs[0];
    const actionDisplayToEmit = {
      id,
      count: 0,
      data: {
        name,
        args: normalizedArgs
      },
      options: Object.assign({}, actionOptions, {
        maxDepth: minDepth + (actionOptions.depth || 3),
        allowFunction: actionOptions.allowFunction || false
      })
    };
    channel.emit(_constants.EVENT_ID, actionDisplayToEmit);
  };

  return handler;
}