var _=Object.create;var p=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var M=(e,o)=>{for(var t in o)p(e,t,{get:o[t],enumerable:!0})},u=(e,o,t,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of D(o))!N.call(e,r)&&r!==t&&p(e,r,{get:()=>o[r],enumerable:!(n=P(o,r))||n.enumerable});return e};var i=(e,o,t)=>(t=e!=null?_(J(e)):{},u(o||!e||!e.__esModule?p(t,"default",{value:e,enumerable:!0}):t,e)),R=e=>u(p({},"__esModule",{value:!0}),e);var I={};M(I,{addons:()=>U,core:()=>z,readPackageJson:()=>A,viteFinal:()=>E});module.exports=R(I);var x=i(require("path")),d=i(require("fs"));var y=i(require("magic-string")),a=i(require("path")),v=i(require("fs")),b=i(require("sveltedoc-parser")),S=require("@storybook/node-logger"),h=require("svelte/compiler"),k=require("vite");function j(e){var n;if(!e)return null;let o=e.split(/[/\\]/).map(encodeURI);if(o.length>1){let r=o[o.length-1].match(/^index(\.\w+)/);r&&(o.pop(),o[o.length-1]+=r[1])}let t=(n=o.pop())==null?void 0:n.replace(/%/g,"u").replace(/\.[^.]+$/,"").replace(/[^a-zA-Z_$0-9]+/g,"_").replace(/^_/,"").replace(/_$/,"").replace(/^(\d)/,"_$1");if(!t)throw new Error(`Could not derive component name from file ${e}`);return t[0].toUpperCase()+t.slice(1)}function w(e){let o=process.cwd(),{preprocess:t,logDocgen:n=!1}=e,C=(0,k.createFilter)(/\.(svelte)$/);return{name:"storybook:svelte-docgen-plugin",async transform(O,l){if(!C(l))return;let c=a.default.relative(o,l),m;if(t){let s=v.default.readFileSync(c).toString(),{code:g}=await(0,h.preprocess)(s,t,{filename:c});m={fileContent:g}}else m={filename:c};let $={...m,version:3},f=new y.default(O);try{let s=await b.default.parse($),g=a.default.basename(c);s.name=a.default.basename(g);let F=j(c);f.append(`;${F}.__docgen = ${JSON.stringify(s)}`)}catch(s){n&&S.logger.error(s)}return{code:f.toString(),map:f.generateMap({hires:!0,source:l})}}}}var U=["@storybook/svelte"],z={builder:"@storybook/builder-vite"};function A(){let e=x.default.resolve("package.json");if(!d.default.existsSync(e))return!1;let o=d.default.readFileSync(e,"utf8");return JSON.parse(o)}var E=async(e,{presets:o})=>{let{plugins:t=[]}=e;return t.push(w(e)),{...e,plugins:t}};0&&(module.exports={addons,core,readPackageJson,viteFinal});