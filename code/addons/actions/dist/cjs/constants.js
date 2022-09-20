"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARAM_KEY = exports.PANEL_ID = exports.EVENT_ID = exports.CYCLIC_KEY = exports.ADDON_ID = void 0;
const PARAM_KEY = 'actions';
exports.PARAM_KEY = PARAM_KEY;
const ADDON_ID = 'storybook/actions';
exports.ADDON_ID = ADDON_ID;
const PANEL_ID = `${ADDON_ID}/panel`;
exports.PANEL_ID = PANEL_ID;
const EVENT_ID = `${ADDON_ID}/action-event`;
exports.EVENT_ID = EVENT_ID;
const CYCLIC_KEY = '$___storybook.isCyclic';
exports.CYCLIC_KEY = CYCLIC_KEY;