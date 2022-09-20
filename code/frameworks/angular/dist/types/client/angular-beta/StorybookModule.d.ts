import { NgModule, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { ICollection, StoryFnAngularReturnType } from '../types';
export declare const getStorybookModuleMetadata: ({ storyFnAngular, component: annotatedComponent, targetSelector, }: {
    storyFnAngular: StoryFnAngularReturnType;
    component?: any;
    targetSelector: string;
}, storyProps$: Subject<ICollection>) => NgModule;
export declare const createStorybookModule: (ngModule: NgModule) => Type<unknown>;
