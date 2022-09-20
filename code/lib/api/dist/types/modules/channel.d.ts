import { Channel } from '@storybook/channels';
import type { Listener } from '@storybook/channels';
import { ModuleFn } from '../index';
export interface SubAPI {
    getChannel: () => Channel;
    on: (type: string, cb: Listener) => () => void;
    off: (type: string, cb: Listener) => void;
    emit: (type: string, ...args: any[]) => void;
    once: (type: string, cb: Listener) => void;
    collapseAll: () => void;
    expandAll: () => void;
}
export declare type SubState = Record<string, never>;
export declare const init: ModuleFn<SubAPI, SubState>;
