var v=Object.create;var s=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,S=Object.prototype.hasOwnProperty;var x=(o,e)=>{for(var t in e)s(o,t,{get:e[t],enumerable:!0})},c=(o,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of b(e))!S.call(o,r)&&r!==t&&s(o,r,{get:()=>e[r],enumerable:!(n=y(e,r))||n.enumerable});return o};var a=(o,e,t)=>(t=o!=null?v(k(o)):{},c(e||!o||!o.__esModule?s(t,"default",{value:o,enumerable:!0}):t,o)),C=o=>c(s({},"__esModule",{value:!0}),o);var P={};x(P,{addons:()=>h,core:()=>F,readPackageJson:()=>J,viteFinal:()=>O});module.exports=C(P);var d=a(require("path")),u=a(require("fs"));var p=require("vue-docgen-api"),f=require("vite"),l=a(require("magic-string"));function m(){let e=(0,f.createFilter)(/\.(vue)$/);return{name:"storybook:vue-docgen-plugin",async transform(t,n){if(!e(n))return;let r=await(0,p.parse)(n),g=JSON.stringify(r),i=new l.default(t);return i.append(`;_sfc_main.__docgenInfo = ${g}`),{code:i.toString(),map:i.generateMap({hires:!0,source:n})}}}}var h=["@storybook/vue3"],F={builder:"@storybook/builder-vite"};function J(){let o=d.default.resolve("package.json");if(!u.default.existsSync(o))return!1;let e=u.default.readFileSync(o,"utf8");return JSON.parse(e)}var O=async(o,{presets:e})=>{var r;let{plugins:t=[]}=o;return t.push(m()),{...o,plugins:t,resolve:{...o.resolve,alias:{...(r=o.resolve)==null?void 0:r.alias,vue:"vue/dist/vue.esm-bundler.js"}}}};0&&(module.exports={addons,core,readPackageJson,viteFinal});
