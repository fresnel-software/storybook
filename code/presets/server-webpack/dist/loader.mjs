import{a as y}from"./chunk-HKSD7XQF.mjs";import{dedent as u}from"ts-dedent";var{identifier:a}=y("safe-identifier");function f(t,r=0,n=!1){if(typeof t=="string")return JSON.stringify(t);let o="  ".repeat(r);if(Array.isArray(t)){let e=t.map(s=>f(s,r+1)).join(`,
${o}  `);return n?e:`[
${o}  ${e}
${o}]`}if(typeof t=="object"){let i="";return Object.keys(t).length>0&&(i=Object.keys(t).map(s=>{let g=f(t[s],r+1);return`
${o}  ${s}: ${g}`}).join(",")),n?i:i.length===0?"{}":`{${i}
${o}}`}return t}function m(t){return Object.keys(t).length===0?"":Object.entries(t).map(([r,n])=>`import { ${n.sort().join(", ")} } from '${r}';
`).join("")}function l(t){return t&&t.length>0?`
  decorators: [
    ${t.join(`,
    `)}
  ],`:""}function $(t){let{title:r,imports:n,decorators:o,stories:i,...e}=t,s=l(o),g=f(e,0,!0);return u`
  export default {
    title: ${JSON.stringify(r)},${s}${g}
  };
  
  `}function d(t){let{name:r,...n}=t,o=a(r),i={name:r,...n};return[`export const ${o} = ${f(i)};`,""].join(`
`)}function S(t){return[m(t.imports),$(t),...t.stories.map(n=>d(n))].join(`
`)}function k(t){return{imports:{},decorators:[],...t}}function p(t){return S(k(t))}var A=t=>{try{return p(JSON.parse(t))}catch{}return t};export{A as default};
