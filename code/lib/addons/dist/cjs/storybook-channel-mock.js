"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockChannel = mockChannel;

var _channels = require("@storybook/channels");

function mockChannel() {
  const transport = {
    setHandler: () => {},
    send: () => {}
  };
  return new _channels.Channel({
    transport
  });
}