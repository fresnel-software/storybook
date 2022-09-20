export const init = ({
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