/* eslint-disable no-param-reassign */
import { STORIES_COLLAPSE_ALL, STORIES_EXPAND_ALL } from '@storybook/core-events';
export const init = ({
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
      if (data?.options?.target && data.options.target !== 'storybook-preview-iframe' && !data.options.target.startsWith('storybook-ref-')) {
        data.options.target = data.options.target !== 'storybook_internal' ? `storybook-ref-${data.options.target}` : 'storybook-preview-iframe';
      }

      provider.channel.emit(type, data, ...args);
    },
    collapseAll: () => {
      provider.channel.emit(STORIES_COLLAPSE_ALL, {});
    },
    expandAll: () => {
      api.emit(STORIES_EXPAND_ALL);
    }
  };
  return {
    api,
    state: {}
  };
};