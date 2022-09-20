import type { Combo } from './index';
export declare const createContext: ({ api, state }: Combo) => import("react").Context<{
    api: import("./index").API;
    state: import("./index").State;
}>;
