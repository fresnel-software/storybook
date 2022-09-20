import { OnInit, ViewContainerRef, ComponentFactoryResolver, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StoryFnAngularReturnType } from '../types';
export declare class AppComponent implements OnInit, OnDestroy {
    private cfr;
    private changeDetectorRef;
    private data;
    target: ViewContainerRef;
    readonly previousValues: {
        [key: string]: any;
    };
    subscription: Subscription;
    propSubscriptions: Map<any, {
        prop: any;
        sub: Subscription;
    }>;
    constructor(cfr: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef, data: Observable<StoryFnAngularReturnType>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Set inputs and outputs
     */
    private setProps;
    /**
     * Manually call 'ngOnChanges' hook because angular doesn't do that for dynamic components
     * Issue: [https://github.com/angular/angular/issues/8903]
     */
    private callNgOnChangesHook;
    /**
     * If component implements ControlValueAccessor interface try to set ngModel
     */
    private setNgModel;
    /**
     * Store ref to subscription for cleanup in 'ngOnDestroy' and check if
     * observable needs to be resubscribed to, before creating a new subscription.
     */
    private setPropSubscription;
}