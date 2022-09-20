"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendTelemetry = sendTelemetry;

var _isomorphicUnfetch = _interopRequireDefault(require("isomorphic-unfetch"));

var _fetchRetry = _interopRequireDefault(require("fetch-retry"));

var _nanoid = require("nanoid");

var _anonymousId = require("./anonymous-id");

const _excluded = ["payload", "metadata"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const URL = 'https://storybook.js.org/event-log';
const fetch = (0, _fetchRetry.default)(_isomorphicUnfetch.default);
let tasks = []; // getStorybookMetadata -> packagejson + Main.js
// event specific data: sessionId, ip, etc..
// send telemetry

const sessionId = (0, _nanoid.nanoid)();

async function sendTelemetry(data, options = {
  retryDelay: 1000,
  immediate: false
}) {
  // We use this id so we can de-dupe events that arrive at the index multiple times due to the
  // use of retries. There are situations in which the request "5xx"s (or times-out), but
  // the server actually gets the request and stores it anyway.
  // flatten the data before we send it
  const {
    payload,
    metadata
  } = data,
        rest = _objectWithoutPropertiesLoose(data, _excluded);

  const context = {
    anonymousId: (0, _anonymousId.getAnonymousProjectId)(),
    inCI: process.env.CI === 'true'
  };
  const eventId = (0, _nanoid.nanoid)();
  const body = Object.assign({}, rest, {
    eventId,
    sessionId,
    metadata,
    payload,
    context
  });
  let request;

  try {
    request = fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      retries: 3,
      retryOn: [503, 504],
      retryDelay: attempt => 2 ** attempt * (typeof (options === null || options === void 0 ? void 0 : options.retryDelay) === 'number' && !Number.isNaN(options === null || options === void 0 ? void 0 : options.retryDelay) ? options.retryDelay : 1000)
    });
    tasks.push(request);

    if (options.immediate) {
      await Promise.all(tasks);
    } else {
      await request;
    }
  } catch (err) {//
  } finally {
    tasks = tasks.filter(task => task !== request);
  }
}