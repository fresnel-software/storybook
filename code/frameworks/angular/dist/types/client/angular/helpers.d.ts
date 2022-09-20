import type { PartialStoryFn } from '@storybook/csf';
import type { AngularFramework } from '../types';
declare global {
    interface Window {
        NODE_ENV: 'string' | 'development' | undefined;
    }
}
export declare const renderNgApp: (storyFn: PartialStoryFn<AngularFramework>, forced: boolean) => void;
