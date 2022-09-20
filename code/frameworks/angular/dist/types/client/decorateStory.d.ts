import type { DecoratorFunction, LegacyStoryFn } from '@storybook/csf';
import type { AngularFramework } from './types';
export default function decorateStory(mainStoryFn: LegacyStoryFn<AngularFramework>, decorators: DecoratorFunction<AngularFramework>[]): LegacyStoryFn<AngularFramework>;
export { decorateStory };
