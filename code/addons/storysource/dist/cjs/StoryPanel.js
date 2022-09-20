"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoryPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _router = require("@storybook/router");

var _components = require("@storybook/components");

var _reactSyntaxHighlighter = require("react-syntax-highlighter");

const _excluded = ["properties"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const StyledStoryLink = (0, _theming.styled)(_router.Link)(({
  theme
}) => ({
  display: 'block',
  textDecoration: 'none',
  borderRadius: theme.appBorderRadius,
  color: 'inherit',
  '&:hover': {
    background: theme.background.hoverable
  }
}));

const SelectedStoryHighlight = _theming.styled.div(({
  theme
}) => ({
  background: theme.background.hoverable,
  borderRadius: theme.appBorderRadius
}));

const StyledSyntaxHighlighter = (0, _theming.styled)(_components.SyntaxHighlighter)(({
  theme
}) => ({
  fontSize: theme.typography.size.s2 - 1
}));

const areLocationsEqual = (a, b) => a.startLoc.line === b.startLoc.line && a.startLoc.col === b.startLoc.col && a.endLoc.line === b.endLoc.line && a.endLoc.col === b.endLoc.col;

const StoryPanel = ({
  api
}) => {
  const story = api.getCurrentStoryData();

  const selectedStoryRef = _react.default.useRef(null);

  const {
    source,
    locationsMap
  } = (0, _api.useParameter)('storySource', {
    source: 'loading source...'
  });
  const currentLocation = locationsMap ? locationsMap[Object.keys(locationsMap).find(key => {
    const sourceLoaderId = key.split('--');
    return story.id.endsWith(sourceLoaderId[sourceLoaderId.length - 1]);
  })] : undefined;

  _react.default.useEffect(() => {
    if (selectedStoryRef.current) {
      selectedStoryRef.current.scrollIntoView();
    }
  }, [selectedStoryRef.current]);

  const createPart = ({
    rows,
    stylesheet,
    useInlineStyles
  }) => rows.map((node, i) => (0, _reactSyntaxHighlighter.createElement)({
    node,
    stylesheet,
    useInlineStyles,
    key: `code-segment${i}`
  }));

  const createStoryPart = ({
    rows,
    stylesheet,
    useInlineStyles,
    location,
    id,
    refId
  }) => {
    const first = location.startLoc.line - 1;
    const last = location.endLoc.line;
    const storyRows = rows.slice(first, last);
    const storySource = createPart({
      rows: storyRows,
      stylesheet,
      useInlineStyles
    });
    const storyKey = `${first}-${last}`;

    if (currentLocation && areLocationsEqual(location, currentLocation)) {
      return /*#__PURE__*/_react.default.createElement(SelectedStoryHighlight, {
        key: storyKey,
        ref: selectedStoryRef
      }, storySource);
    }

    return /*#__PURE__*/_react.default.createElement(StyledStoryLink, {
      to: refId ? `/story/${refId}_${id}` : `/story/${id}`,
      key: storyKey
    }, storySource);
  };

  const createParts = ({
    rows,
    stylesheet,
    useInlineStyles
  }) => {
    const parts = [];
    let lastRow = 0;
    Object.keys(locationsMap).forEach(key => {
      const location = locationsMap[key];
      const first = location.startLoc.line - 1;
      const last = location.endLoc.line;
      const {
        title,
        refId
      } = story; // source loader ids are different from story id

      const sourceIdParts = key.split('--');
      const id = api.storyId(title, sourceIdParts[sourceIdParts.length - 1]);
      const start = createPart({
        rows: rows.slice(lastRow, first),
        stylesheet,
        useInlineStyles
      });
      const storyPart = createStoryPart({
        rows,
        stylesheet,
        useInlineStyles,
        location,
        id,
        refId
      });
      parts.push(start);
      parts.push(storyPart);
      lastRow = last;
    });
    const lastPart = createPart({
      rows: rows.slice(lastRow),
      stylesheet,
      useInlineStyles
    });
    parts.push(lastPart);
    return parts;
  };

  const lineRenderer = ({
    rows,
    stylesheet,
    useInlineStyles
  }) => {
    // because of the usage of lineRenderer, all lines will be wrapped in a span
    // these spans will receive all classes on them for some reason
    // which makes colours cascade incorrectly
    // this removed that list of classnames
    const myrows = rows.map(_ref => {
      let rest = _objectWithoutPropertiesLoose(_ref, _excluded);

      return Object.assign({}, rest, {
        properties: {
          className: []
        }
      });
    });

    if (!locationsMap || !Object.keys(locationsMap).length) {
      return createPart({
        rows: myrows,
        stylesheet,
        useInlineStyles
      });
    }

    const parts = createParts({
      rows: myrows,
      stylesheet,
      useInlineStyles
    });
    return /*#__PURE__*/_react.default.createElement("span", null, parts);
  };

  return story ? /*#__PURE__*/_react.default.createElement(StyledSyntaxHighlighter, {
    language: "jsx",
    showLineNumbers: true,
    renderer: lineRenderer,
    format: false,
    copyable: false,
    padded: true
  }, source) : null;
};

exports.StoryPanel = StoryPanel;