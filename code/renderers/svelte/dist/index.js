"use strict";var D=Object.create;var s=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var h=(o,e)=>{for(var r in e)s(o,r,{get:e[r],enumerable:!0})},d=(o,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of A(e))!P.call(o,n)&&n!==r&&s(o,n,{get:()=>e[n],enumerable:!(t=b(e,n))||t.enumerable});return o};var i=(o,e,r)=>(r=o!=null?D(E(o)):{},d(e||!o||!o.__esModule?s(r,"default",{value:o,enumerable:!0}):r,o)),M=o=>d(s({},"__esModule",{value:!0}),o);var q={};h(q,{addDecorator:()=>z,addParameters:()=>H,clearDecorators:()=>I,configure:()=>_,forceReRender:()=>B,getStorybook:()=>N,raw:()=>V,setAddon:()=>K,storiesOf:()=>Y});module.exports=M(q);var l=i(require("global")),{window:T}=l.default;T.STORYBOOK_ENV="svelte";var x=require("@storybook/core-client");var u=require("@storybook/store"),S=i(require("@storybook/svelte/templates/SlotDecorator.svelte"));function L(o){return o.prototype&&o.prototype.$destroy!==void 0}function c(o){return o&&o.default?o.default:o}function y(o,e,r){let t=c(e);if(L(t)&&(t={Component:t}),r)t={Component:S.default,props:{decorator:c(t.Component),decoratorProps:t.props,component:c(r.Component),props:r.props,on:r.on}};else{let n=t.Component;n||(n=o.component),t.Component=c(n)}return t}function w(o,e){return e.reduce((r,t)=>n=>{let p,m=t(a=>(p=r({...n,...(0,u.sanitizeStoryContextUpdate)(a)}),p),n);return p||(p=r(n)),!m||m===p?p:y(n,m,p)},r=>y(r,o(r)))}var C=i(require("global")),k=i(require("@storybook/svelte/templates/PreviewRender.svelte")),{document:U}=C.default,f=null;function W(){!f||(f.$destroy(),f=null)}function F({storyFn:o,kind:e,name:r,showMain:t,showError:n,storyContext:p},m){W();let a=m||U.getElementById("storybook-root");a.innerHTML="",f=new k.default({target:a,props:{storyFn:o,storyContext:p,name:r,kind:e,showError:n}}),t()}var v=(o,e)=>{let{id:r,component:t}=e;if(!t)throw new Error(`Unable to render story ${r} as the component annotation is missing from the default export`);return{Component:t,props:o}};var{configure:$,clientApi:g,forceReRender:B}=(0,x.start)(F,{decorateStory:w,render:v}),{setAddon:K,addDecorator:z,addParameters:H,clearDecorators:I,getStorybook:N,raw:V}=g,O="svelte",Y=(o,e)=>g.storiesOf(o,e).addParameters({framework:O}),_=(o,e)=>$(O,o,e);var R;(R=module==null?void 0:module.hot)==null||R.decline();0&&(module.exports={addDecorator,addParameters,clearDecorators,configure,forceReRender,getStorybook,raw,setAddon,storiesOf});
