"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _dequal = require("dequal");

var _coreEvents = require("@storybook/core-events");

var _ActionLogger = require("../../components/ActionLogger");

var _ = require("../..");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const safeDeepEqual = (a, b) => {
  try {
    return (0, _dequal.dequal)(a, b);
  } catch (e) {
    return false;
  }
};

class ActionLogger extends _react.Component {
  constructor(props) {
    super(props);
    this.mounted = void 0;

    this.handleStoryChange = () => {
      const {
        actions
      } = this.state;

      if (actions.length > 0 && actions[0].options.clearOnStoryChange) {
        this.clearActions();
      }
    };

    this.addAction = action => {
      this.setState(prevState => {
        const actions = [...prevState.actions];
        const previous = actions.length && actions[0];

        if (previous && safeDeepEqual(previous.data, action.data)) {
          previous.count++; // eslint-disable-line
        } else {
          action.count = 1; // eslint-disable-line

          actions.unshift(action);
        }

        return {
          actions: actions.slice(0, action.options.limit)
        };
      });
    };

    this.clearActions = () => {
      this.setState({
        actions: []
      });
    };

    this.mounted = false;
    this.state = {
      actions: []
    };
  }

  componentDidMount() {
    this.mounted = true;
    const {
      api
    } = this.props;
    api.on(_.EVENT_ID, this.addAction);
    api.on(_coreEvents.STORY_CHANGED, this.handleStoryChange);
  }

  componentWillUnmount() {
    this.mounted = false;
    const {
      api
    } = this.props;
    api.off(_coreEvents.STORY_CHANGED, this.handleStoryChange);
    api.off(_.EVENT_ID, this.addAction);
  }

  render() {
    const {
      actions = []
    } = this.state;
    const {
      active
    } = this.props;
    const props = {
      actions,
      onClear: this.clearActions
    };
    return active ? /*#__PURE__*/_react.default.createElement(_ActionLogger.ActionLogger, props) : null;
  }

}

exports.default = ActionLogger;