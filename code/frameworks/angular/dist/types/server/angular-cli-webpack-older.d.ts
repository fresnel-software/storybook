import webpack, { Configuration } from 'webpack';
import type { PresetOptions } from './preset-options';
/**
 * Old way currently support version lower than 12.2.x
 */
export declare function getWebpackConfig(baseConfig: webpack.Configuration, options: PresetOptions): Promise<Configuration>;
