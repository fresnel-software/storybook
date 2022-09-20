"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
/* eslint-disable no-useless-constructor */
// We could use NgComponentOutlet here but there's currently no easy way
// to provide @Inputs and subscribe to @Outputs, see
// https://github.com/angular/angular/issues/15360
// For the time being, the ViewContainerRef approach works pretty well.
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const app_token_1 = require("./app.token");
let AppComponent = class AppComponent {
    constructor(cfr, changeDetectorRef, data) {
        this.cfr = cfr;
        this.changeDetectorRef = changeDetectorRef;
        this.data = data;
        this.previousValues = {};
        this.propSubscriptions = new Map();
    }
    ngOnInit() {
        this.data.pipe((0, operators_1.first)()).subscribe((data) => {
            this.target.clear();
            const compFactory = this.cfr.resolveComponentFactory(data.component);
            const componentRef = this.target.createComponent(compFactory);
            const { instance } = componentRef;
            // For some reason, manual change detection ref is only working when getting the ref from the injector (rather than componentRef.changeDetectorRef)
            const childChangeDetectorRef = componentRef.injector.get(core_1.ChangeDetectorRef);
            this.subscription = this.data.subscribe((newData) => {
                this.setProps(instance, newData);
                childChangeDetectorRef.markForCheck();
                // Must detect changes on the current component in order to update any changes in child component's @HostBinding properties (angular/angular#22560)
                this.changeDetectorRef.detectChanges();
            });
        });
    }
    ngOnDestroy() {
        this.target.clear();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.propSubscriptions.forEach((v) => {
            if (!v.sub.closed) {
                v.sub.unsubscribe();
            }
        });
        this.propSubscriptions.clear();
    }
    /**
     * Set inputs and outputs
     */
    setProps(instance, { props = {} }) {
        const changes = {};
        const hasNgOnChangesHook = !!instance.ngOnChanges;
        Object.keys(props).forEach((key) => {
            const value = props[key];
            const instanceProperty = instance[key];
            if (!(instanceProperty instanceof core_1.EventEmitter) && value !== undefined && value !== null) {
                // eslint-disable-next-line no-param-reassign
                instance[key] = value;
                if (hasNgOnChangesHook) {
                    const previousValue = this.previousValues[key];
                    if (previousValue !== value) {
                        changes[key] = new core_1.SimpleChange(previousValue, value, !Object.prototype.hasOwnProperty.call(this.previousValues, key));
                        this.previousValues[key] = value;
                    }
                }
            }
            else if (typeof value === 'function' && key !== 'ngModelChange') {
                this.setPropSubscription(key, instanceProperty, value);
            }
        });
        this.callNgOnChangesHook(instance, changes);
        this.setNgModel(instance, props);
    }
    /**
     * Manually call 'ngOnChanges' hook because angular doesn't do that for dynamic components
     * Issue: [https://github.com/angular/angular/issues/8903]
     */
    callNgOnChangesHook(instance, changes) {
        if (Object.keys(changes).length) {
            instance.ngOnChanges(changes);
        }
    }
    /**
     * If component implements ControlValueAccessor interface try to set ngModel
     */
    setNgModel(instance, props) {
        if (props.ngModel) {
            instance.writeValue(props.ngModel);
        }
        if (typeof props.ngModelChange === 'function') {
            instance.registerOnChange(props.ngModelChange);
        }
    }
    /**
     * Store ref to subscription for cleanup in 'ngOnDestroy' and check if
     * observable needs to be resubscribed to, before creating a new subscription.
     */
    setPropSubscription(key, instanceProperty, value) {
        if (this.propSubscriptions.has(key)) {
            const v = this.propSubscriptions.get(key);
            if (v.prop === value) {
                // Prop hasn't changed, so the existing subscription can stay.
                return;
            }
            // Now that the value has changed, unsubscribe from the previous value's subscription.
            if (!v.sub.closed) {
                v.sub.unsubscribe();
            }
        }
        const sub = instanceProperty.subscribe(value);
        this.propSubscriptions.set(key, { prop: value, sub });
    }
};
__decorate([
    (0, core_1.ViewChild)('target', { read: core_1.ViewContainerRef, static: true }),
    __metadata("design:type", core_1.ViewContainerRef)
], AppComponent.prototype, "target", void 0);
AppComponent = __decorate([
    (0, core_1.Component)({
        selector: 'storybook-dynamic-app-root',
        template: '<ng-template #target></ng-template>',
    }),
    __param(2, (0, core_1.Inject)(app_token_1.STORY)),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
        core_1.ChangeDetectorRef,
        rxjs_1.Observable])
], AppComponent);
exports.AppComponent = AppComponent;
