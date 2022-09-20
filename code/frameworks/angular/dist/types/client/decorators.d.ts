import type { Type } from '@angular/core';
import type { DecoratorFunction, StoryContext } from '@storybook/csf';
import type { ICollection, NgModuleMetadata, AngularFramework } from './types';
export declare const moduleMetadata: <TArgs = any>(metadata: Partial<NgModuleMetadata>) => DecoratorFunction<AngularFramework, TArgs>;
export declare const componentWrapperDecorator: <TArgs = any>(element: Type<unknown> | ((story: string) => string), props?: ICollection | ((storyContext: StoryContext<AngularFramework, TArgs>) => ICollection)) => DecoratorFunction<AngularFramework, TArgs>;
