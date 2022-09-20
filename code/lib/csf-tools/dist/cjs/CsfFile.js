"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeCsf = exports.readCsf = exports.loadCsf = exports.formatCsf = exports.NoMetaError = exports.CsfFile = void 0;

require("core-js/modules/es.regexp.flags.js");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _tsDedent = require("ts-dedent");

var t = _interopRequireWildcard(require("@babel/types"));

var _generator = _interopRequireDefault(require("@babel/generator"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var _csf = require("@storybook/csf");

var _babelParse = require("./babelParse");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
const logger = console;

function parseIncludeExclude(prop) {
  if (t.isArrayExpression(prop)) {
    return prop.elements.map(e => {
      if (t.isStringLiteral(e)) return e.value;
      throw new Error(`Expected string literal: ${e}`);
    });
  }

  if (t.isStringLiteral(prop)) return new RegExp(prop.value);
  if (t.isRegExpLiteral(prop)) return new RegExp(prop.pattern, prop.flags);
  throw new Error(`Unknown include/exclude: ${prop}`);
}

const findVarInitialization = (identifier, program) => {
  let init = null;
  let declarations = null;
  program.body.find(node => {
    if (t.isVariableDeclaration(node)) {
      declarations = node.declarations;
    } else if (t.isExportNamedDeclaration(node) && t.isVariableDeclaration(node.declaration)) {
      declarations = node.declaration.declarations;
    }

    return declarations && declarations.find(decl => {
      if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id) && decl.id.name === identifier) {
        init = decl.init;
        return true; // stop looking
      }

      return false;
    });
  });
  return init;
};

const formatLocation = (node, fileName) => {
  const {
    line,
    column
  } = node.loc.start;
  return `${fileName || ''} (line ${line}, col ${column})`.trim();
};

const isArgsStory = (init, parent, csf) => {
  let storyFn = init; // export const Foo = Bar.bind({})

  if (t.isCallExpression(init)) {
    const {
      callee,
      arguments: bindArguments
    } = init;

    if (t.isProgram(parent) && t.isMemberExpression(callee) && t.isIdentifier(callee.object) && t.isIdentifier(callee.property) && callee.property.name === 'bind' && (bindArguments.length === 0 || bindArguments.length === 1 && t.isObjectExpression(bindArguments[0]) && bindArguments[0].properties.length === 0)) {
      const boundIdentifier = callee.object.name;
      const template = findVarInitialization(boundIdentifier, parent);

      if (template) {
        // eslint-disable-next-line no-param-reassign
        csf._templates[boundIdentifier] = template;
        storyFn = template;
      }
    }
  }

  if (t.isArrowFunctionExpression(storyFn)) {
    return storyFn.params.length > 0;
  }

  if (t.isFunctionDeclaration(storyFn)) {
    return storyFn.params.length > 0;
  }

  return false;
};

const parseExportsOrder = init => {
  if (t.isArrayExpression(init)) {
    return init.elements.map(item => {
      if (t.isStringLiteral(item)) {
        return item.value;
      }

      throw new Error(`Expected string literal named export: ${item}`);
    });
  }

  throw new Error(`Expected array of string literals: ${init}`);
};

const sortExports = (exportByName, order) => {
  return order.reduce((acc, name) => {
    const namedExport = exportByName[name];
    if (namedExport) acc[name] = namedExport;
    return acc;
  }, {});
};

class NoMetaError extends Error {
  constructor(ast, fileName) {
    super((0, _tsDedent.dedent)`
      CSF: missing default export ${formatLocation(ast, fileName)}

      More info: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
    `);
    this.name = this.constructor.name;
  }

}

exports.NoMetaError = NoMetaError;

class CsfFile {
  constructor(ast, {
    fileName,
    makeTitle
  }) {
    this._ast = void 0;
    this._fileName = void 0;
    this._makeTitle = void 0;
    this._meta = void 0;
    this._stories = {};
    this._metaAnnotations = {};
    this._storyExports = {};
    this._storyAnnotations = {};
    this._templates = {};
    this._namedExportsOrder = void 0;
    this.imports = void 0;
    this._ast = ast;
    this._fileName = fileName;
    this.imports = [];
    this._makeTitle = makeTitle;
  }

  _parseTitle(value) {
    const node = t.isIdentifier(value) ? findVarInitialization(value.name, this._ast.program) : value;
    if (t.isStringLiteral(node)) return node.value;
    throw new Error((0, _tsDedent.dedent)`
      CSF: unexpected dynamic title ${formatLocation(node, this._fileName)}

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#string-literal-titles
    `);
  }

