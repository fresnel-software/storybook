var w=Object.create;var m=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var k=(e,t)=>()=>(e&&(t=e(e=0)),t);var b=(e,t)=>{for(var o in t)m(e,o,{get:t[o],enumerable:!0})},h=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of I(t))!H.call(e,n)&&n!==o&&m(e,n,{get:()=>t[n],enumerable:!(r=C(t,n))||r.enumerable});return e};var f=(e,t,o)=>(o=e!=null?w(J(e)):{},h(t||!e||!e.__esModule?m(o,"default",{value:e,enumerable:!0}):o,e)),T=e=>h(m({},"__esModule",{value:!0}),e);function g(e,t,o){if(a.namedTypes.ClassDeclaration.check(t.node)||a.namedTypes.FunctionDeclaration.check(t.node))e.set("actualName",(0,p.getNameOrValue)(t.get("id")));else if(a.namedTypes.ArrowFunctionExpression.check(t.node)||a.namedTypes.FunctionExpression.check(t.node)||(0,p.isReactForwardRefCall)(t,o)){let r=t;for(;r.parent;){if(a.namedTypes.VariableDeclarator.check(r.parent.node)){e.set("actualName",(0,p.getNameOrValue)(r.parent.get("id")));return}if(a.namedTypes.AssignmentExpression.check(r.parent.node)){let n=r.parent.get("left");if(a.namedTypes.Identifier.check(n.node)||a.namedTypes.Literal.check(n.node)){e.set("actualName",(0,p.getNameOrValue)(n));return}}r=r.parent}e.set("actualName","")}}var a,p,x=k(()=>{a=require("ast-types"),p=require("react-docgen/dist/utils")});var v={};b(v,{reactDocgen:()=>V});function V({include:e=/\.(mjs|tsx?|jsx?)$/,exclude:t=[/node_modules\/.*/]}={}){let o=process.cwd(),r=(0,O.createFilter)(e,t);return{name:"storybook:react-docgen-plugin",enforce:"pre",async transform(n,i){let d=D.default.relative(o,i);if(!!r(d))try{let l=(0,s.parse)(n,_,M,{importer:$,filename:i}),c=new N.default(n);return l.forEach(j=>{let{actualName:y,...E}=j;if(y){let F=JSON.stringify(E);c.append(`;${y}.__docgenInfo=${F}`)}}),{code:c.toString(),map:c.generateMap()}}catch{}}}}var D,O,s,N,A,_,$,M,P=k(()=>{D=f(require("path")),O=require("@rollup/pluginutils"),s=require("react-docgen"),N=f(require("magic-string"));x();A=Object.values(s.handlers).map(e=>e),_=s.resolver.findAllExportedComponentDefinitions,$=s.importers.makeFsImporter(),M=[...A,g]});var B={};b(B,{addons:()=>q,core:()=>L,readPackageJson:()=>S,viteFinal:()=>z});module.exports=T(B);var R=f(require("path")),u=f(require("fs")),q=["@storybook/react"],L={builder:"@storybook/builder-vite"};function S(){let e=R.default.resolve("package.json");if(!u.default.existsSync(e))return!1;let t=u.default.readFileSync(e,"utf8");return JSON.parse(t)}var z=async(e,{presets:t})=>{var d,l;let{plugins:o=[]}=e,{reactDocgen:r,reactDocgenTypescriptOptions:n}=await t.apply("typescript",{}),i;try{let c=S();i=c&&(((d=c.devDependencies)==null?void 0:d.typescript)||((l=c.dependencies)==null?void 0:l.typescript))}catch{i=!1}if(r==="react-docgen-typescript"&&i)o.push(require("@joshwooding/vite-plugin-react-docgen-typescript")(n));else if(r){let{reactDocgen:c}=await Promise.resolve().then(()=>(P(),v));o.unshift(c())}return e};0&&(module.exports={addons,core,readPackageJson,viteFinal});