"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareStory = prepareStory;

var _tsDedent = require("ts-dedent");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _global = _interopRequireDefault(require("global"));

var _csf = require("@storybook/csf");

var _parameters = require("../parameters");

var _hooks = require("../hooks");

var _decorators = require("../decorators");

var _args = require("../args");

var _getValuesFromArgTypes = require("./getValuesFromArgTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const argTypeDefaultValueWarning = (0, _utilDeprecate.default)(() => {}, (0, _tsDedent.dedent)`
  \`argType.defaultValue\` is deprecated and will be removed in Storybook 7.0.

  https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#no-longer-inferring-default-values-of-args`); // Combine all the metadata about a story (both direct and inherited from the component/global scope)
// into a "renderable" story function, with all decorators applied, parameters passed as context etc
//
// Note that this story function is *stateless* in the sense that it does not track args or globals
// Instead, it is expected these are tracked separately (if necessary) and are passed into each invocation.

function prepareStory(storyAnnotations, componentAnnotations, projectAnnotations) {
  var _global$FEATURES;

  // NOTE: in the current implementation we are doing everything once, up front, rather than doing
  // anything at render time. The assumption is that as we don't load all the stories at once, this
  // will have a limited cost. If this proves misguided, we can refactor it.
  const {
    moduleExport,
    id,
    name
  } = storyAnnotations;
  const {
    title
  } = componentAnnotations;
  const parameters = (0, _parameters.combineParameters)(projectAnnotations.parameters, componentAnnotations.parameters, storyAnnotations.parameters);
  const decorators = [...(storyAnnotations.decorators || []), ...(componentAnnotations.decorators || []), ...(projectAnnotations.decorators || [])]; // Currently it is only possible to set these globally

  const {
    applyDecorators = _decorators.defaultDecorateStory,
    argTypesEnhancers = [],
    argsEnhancers = [],
    runStep
  } = projectAnnotations;
  const loaders = [...(projectAnnotations.loaders || []), ...(componentAnnotations.loaders || []), ...(storyAnnotations.loaders || [])]; // The render function on annotations *has* to be an `ArgsStoryFn`, so when we normalize
  // CSFv1/2, we use a new field called `userStoryFn` so we know that it can be a LegacyStoryFn

  const render = storyAnnotations.userStoryFn || storyAnnotations.render || componentAnnotations.render || projectAnnotations.render;
  if (!render) throw new Error(`No render function available for storyId '${id}'`);
  const passedArgTypes = (0, _parameters.combineParameters)(projectAnnotations.argTypes, componentAnnotations.argTypes, storyAnnotations.argTypes);
  const {
    passArgsFirst = true
  } = parameters; // eslint-disable-next-line no-underscore-dangle

  parameters.__isArgsStory = passArgsFirst && render.length > 0; // Pull out args[X] into initialArgs for argTypes enhancers

  const passedArgs = Object.assign({}, projectAnnotations.args, componentAnnotations.args, storyAnnotations.args);
  const contextForEnhancers = {
    componentId: componentAnnotations.id,
    title,
    kind: title,
    // Back compat
    id,
    name,
    story: name,
    // Back compat
    component: componentAnnotations.component,
    subcomponents: componentAnnotations.subcomponents,
    parameters,
    initialArgs: passedArgs,
    argTypes: passedArgTypes
  };
  contextForEnhancers.argTypes = argTypesEnhancers.reduce((accumulatedArgTypes, enhancer) => enhancer(Object.assign({}, contextForEnhancers, {
    argTypes: accumulatedArgTypes
  })), contextForEnhancers.argTypes); // Add argTypes[X].defaultValue to initial args (note this deprecated)
  // We need to do this *after* the argTypesEnhancers as they may add defaultValues

  const defaultArgs = (0, _getValuesFromArgTypes.getValuesFromArgTypes)(contextForEnhancers.argTypes);

  if (Object.keys(defaultArgs).length > 0) {
    argTypeDefaultValueWarning();
  }

  const initialArgsBeforeEnhancers = Object.assign({}, defaultArgs, passedArgs);
  contextForEnhancers.initialArgs = argsEnhancers.reduce((accumulatedArgs, enhancer) => Object.assign({}, accumulatedArgs, enhancer(Object.assign({}, contextForEnhancers, {
    initialArgs: accumulatedArgs
  }))), initialArgsBeforeEnhancers); // Add some of our metadata into parameters as we used to do this in 6.x and users may be relying on it

  if (!((_global$FEATURES = _global.default.FEATURES) !== null && _global$FEATURES !== void 0 && _global$FEATURES.breakingChangesV7)) {
    contextForEnhancers.parameters = Object.assign({}, contextForEnhancers.parameters, {
      __id: id,
      globals: projectAnnotations.globals,
      globalTypes: projectAnnotations.globalTypes,
      args: contextForEnhancers.initialArgs,
      argTypes: contextForEnhancers.argTypes
    });
  }

  const applyLoaders = async context => {
    const loadResults = await Promise.all(loaders.map(loader => loader(context)));
    const loaded = Object.assign({}, ...loadResults);
    return Object.assign({}, context, {
      loaded
    });
  };

  const undecoratedStoryFn = context => {
    const mappedArgs = Object.entries(context.args).reduce((acc, [key, val]) => {
      var _context$argTypes$key;

      const mapping = (_context$argTypes$key = context.argTypes[key]) === null || _context$argTypes$key === void 0 ? void 0 : _context$argTypes$key.mapping;
      acc[key] = mapping && val in mapping ? mapping[val] : val;
      return acc;
    }, {});
    const includedArgs = Object.entries(mappedArgs).reduce((acc, [key, val]) => {
      const argType = context.argTypes[key] || {};
      if ((0, _csf.includeConditionalArg)(argType, mappedArgs, context.globals)) acc[key] = val;
      return acc;
    }, {});
    const includedContext = Object.assign({}, context, {
      args: includedArgs
    });
    const {
      passArgsFirst: renderTimePassArgsFirst = true
    } = context.parameters;
    return renderTimePassArgsFirst ? render(includedContext.args, includedContext) : render(includedContext);
  };

  const decoratedStoryFn = (0, _hooks.applyHooks)(applyDecorators)(undecoratedStoryFn, decorators);

  const unboundStoryFn = context => {
    var _global$FEATURES2;

    let finalContext = context;

    if ((_global$FEATURES2 = _global.default.FEATURES) !== null && _global$FEATURES2 !== void 0 && _global$FEATURES2.argTypeTargetsV7) {
      const argsByTarget = (0, _args.groupArgsByTarget)(context);
      finalContext = Object.assign({}, context, {
        allArgs: context.args,
        argsByTarget,
        args: argsByTarget[_args.NO_TARGET_NAME] || {}
      });
    }

    return decoratedStoryFn(finalContext);
  };

  const {
    play
  } = storyAnnotations;

  const playFunction = play && (async storyContext => {
    const playFunctionContext = Object.assign({}, storyContext, {
      step: (label, play) => // TODO: We know runStep is defined, we need a proper normalized annotations type
      runStep(label, play, playFunctionContext)
    });
    return play(playFunctionContext);
  });

  return Object.freeze(Object.assign({}, contextForEnhancers, {
    moduleExport,
    originalStoryFn: render,
    undecoratedStoryFn,
    unboundStoryFn,
    applyLoaders,
    playFunction
  }));
}