"use strict";var i=Object.create;var n=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty;var c=(o,e)=>{for(var r in e)n(o,r,{get:e[r],enumerable:!0})},a=(o,e,r,p)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of k(e))!m.call(o,s)&&s!==r&&n(o,s,{get:()=>e[s],enumerable:!(p=b(e,s))||p.enumerable});return o};var d=(o,e,r)=>(r=o!=null?i(y(o)):{},a(e||!o||!o.__esModule?n(r,"default",{value:o,enumerable:!0}):r,o)),f=o=>a(n({},"__esModule",{value:!0}),o);var l={};c(l,{addons:()=>w,core:()=>g});module.exports=f(l);var t=d(require("path")),w=[t.default.dirname(require.resolve(t.default.join("@storybook/preset-web-components-webpack","package.json"))),t.default.dirname(require.resolve(t.default.join("@storybook/web-components","package.json")))],g=async(o,e)=>{let r=await e.presets.apply("framework");return{...o,builder:{name:t.default.dirname(require.resolve(t.default.join("@storybook/builder-webpack5","package.json"))),options:typeof r=="string"?{}:r.options.builder||{}}}};0&&(module.exports={addons,core});