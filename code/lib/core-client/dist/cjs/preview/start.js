"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _global = _interopRequireDefault(require("global"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _clientApi = require("@storybook/client-api");

var _previewWeb = require("@storybook/preview-web");

var _channelPostmessage = require("@storybook/channel-postmessage");

var _addons = require("@storybook/addons");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _executeLoadable = require("./executeLoadable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  window: globalWindow,
  FEATURES
} = _global.default;
const configureDeprecationWarning = (0, _utilDeprecate.default)(() => {}, `\`configure()\` is deprecated and will be removed in Storybook 7.0. 
Please use the \`stories\` field of \`main.js\` to load stories.
Read more at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-configure`);

const removedApi = name => () => {
  throw new Error(`@storybook/client-api:${name} was removed in storyStoreV7.`);
};

function start(renderToDOM, {
  decorateStory,
  render
} = {}) {
  if (globalWindow) {
    // To enable user code to detect if it is running in Storybook
    globalWindow.IS_STORYBOOK = true;
  }

  if (FEATURES !== null && FEATURES !== void 0 && FEATURES.storyStoreV7) {
    return {
      forceReRender: removedApi('forceReRender'),
      getStorybook: removedApi('getStorybook'),
      configure: removedApi('configure'),
      clientApi: {
        addDecorator: removedApi('clientApi.addDecorator'),
        addParameters: removedApi('clientApi.addParameters'),
        clearDecorators: removedApi('clientApi.clearDecorators'),
        addLoader: removedApi('clientApi.addLoader'),
        setAddon: removedApi('clientApi.setAddon'),
        getStorybook: removedApi('clientApi.getStorybook'),
        storiesOf: removedApi('clientApi.storiesOf'),
        raw: removedApi('raw')
      }
    };
  }

  const channel = (0, _channelPostmessage.createChannel)({
    page: 'preview'
  });

  _addons.addons.setChannel(channel);

  const clientApi = new _clientApi.ClientApi();
  const preview = new _previewWeb.PreviewWeb();
  let initialized = false;

  const importFn = path => clientApi.importFn(path);

  function onStoriesChanged() {
    const storyIndex = clientApi.getStoryIndex();
    preview.onStoriesChanged({
      storyIndex,
      importFn
    });
  } // These two bits are a bit ugly, but due to dependencies, `ClientApi` cannot have
  // direct reference to `PreviewWeb`, so we need to patch in bits


  clientApi.onImportFnChanged = onStoriesChanged;
  clientApi.storyStore = preview.storyStore;

  if (globalWindow) {
    globalWindow.__STORYBOOK_CLIENT_API__ = clientApi;
    globalWindow.__STORYBOOK_ADDONS_CHANNEL__ = channel; // eslint-disable-next-line no-underscore-dangle

    globalWindow.__STORYBOOK_PREVIEW__ = preview;
    globalWindow.__STORYBOOK_STORY_STORE__ = preview.storyStore;
  }

  return {
    forceReRender: () => channel.emit(_coreEvents.default.FORCE_RE_RENDER),
    getStorybook: () => [],
    raw: () => {},
    clientApi,

    // This gets called each time the user calls configure (i.e. once per HMR)
    // The first time, it constructs the preview, subsequently it updates it
    configure(framework, loadable, m, showDeprecationWarning = true) {
      if (showDeprecationWarning) {
        configureDeprecationWarning();
      }

      clientApi.addParameters({
        framework
      }); // We need to run the `executeLoadableForChanges` function *inside* the `getProjectAnnotations
      // function in case it throws. So we also need to process its output there also

      const getProjectAnnotations = () => {
        const {
          added,
          removed
        } = (0, _executeLoadable.executeLoadableForChanges)(loadable, m);
        Array.from(added.entries()).forEach(([fileName, fileExports]) => clientApi.facade.addStoriesFromExports(fileName, fileExports));
        Array.from(removed.entries()).forEach(([fileName]) => clientApi.facade.clearFilenameExports(fileName));
        return Object.assign({
          render
        }, clientApi.facade.projectAnnotations, {
          renderToDOM,
          applyDecorators: decorateStory
        });
      };

      if (!initialized) {
        preview.initialize({
          getStoryIndex: () => clientApi.getStoryIndex(),
          importFn,
          getProjectAnnotations
        });
        initialized = true;
      } else {
        // TODO -- why don't we care about the new annotations?
        getProjectAnnotations();
        onStoriesChanged();
      }
    }

  };
}