"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddonStore = void 0;
Object.defineProperty(exports, "Channel", {
  enumerable: true,
  get: function () {
    return _channels.Channel;
  }
});
exports.addons = void 0;

var _global = _interopRequireDefault(require("global"));

var _channels = require("@storybook/channels");

var _coreEvents = require("@storybook/core-events");

var _clientLogger = require("@storybook/client-logger");

var _storybookChannelMock = require("./storybook-channel-mock");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddonStore {
  constructor() {
    this.loaders = {};
    this.elements = {};
    this.config = {};
    this.channel = void 0;
    this.serverChannel = void 0;
    this.promise = void 0;
    this.resolve = void 0;

    this.getChannel = () => {
      // this.channel should get overwritten by setChannel. If it wasn't called (e.g. in non-browser environment), set a mock instead.
      if (!this.channel) {
        this.setChannel((0, _storybookChannelMock.mockChannel)());
      }

      return this.channel;
    };

    this.getServerChannel = () => {
      if (!this.serverChannel) {
        throw new Error('Accessing non-existent serverChannel');
      }

      return this.serverChannel;
    };

    this.ready = () => this.promise;

    this.hasChannel = () => !!this.channel;

    this.hasServerChannel = () => !!this.serverChannel;

    this.setChannel = channel => {
      this.channel = channel;
      this.resolve();
    };

    this.setServerChannel = channel => {
      this.serverChannel = channel;
    };

    this.getElements = type => {
      if (!this.elements[type]) {
        this.elements[type] = {};
      }

      return this.elements[type];
    };

    this.addPanel = (name, options) => {
      this.add(name, Object.assign({
        type: _types.types.PANEL
      }, options));
    };

    this.add = (name, addon) => {
      const {
        type
      } = addon;
      const collection = this.getElements(type);
      collection[name] = Object.assign({
        id: name
      }, addon);
    };

    this.setConfig = value => {
      Object.assign(this.config, value);

      if (this.hasChannel()) {
        this.getChannel().emit(_coreEvents.SET_CONFIG, value);
      }
    };

    this.getConfig = () => this.config;

    this.register = (name, registerCallback) => {
      if (this.loaders[name]) {
        _clientLogger.logger.warn(`${name} was loaded twice, this could have bad side-effects`);
      }

      this.loaders[name] = registerCallback;
    };

    this.loadAddons = api => {
      Object.values(this.loaders).forEach(value => value(api));
    };

    this.promise = new Promise(res => {
      this.resolve = () => res(this.getChannel());
    });
  }

} // Enforce addons store to be a singleton


exports.AddonStore = AddonStore;
const KEY = '__STORYBOOK_ADDONS';

function getAddonsStore() {
  if (!_global.default[KEY]) {
    _global.default[KEY] = new AddonStore();
  }

  return _global.default[KEY];
} // Exporting this twice in order to to be able to import it like { addons } instead of 'addons'
// prefer import { addons } from '@storybook/addons' over import addons from '@storybook/addons'
//
// See public_api.ts


const addons = getAddonsStore();
exports.addons = addons;