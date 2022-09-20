import { Type } from '@angular/core';
import { ICollection } from '../types';
/**
 * Wraps the story template into a component
 *
 * @param storyComponent
 * @param initialProps
 */
export declare const createStorybookWrapperComponent: (selector: string, template: string, storyComponent: Type<unknown> | undefined, styles: string[], initialProps?: ICollection) => Type<any>;