  _parseMeta(declaration, program) {
    const meta = {};
    declaration.properties.forEach(p => {
      if (t.isIdentifier(p.key)) {
        this._metaAnnotations[p.key.name] = p.value;

        if (p.key.name === 'title') {
          meta.title = this._parseTitle(p.value);
        } else if (['includeStories', 'excludeStories'].includes(p.key.name)) {
          // @ts-expect-error (Converted from ts-ignore)
          meta[p.key.name] = parseIncludeExclude(p.value);
        } else if (p.key.name === 'component') {
          const {
            code
          } = (0, _generator.default)(p.value, {});
          meta.component = code;
        } else if (p.key.name === 'id') {
          if (t.isStringLiteral(p.value)) {
            meta.id = p.value.value;
          } else {
            throw new Error(`Unexpected component id: ${p.value}`);
          }
        }
      }
    });
    this._meta = meta;
  }

  parse() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    (0, _traverse.default)(this._ast, {
      ExportDefaultDeclaration: {
        enter({
          node,
          parent
        }) {
          let metaNode;
          const decl = t.isIdentifier(node.declaration) && t.isProgram(parent) ? findVarInitialization(node.declaration.name, parent) : node.declaration;

          if (t.isObjectExpression(decl)) {
            // export default { ... };
            metaNode = decl;
          } else if ( // export default { ... } as Meta<...>
          t.isTSAsExpression(decl) && t.isObjectExpression(decl.expression)) {
            metaNode = decl.expression;
          }

          if (!self._meta && metaNode && t.isProgram(parent)) {
            self._parseMeta(metaNode, parent);
          }
        }

      },
      ExportNamedDeclaration: {
        enter({
          node,
          parent
        }) {
          let declarations;

          if (t.isVariableDeclaration(node.declaration)) {
            declarations = node.declaration.declarations.filter(d => t.isVariableDeclarator(d));
          } else if (t.isFunctionDeclaration(node.declaration)) {
            declarations = [node.declaration];
          }

          if (declarations) {
            // export const X = ...;
            declarations.forEach(decl => {
              if (t.isIdentifier(decl.id)) {
                const {
                  name: exportName
                } = decl.id;

                if (exportName === '__namedExportsOrder' && t.isVariableDeclarator(decl)) {
                  self._namedExportsOrder = parseExportsOrder(decl.init);
                  return;
                }

                self._storyExports[exportName] = decl;
                let name = (0, _csf.storyNameFromExport)(exportName);

                if (self._storyAnnotations[exportName]) {
                  logger.warn(`Unexpected annotations for "${exportName}" before story declaration`);
                } else {
                  self._storyAnnotations[exportName] = {};
                }

                let parameters;

                if (t.isVariableDeclarator(decl) && t.isObjectExpression(decl.init)) {
                  let __isArgsStory = true; // assume default render is an args story
                  // CSF3 object export

                  decl.init.properties.forEach(p => {
                    if (t.isIdentifier(p.key)) {
                      if (p.key.name === 'render') {
                        __isArgsStory = isArgsStory(p.value, parent, self);
                      } else if (p.key.name === 'name' && t.isStringLiteral(p.value)) {
                        name = p.value.value;
                      } else if (p.key.name === 'storyName' && t.isStringLiteral(p.value)) {
                        logger.warn(`Unexpected usage of "storyName" in "${exportName}". Please use "name" instead.`);
                      }

                      self._storyAnnotations[exportName][p.key.name] = p.value;
                    }
                  });
                  parameters = {
                    __isArgsStory
                  };
                } else {
                  const fn = t.isVariableDeclarator(decl) ? decl.init : decl;
                  parameters = {
                    // __id: toId(self._meta.title, name),
                    // FIXME: Template.bind({});
                    __isArgsStory: isArgsStory(fn, parent, self)
                  };
                }

                self._stories[exportName] = {
                  id: 'FIXME',
                  name,
                  parameters
                };
              }
            });
          } else if (node.specifiers.length > 0) {
            // export { X as Y }
            node.specifiers.forEach(specifier => {
              if (t.isExportSpecifier(specifier) && t.isIdentifier(specifier.exported)) {
                const {
                  name: exportName
                } = specifier.exported;

                if (exportName === 'default') {
                  let metaNode;
                  const decl = t.isProgram(parent) ? findVarInitialization(specifier.local.name, parent) : specifier.local;

                  if (t.isObjectExpression(decl)) {
                    // export default { ... };
                    metaNode = decl;
                  } else if ( // export default { ... } as Meta<...>
                  t.isTSAsExpression(decl) && t.isObjectExpression(decl.expression)) {
                    metaNode = decl.expression;
                  }

                  if (!self._meta && metaNode && t.isProgram(parent)) {
                    self._parseMeta(metaNode, parent);
                  }
                } else {
                  self._storyAnnotations[exportName] = {};
                  self._stories[exportName] = {
                    id: 'FIXME',
                    name: exportName,
                    parameters: {}
                  };
                }
              }
            });
          }
        }

      },
      ExpressionStatement: {
        enter({
          node,
          parent
        }) {
          const {
            expression
          } = node; // B.storyName = 'some string';

          if (t.isProgram(parent) && t.isAssignmentExpression(expression) && t.isMemberExpression(expression.left) && t.isIdentifier(expression.left.object) && t.isIdentifier(expression.left.property)) {
            const exportName = expression.left.object.name;
            const annotationKey = expression.left.property.name;
            const annotationValue = expression.right; // v1-style annotation
            // A.story = { parameters: ..., decorators: ... }

            if (self._storyAnnotations[exportName]) {
              if (annotationKey === 'story' && t.isObjectExpression(annotationValue)) {
                annotationValue.properties.forEach(prop => {
                  if (t.isIdentifier(prop.key)) {
                    self._storyAnnotations[exportName][prop.key.name] = prop.value;
                  }
                });
              } else {
                self._storyAnnotations[exportName][annotationKey] = annotationValue;
              }
            }

            if (annotationKey === 'storyName' && t.isStringLiteral(annotationValue)) {
              const storyName = annotationValue.value;
              const story = self._stories[exportName];
              if (!story) return;
              story.name = storyName;
            }
          }
        }

      },
      CallExpression: {
        enter({
          node
        }) {
          const {
            callee
          } = node;

          if (t.isIdentifier(callee) && callee.name === 'storiesOf') {
            throw new Error((0, _tsDedent.dedent)`
              CSF: unexpected storiesOf call ${formatLocation(node, self._fileName)}

              More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#story-store-v7
            `);
          }
        }

      },
      ImportDeclaration: {
        enter({
          node
        }) {
          const {
            source
          } = node;

          if (t.isStringLiteral(source)) {
            self.imports.push(source.value);
          } else {
            throw new Error('CSF: unexpected import source');
          }
        }

      }
    });

