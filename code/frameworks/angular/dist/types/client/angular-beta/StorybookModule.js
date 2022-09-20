"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStorybookModule = exports.getStorybookModuleMetadata = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const ts_dedent_1 = require("ts-dedent");
const util_deprecate_1 = __importDefault(require("util-deprecate"));
const StorybookProvider_1 = require("./StorybookProvider");
const NgModulesAnalyzer_1 = require("./utils/NgModulesAnalyzer");
const NgComponentAnalyzer_1 = require("./utils/NgComponentAnalyzer");
const StorybookWrapperComponent_1 = require("./StorybookWrapperComponent");
const ComputesTemplateFromComponent_1 = require("./ComputesTemplateFromComponent");
const deprecatedStoryComponentWarning = (0, util_deprecate_1.default)(() => { }, (0, ts_dedent_1.dedent) `\`component\` story return value is deprecated, and will be removed in Storybook 7.0.
        Instead, use \`export const default = () => ({ component: AppComponent });\`
        or
        \`\`\`
        export const Primary: StoryFn = () => ({});
        Primary.parameters = { component: AppComponent };
        \`\`\`
        Read more at 
        - https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-angular-story-component).
        - https://storybook.js.org/docs/angular/writing-stories/parameters
      `);
const getStorybookModuleMetadata = ({ storyFnAngular, component: annotatedComponent, targetSelector, }, storyProps$) => {
    const { component: storyComponent, props, styles, moduleMetadata = {} } = storyFnAngular;
    let { template } = storyFnAngular;
    if (storyComponent) {
        deprecatedStoryComponentWarning();
    }
    const component = storyComponent ?? annotatedComponent;
    if (hasNoTemplate(template) && component) {
        template = (0, ComputesTemplateFromComponent_1.computesTemplateFromComponent)(component, props, '');
    }
    /**
     * Create a component that wraps generated template and gives it props
     */
    const ComponentToInject = (0, StorybookWrapperComponent_1.createStorybookWrapperComponent)(targetSelector, template, component, styles, props);
    const isStandalone = (0, NgComponentAnalyzer_1.isStandaloneComponent)(component);
    // Look recursively (deep) if the component is not already declared by an import module
    const requiresComponentDeclaration = (0, NgComponentAnalyzer_1.isDeclarable)(component) &&
        !(0, NgModulesAnalyzer_1.isComponentAlreadyDeclaredInModules)(component, moduleMetadata.declarations, moduleMetadata.imports) &&
        !isStandalone;
    return {
        declarations: [
            ...(requiresComponentDeclaration ? [component] : []),
            ComponentToInject,
            ...(moduleMetadata.declarations ?? []),
        ],
        imports: [
            platform_browser_1.BrowserModule,
            ...(isStandalone ? [component] : []),
            ...(moduleMetadata.imports ?? []),
        ],
        providers: [(0, StorybookProvider_1.storyPropsProvider)(storyProps$), ...(moduleMetadata.providers ?? [])],
        entryComponents: [...(moduleMetadata.entryComponents ?? [])],
        schemas: [...(moduleMetadata.schemas ?? [])],
        bootstrap: [ComponentToInject],
    };
};
exports.getStorybookModuleMetadata = getStorybookModuleMetadata;
const createStorybookModule = (ngModule) => {
    let StorybookModule = class StorybookModule {
    };
    StorybookModule = __decorate([
        (0, core_1.NgModule)(ngModule)
    ], StorybookModule);
    return StorybookModule;
};
exports.createStorybookModule = createStorybookModule;
function hasNoTemplate(template) {
    return template === null || template === undefined;
}
