import type { InlineConfig as ViteInlineConfig, PluginOption } from 'vite';
import type { ExtendedOptions } from './types';
export declare type PluginConfigType = 'build' | 'development';
export declare function readPackageJson(): Record<string, any> | false;
export declare function commonConfig(options: ExtendedOptions, _type: PluginConfigType): Promise<ViteInlineConfig>;
export declare function pluginConfig(options: ExtendedOptions): Promise<PluginOption[]>;
