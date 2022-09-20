import type { UserConfig } from 'vite';
import type { EnvsRaw } from './types';
/**
 * Customized version of stringifyProcessEnvs from @storybook/core-common which
 * uses import.meta.env instead of process.env and checks for allowed variables.
 */
export declare function stringifyProcessEnvs(raw: EnvsRaw, envPrefix: UserConfig['envPrefix']): EnvsRaw;
