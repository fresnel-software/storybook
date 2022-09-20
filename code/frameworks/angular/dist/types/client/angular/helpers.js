"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNgApp = void 0;
const global_1 = __importDefault(require("global"));
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const platform_browser_1 = require("@angular/platform-browser");
const rxjs_1 = require("rxjs");
const app_component_1 = require("./app.component");
const app_token_1 = require("./app.token");
const { document } = global_1.default;
let platform = null;
let promises = [];
let storyData = new rxjs_1.ReplaySubject(1);
const moduleClass = class DynamicModule {
};
const componentClass = class DynamicComponent {
};
function storyDataFactory(data) {
    return (ngZone) => new rxjs_1.Observable((subscriber) => {
        const sub = data.subscribe((v) => {
            ngZone.run(() => subscriber.next(v));
        }, (err) => {
            ngZone.run(() => subscriber.error(err));
        }, () => {
            ngZone.run(() => subscriber.complete());
        });
        return () => {
            sub.unsubscribe();
        };
    });
}
const getModule = (declarations, entryComponents, bootstrap, data, moduleMetadata) => {
    // Complete last ReplaySubject and create a new one for the current module
    storyData.complete();
    storyData = new rxjs_1.ReplaySubject(1);
    storyData.next(data);
    const moduleMeta = {
        declarations: [...declarations, ...(moduleMetadata.declarations || [])],
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, ...(moduleMetadata.imports || [])],
        providers: [
            { provide: app_token_1.STORY, useFactory: storyDataFactory(storyData.asObservable()), deps: [core_1.NgZone] },
            ...(moduleMetadata.providers || []),
        ],
        entryComponents: [...entryComponents, ...(moduleMetadata.entryComponents || [])],
        schemas: [...(moduleMetadata.schemas || [])],
        bootstrap: [...bootstrap],
    };
    return (0, core_1.NgModule)(moduleMeta)(moduleClass);
};
const createComponentFromTemplate = (template, styles) => {
    return (0, core_1.Component)({
        template,
        styles,
    })(componentClass);
};
const extractNgModuleMetadata = (importItem) => {
    const target = importItem && importItem.ngModule ? importItem.ngModule : importItem;
    const decoratorKey = '__annotations__';
    const decorators = Reflect &&
        Reflect.getOwnPropertyDescriptor &&
        Reflect.getOwnPropertyDescriptor(target, decoratorKey)
        ? Reflect.getOwnPropertyDescriptor(target, decoratorKey).value
        : target[decoratorKey];
    if (!decorators || decorators.length === 0) {
        return null;
    }
    const ngModuleDecorator = decorators.find((decorator) => decorator instanceof core_1.NgModule);
    if (!ngModuleDecorator) {
        return null;
    }
    return ngModuleDecorator;
};
const getExistenceOfComponentInModules = (component, declarations, imports) => {
    if (declarations && declarations.some((declaration) => declaration === component)) {
        // Found component in declarations array
        return true;
    }
    if (!imports) {
        return false;
    }
    return imports.some((importItem) => {
        const extractedNgModuleMetadata = extractNgModuleMetadata(importItem);
        if (!extractedNgModuleMetadata) {
            // Not an NgModule
            return false;
        }
        return getExistenceOfComponentInModules(component, extractedNgModuleMetadata.declarations, extractedNgModuleMetadata.imports);
    });
};
const initModule = (storyFn) => {
    const storyObj = storyFn();
    const { component, template, props, styles, moduleMetadata = {} } = storyObj;
    const isCreatingComponentFromTemplate = Boolean(template);
    const AnnotatedComponent = isCreatingComponentFromTemplate
        ? createComponentFromTemplate(template, styles)
        : component;
    const componentRequiresDeclaration = isCreatingComponentFromTemplate ||
        !getExistenceOfComponentInModules(component, moduleMetadata.declarations, moduleMetadata.imports);
    const componentDeclarations = componentRequiresDeclaration
        ? [app_component_1.AppComponent, AnnotatedComponent]
        : [app_component_1.AppComponent];
    const story = {
        component: AnnotatedComponent,
        props,
    };
    return getModule(componentDeclarations, [AnnotatedComponent], [app_component_1.AppComponent], story, moduleMetadata);
};
const staticRoot = document.getElementById('storybook-root');
const insertDynamicRoot = () => {
    const app = document.createElement('storybook-dynamic-app-root');
    staticRoot.innerHTML = '';
    staticRoot.appendChild(app);
};
const draw = (newModule) => {
    if (!platform) {
        insertDynamicRoot();
        if (typeof NODE_ENV === 'string' && NODE_ENV !== 'development') {
            try {
                (0, core_1.enableProdMode)();
            }
            catch (e) {
                //
            }
        }
        platform = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
        promises.push(platform.bootstrapModule(newModule));
    }
    else {
        Promise.all(promises).then((modules) => {
            modules.forEach((mod) => mod.destroy());
            insertDynamicRoot();
            promises = [];
            promises.push(platform.bootstrapModule(newModule));
        });
    }
};
const renderNgApp = (storyFn, forced) => {
    if (!forced) {
        draw(initModule(storyFn));
    }
    else {
        storyData.next(storyFn());
    }
};
exports.renderNgApp = renderNgApp;
