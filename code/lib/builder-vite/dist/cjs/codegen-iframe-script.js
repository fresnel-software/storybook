"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateIframeScriptCode = generateIframeScriptCode;

var _path = require("path");

var _coreCommon = require("@storybook/core-common");

var _virtualFileNames = require("./virtual-file-names");

var _transformAbsPath = require("./utils/transform-abs-path");

async function generateIframeScriptCode(options) {
  const {
    presets
  } = options;
  const frameworkName = await (0, _coreCommon.getFrameworkName)(options);
  const previewAnnotations = await presets.apply('previewAnnotations', [], options);
  const resolvedPreviewAnnotations = previewAnnotations.map(entry => (0, _path.isAbsolute)(entry) ? entry : (0, _path.resolve)(entry));
  const configEntries = [...resolvedPreviewAnnotations].filter(Boolean);

  const absoluteFilesToImport = (files, name) => files.map((el, i) => `import ${name ? `* as ${name}_${i} from ` : ''}'${(0, _transformAbsPath.transformAbsPath)(el)}'`).join('\n');

  const importArray = (name, length) => new Array(length).fill(0).map((_, i) => `${name}_${i}`); // noinspection UnnecessaryLocalVariableJS

  /** @todo Inline variable and remove `noinspection` */
  // language=JavaScript


  const code = `
    // Ensure that the client API is initialized by the framework before any other iframe code
    // is loaded. That way our client-apis can assume the existence of the API+store
    import { configure } from '${frameworkName}';

    import * as clientApi from "@storybook/client-api";
    import { logger } from '@storybook/client-logger';
    ${absoluteFilesToImport(configEntries, 'config')}
    import * as preview from '${_virtualFileNames.virtualPreviewFile}';
    import { configStories } from '${_virtualFileNames.virtualStoriesFile}';

    const {
      addDecorator,
      addParameters,
      addLoader,
      addArgTypesEnhancer,
      addArgsEnhancer,
      setGlobalRender,
    } = clientApi;

    const configs = [${importArray('config', configEntries.length).concat('preview.default').join(',')}].filter(Boolean)

    configs.forEach(config => {
      Object.keys(config).forEach((key) => {
        const value = config[key];
        switch (key) {
          case 'args': {
            if (typeof clientApi.addArgs !== "undefined") {
              return clientApi.addArgs(value);
            } else {
              return logger.warn(
                "Could not add global args. Please open an issue in storybookjs/builder-vite."
              );
            }
          }
          case 'argTypes': {
            if (typeof clientApi.addArgTypes !== "undefined") {
              return clientApi.addArgTypes(value);
            } else {
              return logger.warn(
                "Could not add global argTypes. Please open an issue in storybookjs/builder-vite."
              );
            }
          }
          case 'decorators': {
            return value.forEach((decorator) => addDecorator(decorator, false));
          }
          case 'loaders': {
            return value.forEach((loader) => addLoader(loader, false));
          }
          case 'parameters': {
            return addParameters({ ...value }, false);
          }
          case 'argTypesEnhancers': {
            return value.forEach((enhancer) => addArgTypesEnhancer(enhancer));
          }
          case 'argsEnhancers': {
            return value.forEach((enhancer) => addArgsEnhancer(enhancer))
          }
          case 'render': {
            return setGlobalRender(value)
          }
          case 'globals':
          case 'globalTypes': {
            const v = {};
            v[key] = value;
            return addParameters(v, false);
          }
          case 'decorateStory':
          case 'applyDecorators':
          case 'renderToDOM': {
            return null; // This key is not handled directly in v6 mode.
          }
          default: {
            // eslint-disable-next-line prefer-template
            return console.log(key + ' was not supported :( !');
          }
        }
      });
    })
    
    /* TODO: not quite sure what to do with this, to fix HMR
    if (import.meta.hot) {
        import.meta.hot.accept();    
    }
    */

    configStories(configure);
    `.trim();
  return code;
}