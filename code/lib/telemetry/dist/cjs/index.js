"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  telemetry: true
};
exports.telemetry = void 0;

var _clientLogger = require("@storybook/client-logger");

var _storybookMetadata = require("./storybook-metadata");

Object.keys(_storybookMetadata).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _storybookMetadata[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _storybookMetadata[key];
    }
  });
});

var _telemetry = require("./telemetry");

var _notify = require("./notify");

var _sanitize = require("./sanitize");

const telemetry = async (eventType, payload = {}, options = {}) => {
  await (0, _notify.notify)();
  const telemetryData = {
    eventType,
    payload
  };

  try {
    telemetryData.metadata = await (0, _storybookMetadata.getStorybookMetadata)(options === null || options === void 0 ? void 0 : options.configDir);
  } catch (error) {
    if (!telemetryData.payload.error) telemetryData.payload.error = error;
  } finally {
    const {
      error
    } = telemetryData.payload;

    if (error) {
      // make sure to anonymise possible paths from error messages
      telemetryData.payload.error = (0, _sanitize.sanitizeError)(error);
    }

    if (!telemetryData.payload.error || options !== null && options !== void 0 && options.enableCrashReports) {
      var _process$env;

      if ((_process$env = process.env) !== null && _process$env !== void 0 && _process$env.STORYBOOK_DEBUG_TELEMETRY) {
        _clientLogger.logger.info('\n[telemetry]');

        _clientLogger.logger.info(JSON.stringify(telemetryData, null, 2));
      } else {
        await (0, _telemetry.sendTelemetry)(telemetryData, options);
      }
    }
  }
};

exports.telemetry = telemetry;