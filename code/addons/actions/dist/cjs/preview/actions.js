"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _action = require("./action");

var _configureActions = require("./configureActions");

const actions = (...args) => {
  let options = _configureActions.config;
  let names = args; // args argument can be a single argument as an array

  if (names.length === 1 && Array.isArray(names[0])) {
    [names] = names;
  } // last argument can be options


  if (names.length !== 1 && typeof names[names.length - 1] !== 'string') {
    options = Object.assign({}, _configureActions.config, names.pop());
  }

  let namesObject = names[0];

  if (names.length !== 1 || typeof namesObject === 'string') {
    namesObject = {};
    names.forEach(name => {
      namesObject[name] = name;
    });
  }

  const actionsObject = {};
  Object.keys(namesObject).forEach(name => {
    actionsObject[name] = (0, _action.action)(namesObject[name], options);
  });
  return actionsObject;
};

exports.actions = actions;