import path from 'path';
export const addons = [require.resolve('./server/framework-preset-babel-ember'), require.resolve('./server/framework-preset-ember-docs')];
export const core = async (config, options) => {
  const framework = await options.presets.apply('framework');
  return Object.assign({}, config, {
    builder: {
      name: path.dirname(require.resolve(path.join('@storybook/builder-webpack5', 'package.json'))),
      options: typeof framework === 'string' ? {} : framework.options.builder || {}
    }
  });
};