"use strict";var d=Object.create;var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var x=(e,r)=>{for(var t in r)c(e,t,{get:r[t],enumerable:!0})},s=(e,r,t,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of h(r))!F.call(e,n)&&n!==t&&c(e,n,{get:()=>r[n],enumerable:!(a=u(r,n))||a.enumerable});return e};var E=(e,r,t)=>(t=e!=null?d(w(e)):{},s(r||!e||!e.__esModule?c(t,"default",{value:e,enumerable:!0}):t,e)),P=e=>s(c({},"__esModule",{value:!0}),e);var C={};x(C,{parameters:()=>k,renderToDOM:()=>f});module.exports=P(C);var o=E(require("preact")),y=require("ts-dedent"),i;function l(e,r){o.Fragment?o.render(e,r):i=o.render(e,r,i)}var g=({showError:e,name:r,title:t,storyFn:a,domElement:n})=>{let p=o.h(a,null);return p||(e({title:`Expecting a Preact element from the story: "${r}" of "${t}".`,description:y.dedent`
        Did you forget to return the Preact element from the story?
        Use "() => (<MyComp/>)" or "() => { return <MyComp/>; }" when defining the story.
      `}),null)};function f({storyFn:e,title:r,name:t,showMain:a,showError:n,forceRemount:p},m){p&&l(null,m),a(),l(o.h(g,{name:t,title:r,showError:n,storyFn:e,domElement:m}),m)}var k={framework:"preact"};0&&(module.exports={parameters,renderToDOM});
