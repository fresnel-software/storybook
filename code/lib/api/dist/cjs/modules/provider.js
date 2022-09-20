"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

const init = ({
  provider,
  fullAPI
}) => {
  return {
    api: provider.renderPreview ? {
      renderPreview: provider.renderPreview
    } : {},
    state: {},
    init: () => {
      provider.handleAPI(fullAPI);
    }
  };
};

exports.init = init;