import { build as viteBuild } from 'vite';
import { commonConfig } from './vite-config';
export async function build(options) {
  const {
    presets
  } = options;
  const config = await commonConfig(options, 'build');
  config.build = {
    outDir: options.outputDir,
    emptyOutDir: false,
    // do not clean before running Vite build - Storybook has already added assets in there!
    sourcemap: true
  };
  const finalConfig = await presets.apply('viteFinal', config, options);
  await viteBuild(finalConfig);
}