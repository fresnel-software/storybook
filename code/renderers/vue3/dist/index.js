var h=Object.create;var u=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,L=Object.prototype.hasOwnProperty;var M=(o,e)=>{for(var r in e)u(o,r,{get:e[r],enumerable:!0})},f=(o,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of T(e))!L.call(o,t)&&t!==r&&u(o,t,{get:()=>e[t],enumerable:!(n=v(e,t))||n.enumerable});return o};var E=(o,e,r)=>(r=o!=null?h(D(o)):{},f(e||!o||!o.__esModule?u(r,"default",{value:o,enumerable:!0}):r,o)),K=o=>f(u({},"__esModule",{value:!0}),o);var H={};M(H,{addDecorator:()=>$,addParameters:()=>z,clearDecorators:()=>B,configure:()=>_,forceReRender:()=>N,getStorybook:()=>W,raw:()=>Y,setAddon:()=>I,setup:()=>x,storiesOf:()=>U});module.exports=K(H);var d=E(require("global")),{window:l}=d.default;l.STORYBOOK_REACT_CLASSES={};l.STORYBOOK_ENV="vue3";var R=require("@storybook/core-client");var C=require("vue"),S=require("@storybook/store");function P(o){return typeof o=="function"?{render:o,name:o.name}:o}function F(o,e){let r=o;return r==null?null:e?{...P(r),components:{...r.components||{},story:e}}:{render(){return(0,C.h)(r)}}}function k(o,e){return e.reduce((r,n)=>t=>{let p,m=n(a=>(p=r({...t,...(0,S.sanitizeStoryContextUpdate)(a)}),p),t);return p||(p=r(t)),m===p?p:F(m,p)},r=>F(o(r)))}var w=require("ts-dedent"),s=require("vue"),A=(o,e)=>{let{id:r,component:n}=e;if(!n)throw new Error(`Unable to render story ${r} as the component annotation is missing from the default export`);return(0,s.h)(n,o)},g=o=>{},x=o=>{g=o},y=new Map;function V({title:o,name:e,storyFn:r,showMain:n,showError:t,showException:p},m){let a,c=(0,s.createApp)({unmounted(){y.delete(m)},render(){return y.set(m,c),g(c),(0,s.h)(a)}});if(c.config.errorHandler=p,a=r(),!a){t({title:`Expecting a Vue component from the story: "${e}" of "${o}".`,description:w.dedent`
      Did you forget to return the Vue component from the story?
      Use "() => ({ template: '<my-comp></my-comp>' })" or "() => ({ components: MyComp, template: '<my-comp></my-comp>' })" when defining the story.
      `});return}n(),y.has(m)&&y.get(m).unmount(),c.mount(m)}var O="vue3",i=(0,R.start)(V,{decorateStory:k,render:A}),U=(o,e)=>i.clientApi.storiesOf(o,e).addParameters({framework:O}),_=(...o)=>i.configure(O,...o),{addDecorator:$}=i.clientApi,{addParameters:z}=i.clientApi,{clearDecorators:B}=i.clientApi,{setAddon:I}=i.clientApi,{forceReRender:N}=i,{getStorybook:W}=i.clientApi,{raw:Y}=i.clientApi;var b;(b=module==null?void 0:module.hot)==null||b.decline();0&&(module.exports={addDecorator,addParameters,clearDecorators,configure,forceReRender,getStorybook,raw,setAddon,setup,storiesOf});