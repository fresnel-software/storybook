"use strict";var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var a=Object.getOwnPropertyNames;var m=Object.prototype.hasOwnProperty;var l=(t,r)=>{for(var n in r)c(t,n,{get:r[n],enumerable:!0})},$=(t,r,n,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of a(r))!m.call(t,o)&&o!==n&&c(t,o,{get:()=>r[o],enumerable:!(i=u(r,o))||i.enumerable});return t};var d=t=>$(c({},"__esModule",{value:!0}),t);var h={};l(h,{default:()=>A});module.exports=d(h);var S=require("ts-dedent"),{identifier:k}=require("safe-identifier");function f(t,r=0,n=!1){if(typeof t=="string")return JSON.stringify(t);let i="  ".repeat(r);if(Array.isArray(t)){let e=t.map(s=>f(s,r+1)).join(`,
${i}  `);return n?e:`[
${i}  ${e}
${i}]`}if(typeof t=="object"){let o="";return Object.keys(t).length>0&&(o=Object.keys(t).map(s=>{let g=f(t[s],r+1);return`
${i}  ${s}: ${g}`}).join(",")),n?o:o.length===0?"{}":`{${o}
${i}}`}return t}function b(t){return Object.keys(t).length===0?"":Object.entries(t).map(([r,n])=>`import { ${n.sort().join(", ")} } from '${r}';
`).join("")}function x(t){return t&&t.length>0?`
  decorators: [
    ${t.join(`,
    `)}
  ],`:""}function j(t){let{title:r,imports:n,decorators:i,stories:o,...e}=t,s=x(i),g=f(e,0,!0);return S.dedent`
  export default {
    title: ${JSON.stringify(r)},${s}${g}
  };
  
  `}function C(t){let{name:r,...n}=t,i=k(r),o={name:r,...n};return[`export const ${i} = ${f(o)};`,""].join(`
`)}function p(t){return[b(t.imports),j(t),...t.stories.map(n=>C(n))].join(`
`)}function O(t){return{imports:{},decorators:[],...t}}function y(t){return p(O(t))}var A=t=>{try{return y(JSON.parse(t))}catch{}return t};0&&(module.exports={});
