import type { AnyFramework, LegacyStoryAnnotationsOrFn, StoryId } from '@storybook/csf';
import type { NormalizedComponentAnnotations, NormalizedStoryAnnotations } from '../types';
export declare function normalizeStory<TFramework extends AnyFramework>(key: StoryId, storyAnnotations: LegacyStoryAnnotationsOrFn<TFramework>, meta: NormalizedComponentAnnotations<TFramework>): NormalizedStoryAnnotations<TFramework>;
