import type { Args, ComponentAnnotations, StoryAnnotations, AnnotatedStoryFn } from '@storybook/csf';
import { AngularFramework } from './types';
export type { Args, ArgTypes } from '@storybook/csf';
/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export declare type Meta<TArgs = Args> = ComponentAnnotations<AngularFramework, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type StoryFn<TArgs = Args> = AnnotatedStoryFn<AngularFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type StoryObj<TArgs = Args> = StoryAnnotations<AngularFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type Story<TArgs = Args> = StoryObj<TArgs>;
