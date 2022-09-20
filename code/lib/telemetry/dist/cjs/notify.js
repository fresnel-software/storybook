"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _coreCommon = require("@storybook/core-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TELEMETRY_KEY_NOTIFY_DATE = 'telemetry-notification-date';
const logger = console;

const notify = async () => {
  const telemetryNotifyDate = await _coreCommon.cache.get(TELEMETRY_KEY_NOTIFY_DATE, null); // The end-user has already been notified about our telemetry integration. We
  // don't need to constantly annoy them about it.
  // We will re-inform users about the telemetry if significant changes are
  // ever made.

  if (telemetryNotifyDate) {
    return;
  }

  _coreCommon.cache.set(TELEMETRY_KEY_NOTIFY_DATE, Date.now());

  logger.log();
  logger.log(`${_chalk.default.magenta.bold('attention')} => Storybook now collects completely anonymous telemetry regarding usage.`);
  logger.log(`This information is used to shape Storybook's roadmap and prioritize features.`);
  logger.log(`You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:`);
  logger.log(_chalk.default.cyan('https://storybook.js.org/telemetry'));
  logger.log();
};

exports.notify = notify;