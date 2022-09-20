"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventMetadata = void 0;

var _clientLogger = require("@storybook/client-logger");

var _refs = require("../modules/refs");

const getEventMetadata = (context, fullAPI) => {
  const {
    source,
    refId,
    type
  } = context;
  const [sourceType, sourceLocation] = (0, _refs.getSourceType)(source, refId);
  const ref = refId && fullAPI.getRefs()[refId] ? fullAPI.getRefs()[refId] : fullAPI.findRef(sourceLocation);
  const meta = {
    source,
    sourceType,
    sourceLocation,
    refId,
    ref,
    type
  };

  switch (true) {
    case typeof refId === 'string':
    case sourceType === 'local':
    case sourceType === 'external':
      {
        return meta;
      }
    // if we couldn't find the source, something risky happened, we ignore the input, and log a warning

    default:
      {
        _clientLogger.logger.warn(`Received a ${type} frame that was not configured as a ref`);

        return null;
      }
  }
};

exports.getEventMetadata = getEventMetadata;