"use strict";

var _react = _interopRequireWildcard(require("react"));

var _addons = require("@storybook/addons");

var _coreEvents = require("@storybook/core-events");

var _ActionLogger = _interopRequireDefault(require("./containers/ActionLogger"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_addons.addons.register(_constants.ADDON_ID, api => {
  _addons.addons.addPanel(_constants.PANEL_ID, {
    title() {
      const [actionsCount, setActionsCount] = (0, _react.useState)(0);

      const onEvent = () => setActionsCount(previous => previous + 1);

      const onChange = () => setActionsCount(0);

      (0, _react.useEffect)(() => {
        api.on(_constants.EVENT_ID, onEvent);
        api.on(_coreEvents.STORY_CHANGED, onChange);
        return () => {
          api.off(_constants.EVENT_ID, onEvent);
          api.off(_coreEvents.STORY_CHANGED, onChange);
        };
      });
      const suffix = actionsCount === 0 ? '' : ` (${actionsCount})`;
      return `Actions${suffix}`;
    },

    type: _addons.types.PANEL,
    render: ({
      active,
      key
    }) => /*#__PURE__*/_react.default.createElement(_ActionLogger.default, {
      key: key,
      api: api,
      active: !!active
    }),
    paramKey: _constants.PARAM_KEY
  });
});