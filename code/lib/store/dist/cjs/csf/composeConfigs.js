"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeConfigs = composeConfigs;
exports.getArrayField = getArrayField;
exports.getField = getField;
exports.getObjectField = getObjectField;
exports.getSingletonField = getSingletonField;

var _parameters = require("../parameters");

var _stepRunners = require("./stepRunners");

function getField(moduleExportList, field) {
  return moduleExportList.map(xs => xs[field]).filter(Boolean);
}

function getArrayField(moduleExportList, field) {
  return getField(moduleExportList, field).reduce((a, b) => [...a, ...b], []);
}

function getObjectField(moduleExportList, field) {
  return Object.assign({}, ...getField(moduleExportList, field));
}

function getSingletonField(moduleExportList, field) {
  return getField(moduleExportList, field).pop();
}

function composeConfigs(moduleExportList) {
  const allArgTypeEnhancers = getArrayField(moduleExportList, 'argTypesEnhancers');
  const stepRunners = getField(moduleExportList, 'runStep');
  return {
    parameters: (0, _parameters.combineParameters)(...getField(moduleExportList, 'parameters')),
    decorators: getArrayField(moduleExportList, 'decorators'),
    args: getObjectField(moduleExportList, 'args'),
    argsEnhancers: getArrayField(moduleExportList, 'argsEnhancers'),
    argTypes: getObjectField(moduleExportList, 'argTypes'),
    argTypesEnhancers: [...allArgTypeEnhancers.filter(e => !e.secondPass), ...allArgTypeEnhancers.filter(e => e.secondPass)],
    globals: getObjectField(moduleExportList, 'globals'),
    globalTypes: getObjectField(moduleExportList, 'globalTypes'),
    loaders: getArrayField(moduleExportList, 'loaders'),
    render: getSingletonField(moduleExportList, 'render'),
    renderToDOM: getSingletonField(moduleExportList, 'renderToDOM'),
    applyDecorators: getSingletonField(moduleExportList, 'applyDecorators'),
    runStep: (0, _stepRunners.composeStepRunners)(stepRunners)
  };
}