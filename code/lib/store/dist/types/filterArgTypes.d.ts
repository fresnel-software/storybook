import type { StrictArgTypes } from '@storybook/csf';
export declare type PropDescriptor = string[] | RegExp;
export declare const filterArgTypes: (argTypes: StrictArgTypes, include?: PropDescriptor | undefined, exclude?: PropDescriptor | undefined) => StrictArgTypes<import("@storybook/csf").Args>;
