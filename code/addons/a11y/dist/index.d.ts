import { DecoratorFunction, AnyFramework } from '@storybook/csf';
import { ElementContext, Spec, RunOptions } from 'axe-core';

declare const PARAM_KEY = "a11y";

interface Setup {
    element?: ElementContext;
    config: Spec;
    options: RunOptions;
}
interface A11yParameters {
    element?: ElementContext;
    config?: Spec;
    options?: RunOptions;
    manual?: boolean;
}

declare const withA11y: DecoratorFunction<AnyFramework>;

export { A11yParameters, PARAM_KEY, Setup, withA11y };