    if (!self._meta) {
      throw new NoMetaError(self._ast, self._fileName);
    }

    if (!self._meta.title && !self._meta.component) {
      throw new Error((0, _tsDedent.dedent)`
        CSF: missing title/component ${formatLocation(self._ast, self._fileName)}

        More info: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
      `);
    } // default export can come at any point in the file, so we do this post processing last


    const entries = Object.entries(self._stories);
    self._meta.title = this._makeTitle(self._meta.title);
    self._stories = entries.reduce((acc, [key, story]) => {
      if ((0, _csf.isExportStory)(key, self._meta)) {
        const id = (0, _csf.toId)(self._meta.id || self._meta.title, (0, _csf.storyNameFromExport)(key));
        const parameters = Object.assign({}, story.parameters, {
          __id: id
        });

        if (entries.length === 1 && key === '__page') {
          parameters.docsOnly = true;
        }

        acc[key] = Object.assign({}, story, {
          id,
          parameters
        });
      }

      return acc;
    }, {});
    Object.keys(self._storyExports).forEach(key => {
      if (!(0, _csf.isExportStory)(key, self._meta)) {
        delete self._storyExports[key];
        delete self._storyAnnotations[key];
      }
    });

    if (self._namedExportsOrder) {
      const unsortedExports = Object.keys(self._storyExports);
      self._storyExports = sortExports(self._storyExports, self._namedExportsOrder);
      self._stories = sortExports(self._stories, self._namedExportsOrder);
      const sortedExports = Object.keys(self._storyExports);

      if (unsortedExports.length !== sortedExports.length) {
        throw new Error(`Missing exports after sort: ${unsortedExports.filter(key => !sortedExports.includes(key))}`);
      }
    }

    return self;
  }

  get meta() {
    return this._meta;
  }

  get stories() {
    return Object.values(this._stories);
  }

}

exports.CsfFile = CsfFile;

const loadCsf = (code, options) => {
  const ast = (0, _babelParse.babelParse)(code);
  return new CsfFile(ast, options);
};

exports.loadCsf = loadCsf;

const formatCsf = csf => {
  const {
    code
  } = (0, _generator.default)(csf._ast, {});
  return code;
};

exports.formatCsf = formatCsf;

const readCsf = async (fileName, options) => {
  const code = (await _fsExtra.default.readFile(fileName, 'utf-8')).toString();
  return loadCsf(code, Object.assign({}, options, {
    fileName
  }));
};

exports.readCsf = readCsf;

const writeCsf = async (csf, fileName) => {
  const fname = fileName || csf._fileName;
  if (!fname) throw new Error('Please specify a fileName for writeCsf');
  await _fsExtra.default.writeFile(fileName, await formatCsf(csf));
};

exports.writeCsf = writeCsf;