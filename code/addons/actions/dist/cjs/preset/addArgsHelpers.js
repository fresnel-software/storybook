"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inferActionsFromArgTypesRegex = exports.addActionsFromArgTypes = void 0;

var _index = require("../index");

// interface ActionsParameter {
//   disable?: boolean;
//   argTypesRegex?: RegExp;
// }
const isInInitialArgs = (name, initialArgs) => typeof initialArgs[name] === 'undefined' && !(name in initialArgs);
/**
 * Automatically add action args for argTypes whose name
 * matches a regex, such as `^on.*` for react-style `onClick` etc.
 */


const inferActionsFromArgTypesRegex = context => {
  const {
    initialArgs,
    argTypes,
    parameters: {
      actions
    }
  } = context;

  if (!actions || actions.disable || !actions.argTypesRegex || !argTypes) {
    return {};
  }

  const argTypesRegex = new RegExp(actions.argTypesRegex);
  const argTypesMatchingRegex = Object.entries(argTypes).filter(([name]) => !!argTypesRegex.test(name));
  return argTypesMatchingRegex.reduce((acc, [name, argType]) => {
    if (isInInitialArgs(name, initialArgs)) {
      acc[name] = (0, _index.action)(name);
    }

    return acc;
  }, {});
};
/**
 * Add action args for list of strings.
 */


exports.inferActionsFromArgTypesRegex = inferActionsFromArgTypesRegex;

const addActionsFromArgTypes = context => {
  const {
    initialArgs,
    argTypes,
    parameters: {
      actions
    }
  } = context;

  if (actions !== null && actions !== void 0 && actions.disable || !argTypes) {
    return {};
  }

  const argTypesWithAction = Object.entries(argTypes).filter(([name, argType]) => !!argType.action);
  return argTypesWithAction.reduce((acc, [name, argType]) => {
    if (isInInitialArgs(name, initialArgs)) {
      acc[name] = (0, _index.action)(typeof argType.action === 'string' ? argType.action : name);
    }

    return acc;
  }, {});
};

exports.addActionsFromArgTypes = addActionsFromArgTypes;