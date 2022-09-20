"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanPaths = cleanPaths;
exports.sanitizeError = sanitizeError;

var _path = require("path");

/* eslint-disable no-param-reassign */
// Removes all user paths
function regexpEscape(str) {
  return str.replace(/[-[/{}()*+?.\\^$|]/g, `\\$&`);
}

function cleanPaths(str, separator = _path.sep) {
  if (!str) return str;
  const stack = process.cwd().split(separator);

  while (stack.length > 1) {
    const currentPath = stack.join(separator);
    const currentRegex = new RegExp(regexpEscape(currentPath), `g`);
    str = str.replace(currentRegex, `$SNIP`);
    const currentPath2 = stack.join(separator + separator);
    const currentRegex2 = new RegExp(regexpEscape(currentPath2), `g`);
    str = str.replace(currentRegex2, `$SNIP`);
    stack.pop();
  }

  return str;
} // Takes an Error and returns a sanitized JSON String


function sanitizeError(error, pathSeparator = _path.sep) {
  // Hack because Node
  error = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))); // Removes all user paths

  const errorString = cleanPaths(JSON.stringify(error), pathSeparator);
  return JSON.parse(errorString);
}