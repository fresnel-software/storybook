"use strict";var p=Object.create;var a=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var y=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty;var h=(o,t)=>{for(var e in t)a(o,e,{get:t[e],enumerable:!0})},c=(o,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of y(t))!l.call(o,n)&&n!==e&&a(o,n,{get:()=>t[n],enumerable:!(s=u(t,n))||s.enumerable});return o};var E=(o,t,e)=>(e=o!=null?p(A(o)):{},c(t||!o||!o.__esModule?a(e,"default",{value:o,enumerable:!0}):e,o)),R=o=>c(a({},"__esModule",{value:!0}),o);var x={};h(x,{PARAM_KEY:()=>d,withA11y:()=>f});module.exports=R(x);var m=E(require("util-deprecate")),i=require("ts-dedent");var r="storybook/a11y",b=`${r}/panel`,d="a11y",k=`${r}/result`,D=`${r}/request`,$=`${r}/running`,w=`${r}/error`,I=`${r}/manual`;module&&module.hot&&module.hot.decline&&module.hot.decline();var f=(0,m.default)((o,t)=>o(t),i.dedent`
    withA11y(options) is deprecated, please configure addon-a11y using the addParameter api:

    addParameters({
      a11y: options,
    });

    More at: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#removed-witha11y-decorator
  `);0&&(module.exports={PARAM_KEY,withA11y});
