"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _coreEvents = require("@storybook/core-events");

/* eslint-disable no-param-reassign */
const init = ({
  provider
}) => {
  const api = {
    getChannel: () => provider.channel,
    on: (type, cb) => {
      provider.channel.addListener(type, cb);
      return () => provider.channel.removeListener(type, cb);
    },
    off: (type, cb) => provider.channel.removeListener(type, cb),
    once: (type, cb) => provider.channel.once(type, cb),
    emit: (type, data, ...args) => {
      var _data$options;

      if (data !== null && data !== void 0 && (_data$options = data.options) !== null && _data$options !== void 0 && _data$options.target && data.options.target !== 'storybook-preview-iframe' && !data.options.target.startsWith('storybook-ref-')) {
        data.options.target = data.options.target !== 'storybook_internal' ? `storybook-ref-${data.options.target}` : 'storybook-preview-iframe';
      }

      provider.channel.emit(type, data, ...args);
    },
    collapseAll: () => {
      provider.channel.emit(_coreEvents.STORIES_COLLAPSE_ALL, {});
    },
    expandAll: () => {
      api.emit(_coreEvents.STORIES_EXPAND_ALL);
    }
  };
  return {
    api,
    state: {}
  };
};

exports.init = init;