"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setJSONDoc = exports.getJSONDoc = exports.extractComponentDescription = exports.extractArgTypes = void 0;

/* eslint-disable no-underscore-dangle */

/* global window */
const setJSONDoc = jsondoc => {
  window.__EMBER_GENERATED_DOC_JSON__ = jsondoc;
};

exports.setJSONDoc = setJSONDoc;

const getJSONDoc = () => {
  return window.__EMBER_GENERATED_DOC_JSON__;
};

exports.getJSONDoc = getJSONDoc;

const extractArgTypes = componentName => {
  const json = getJSONDoc();

  if (!(json && json.included)) {
    return null;
  }

  const componentDoc = json.included.find(doc => doc.attributes.name === componentName);

  if (!componentDoc) {
    return null;
  }

  return componentDoc.attributes.arguments.reduce((acc, prop) => {
    acc[prop.name] = {
      name: prop.name,
      defaultValue: prop.defaultValue,
      description: prop.description,
      table: {
        defaultValue: {
          summary: prop.defaultValue
        },
        type: {
          summary: prop.type,
          required: prop.tags.length ? prop.tags.some(tag => tag.name === 'required') : false
        }
      }
    };
    return acc;
  }, {});
};

exports.extractArgTypes = extractArgTypes;

const extractComponentDescription = componentName => {
  const json = getJSONDoc();

  if (!(json && json.included)) {
    return null;
  }

  const componentDoc = json.included.find(doc => doc.attributes.name === componentName);

  if (!componentDoc) {
    return null;
  }

  return componentDoc.attributes.description;
};

exports.extractComponentDescription = extractComponentDescription;