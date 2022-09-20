"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStorySortParameter = void 0;

var t = _interopRequireWildcard(require("@babel/types"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var _generator = _interopRequireDefault(require("@babel/generator"));

var _tsDedent = require("ts-dedent");

var _babelParse = require("./babelParse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const logger = console;

const getValue = (obj, key) => {
  let value;
  obj.properties.forEach(p => {
    if (t.isIdentifier(p.key) && p.key.name === key) {
      value = p.value;
    }
  });
  return value;
};

const parseValue = expr => {
  if (t.isArrayExpression(expr)) {
    return expr.elements.map(o => {
      return parseValue(o);
    });
  }

  if (t.isObjectExpression(expr)) {
    return expr.properties.reduce((acc, p) => {
      if (t.isIdentifier(p.key)) {
        acc[p.key.name] = parseValue(p.value);
      }

      return acc;
    }, {});
  }

  if (t.isLiteral(expr)) {
    // @ts-expect-error (Converted from ts-ignore)
    return expr.value;
  }

  throw new Error(`Unknown node type ${expr}`);
};

const unsupported = (unexpectedVar, isError) => {
  const message = (0, _tsDedent.dedent)`
    Unexpected '${unexpectedVar}'. Parameter 'options.storySort' should be defined inline e.g.:

    export const parameters = {
      options: {
        storySort: <array | object | function>
      }
    }
  `;

  if (isError) {
    throw new Error(message);
  } else {
    logger.info(message);
  }
};

const getStorySortParameter = previewCode => {
  let storySort;
  const ast = (0, _babelParse.babelParse)(previewCode);
  (0, _traverse.default)(ast, {
    ExportNamedDeclaration: {
      enter({
        node
      }) {
        if (t.isVariableDeclaration(node.declaration)) {
          node.declaration.declarations.forEach(decl => {
            if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id)) {
              const {
                name: exportName
              } = decl.id;

              if (exportName === 'parameters') {
                const paramsObject = t.isTSAsExpression(decl.init) ? decl.init.expression : decl.init;

                if (t.isObjectExpression(paramsObject)) {
                  const options = getValue(paramsObject, 'options');

                  if (options) {
                    if (t.isObjectExpression(options)) {
                      storySort = getValue(options, 'storySort');
                    } else {
                      unsupported('options', true);
                    }
                  }
                } else {
                  unsupported('parameters', true);
                }
              }
            }
          });
        } else {
          node.specifiers.forEach(spec => {
            if (t.isIdentifier(spec.exported) && spec.exported.name === 'parameters') {
              unsupported('parameters', false);
            }
          });
        }
      }

    }
  });
  if (!storySort) return undefined;

  if (t.isArrowFunctionExpression(storySort)) {
    const {
      code: sortCode
    } = (0, _generator.default)(storySort, {}); // eslint-disable-next-line no-eval

    return (0, eval)(sortCode);
  }

  if (t.isFunctionExpression(storySort)) {
    const {
      code: sortCode
    } = (0, _generator.default)(storySort, {});
    const functionName = storySort.id.name; // Wrap the function within an arrow function, call it, and return

    const wrapper = `(a, b) => {
      ${sortCode};
      return ${functionName}(a, b)
    }`; // eslint-disable-next-line no-eval

    return (0, eval)(wrapper);
  }

  if (t.isLiteral(storySort) || t.isArrayExpression(storySort) || t.isObjectExpression(storySort)) {
    return parseValue(storySort);
  }

  return unsupported('storySort', true);
};

exports.getStorySortParameter = getStorySortParameter;