"use strict";var R=Object.create;var s=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var O=(e,o)=>{for(var t in o)s(e,t,{get:o[t],enumerable:!0})},l=(e,o,t,p)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of k(o))!D.call(e,i)&&i!==t&&s(e,i,{get:()=>o[i],enumerable:!(p=b(o,i))||p.enumerable});return e};var c=(e,o,t)=>(t=e!=null?R(w(e)):{},l(o||!e||!e.__esModule?s(t,"default",{value:e,enumerable:!0}):t,e)),M=e=>l(s({},"__esModule",{value:!0}),e);var W={};O(W,{addDecorator:()=>T,addParameters:()=>P,clearDecorators:()=>F,configure:()=>L,forceReRender:()=>N,getStorybook:()=>I,raw:()=>K,setAddon:()=>v,storiesOf:()=>H});module.exports=M(W);var f=c(require("global")),{window:S}=f.default;S.STORYBOOK_ENV="HTML";var C=require("@storybook/core-client");var m=c(require("global")),A=require("ts-dedent"),d=require("@storybook/preview-web"),{Node:h}=m.default;function y({storyFn:e,kind:o,name:t,showMain:p,showError:i,forceRemount:x},n){let a=e();if(p(),typeof a=="string")n.innerHTML=a,(0,d.simulatePageLoad)(n);else if(a instanceof h){if(n.firstChild===a&&x===!1)return;n.innerHTML="",n.appendChild(a),(0,d.simulateDOMContentLoaded)()}else i({title:`Expecting an HTML snippet or DOM node from the story: "${t}" of "${o}".`,description:A.dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var u="html",r=(0,C.start)(y),H=(e,o)=>r.clientApi.storiesOf(e,o).addParameters({framework:u}),L=(...e)=>r.configure(u,...e),T=r.clientApi.addDecorator,P=r.clientApi.addParameters,F=r.clientApi.clearDecorators,v=r.clientApi.setAddon,N=r.forceReRender,I=r.clientApi.getStorybook,K=r.clientApi.raw;var g;(g=module==null?void 0:module.hot)==null||g.decline();0&&(module.exports={addDecorator,addParameters,clearDecorators,configure,forceReRender,getStorybook,raw,setAddon,storiesOf});