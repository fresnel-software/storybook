import webpack from 'webpack';
import type { PresetOptions } from './preset-options';
export declare function webpackFinal(baseConfig: webpack.Configuration, options: PresetOptions): Promise<webpack.Configuration>;
