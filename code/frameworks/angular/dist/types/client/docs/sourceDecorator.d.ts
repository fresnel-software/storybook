import type { PartialStoryFn } from '@storybook/csf';
import { StoryContext, AngularFramework } from '../types';
export declare const skipSourceRender: (context: StoryContext) => any;
/**
 * Angular source decorator.
 * @param storyFn Fn
 * @param context  StoryContext
 */
export declare const sourceDecorator: (storyFn: PartialStoryFn<AngularFramework>, context: StoryContext) => import("../types").StoryFnAngularReturnType;
