import type { Globals, GlobalTypes } from '@storybook/csf';
export declare class GlobalsStore {
    allowedGlobalNames: Set<string>;
    initialGlobals: Globals;
    globals: Globals;
    constructor({ globals, globalTypes, }: {
        globals?: Globals;
        globalTypes?: GlobalTypes;
    });
    set({ globals, globalTypes }: {
        globals?: Globals;
        globalTypes?: GlobalTypes;
    }): void;
    filterAllowedGlobals(globals: Globals): Globals;
    updateFromPersisted(persisted: Globals): void;
    get(): Globals;
    update(newGlobals: Globals): void;
}