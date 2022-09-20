"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.ActionLogger = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _reactInspector = require("react-inspector");

var _components = require("@storybook/components");

var _style = require("./style");

const _excluded = ["theme"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const UnstyledWrapped = ({
  children,
  className
}) => /*#__PURE__*/_react.default.createElement(_components.ScrollArea, {
  horizontal: true,
  vertical: true,
  className: className
}, children);

const Wrapper = (0, _theming.styled)(UnstyledWrapped)({
  margin: 0,
  padding: '10px 5px 20px'
});
exports.Wrapper = Wrapper;
const ThemedInspector = (0, _theming.withTheme)(_ref => {
  let {
    theme
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement(_reactInspector.Inspector, _extends({
    theme: theme.addonActionsTheme || 'chromeLight',
    table: false
  }, props));
});

const ActionLogger = ({
  actions,
  onClear
}) => /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(Wrapper, null, actions.map(action => /*#__PURE__*/_react.default.createElement(_style.Action, {
  key: action.id
}, action.count > 1 && /*#__PURE__*/_react.default.createElement(_style.Counter, null, action.count), /*#__PURE__*/_react.default.createElement(_style.InspectorContainer, null, /*#__PURE__*/_react.default.createElement(ThemedInspector, {
  sortObjectKeys: true,
  showNonenumerable: false,
  name: action.data.name,
  data: action.data.args || action.data
}))))), /*#__PURE__*/_react.default.createElement(_components.ActionBar, {
  actionItems: [{
    title: 'Clear',
    onClick: onClear
  }]
}));

exports.ActionLogger = ActionLogger;