import type { StorySortParameter, StorySortParameterV7 } from '@storybook/addons';
import type { Story, IndexEntry, Path, Parameters } from './types';
export declare const sortStoriesV7: (stories: IndexEntry[], storySortParameter: StorySortParameterV7, fileNameOrder: Path[]) => IndexEntry[];
export declare const sortStoriesV6: (stories: [string, Story, Parameters, Parameters][], storySortParameter: StorySortParameter, fileNameOrder: Path[]) => IndexEntry[];
