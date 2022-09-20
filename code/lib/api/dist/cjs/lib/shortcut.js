"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortcutToHumanString = exports.shortcutMatchesShortcut = exports.optionOrAltSymbol = exports.keyToSymbol = exports.isShortcutTaken = exports.isMacLike = exports.eventToShortcut = exports.eventMatchesShortcut = exports.controlOrMetaSymbol = exports.controlOrMetaKey = void 0;

var _global = _interopRequireDefault(require("global"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  navigator
} = _global.default;

const isMacLike = () => navigator && navigator.platform ? !!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) : false;

exports.isMacLike = isMacLike;

const controlOrMetaSymbol = () => isMacLike() ? '⌘' : 'ctrl';

exports.controlOrMetaSymbol = controlOrMetaSymbol;

const controlOrMetaKey = () => isMacLike() ? 'meta' : 'control';

exports.controlOrMetaKey = controlOrMetaKey;

const optionOrAltSymbol = () => isMacLike() ? '⌥' : 'alt';

exports.optionOrAltSymbol = optionOrAltSymbol;

const isShortcutTaken = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2); // Map a keyboard event to a keyboard shortcut
// NOTE: if we change the fields on the event that we need, we'll need to update the serialization in core/preview/start.js


exports.isShortcutTaken = isShortcutTaken;

const eventToShortcut = e => {
  // Meta key only doesn't map to a shortcut
  if (['Meta', 'Alt', 'Control', 'Shift'].includes(e.key)) {
    return null;
  }

  const keys = [];

  if (e.altKey) {
    keys.push('alt');
  }

  if (e.ctrlKey) {
    keys.push('control');
  }

  if (e.metaKey) {
    keys.push('meta');
  }

  if (e.shiftKey) {
    keys.push('shift');
  }

  if (e.key && e.key.length === 1 && e.key !== ' ') {
    keys.push(e.key.toUpperCase());
  }

  if (e.key === ' ') {
    keys.push('space');
  }

  if (e.key === 'Escape') {
    keys.push('escape');
  }

  if (e.key === 'ArrowRight') {
    keys.push('ArrowRight');
  }

  if (e.key === 'ArrowDown') {
    keys.push('ArrowDown');
  }

  if (e.key === 'ArrowUp') {
    keys.push('ArrowUp');
  }

  if (e.key === 'ArrowLeft') {
    keys.push('ArrowLeft');
  }

  return keys.length > 0 ? keys : null;
};

exports.eventToShortcut = eventToShortcut;

const shortcutMatchesShortcut = (inputShortcut, shortcut) => {
  if (!inputShortcut || !shortcut) return false;
  if (inputShortcut.join('') === 'shift/') inputShortcut.shift(); // shift is optional for `/`

  if (inputShortcut.length !== shortcut.length) return false;
  return !inputShortcut.find((key, i) => key !== shortcut[i]);
}; // Should this keyboard event trigger this keyboard shortcut?


exports.shortcutMatchesShortcut = shortcutMatchesShortcut;

const eventMatchesShortcut = (e, shortcut) => {
  return shortcutMatchesShortcut(eventToShortcut(e), shortcut);
};

exports.eventMatchesShortcut = eventMatchesShortcut;

const keyToSymbol = key => {
  if (key === 'alt') {
    return optionOrAltSymbol();
  }

  if (key === 'control') {
    return '⌃';
  }

  if (key === 'meta') {
    return '⌘';
  }

  if (key === 'shift') {
    return '⇧​';
  }

  if (key === 'Enter' || key === 'Backspace' || key === 'Esc') {
    return '';
  }

  if (key === 'escape') {
    return '';
  }

  if (key === ' ') {
    return 'SPACE';
  }

  if (key === 'ArrowUp') {
    return '↑';
  }

  if (key === 'ArrowDown') {
    return '↓';
  }

  if (key === 'ArrowLeft') {
    return '←';
  }

  if (key === 'ArrowRight') {
    return '→';
  }

  return key.toUpperCase();
}; // Display the shortcut as a human readable string


exports.keyToSymbol = keyToSymbol;

const shortcutToHumanString = shortcut => {
  return shortcut.map(keyToSymbol).join(' ');
};

exports.shortcutToHumanString = shortcutToHumanString;