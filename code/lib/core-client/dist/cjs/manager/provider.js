"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _global = _interopRequireDefault(require("global"));

var _ui = require("@storybook/ui");

var _addons = require("@storybook/addons");

var postMessage = _interopRequireWildcard(require("@storybook/channel-postmessage"));

var webSocket = _interopRequireWildcard(require("@storybook/channel-websocket"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  FEATURES,
  SERVER_CHANNEL_URL
} = _global.default;

class ReactProvider extends _ui.Provider {
  constructor() {
    super();
    this.addons = void 0;
    this.channel = void 0;
    this.serverChannel = void 0;
    const channel = postMessage.createChannel({
      page: 'manager'
    });

    _addons.addons.setChannel(channel);

    channel.emit(_coreEvents.default.CHANNEL_CREATED);
    this.addons = _addons.addons;
    this.channel = channel;

    if (FEATURES !== null && FEATURES !== void 0 && FEATURES.storyStoreV7 && SERVER_CHANNEL_URL) {
      const serverChannel = webSocket.createChannel({
        url: SERVER_CHANNEL_URL
      });
      this.serverChannel = serverChannel;

      _addons.addons.setServerChannel(this.serverChannel);
    }
  }

  getElements(type) {
    return this.addons.getElements(type);
  }

  getConfig() {
    return this.addons.getConfig();
  }

  handleAPI(api) {
    this.addons.loadAddons(api);
  }

}

exports.default = ReactProvider;