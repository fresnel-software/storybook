import"./chunk-HKSD7XQF.mjs";import g from"sveltedoc-parser";import{dedent as d}from"ts-dedent";import*as a from"path";import*as l from"fs";import{preprocess as u}from"svelte/compiler";import{logger as h}from"@storybook/node-logger";function _(o){if(!o)return null;let e=o.split(/[/\\]/).map(encodeURI);if(e.length>1){let s=e[e.length-1].match(/^index(\.\w+)/);s&&(e.pop(),e[e.length-1]+=s[1])}let r=e.pop();if(!r)throw new Error(`Could not derive component name from file ${o}`);let t=r.replace(/%/g,"u").replace(/\.[^.]+$/,"").replace(/[^a-zA-Z_$0-9]+/g,"_").replace(/^_/,"").replace(/_$/,"").replace(/^(\d)/,"_$1");if(!t)throw new Error(`Could not derive component name from file ${o}`);return t[0].toUpperCase()+t.slice(1)}async function $(o){let{resource:e}=this._module,r=this.getOptions(),{preprocess:t,logDocgen:s=!1}=r,c;if(t){let n=l.readFileSync(e).toString(),{code:p}=await u(n,t);c={fileContent:p}}else c={filename:e};let m={...c,version:3},i="";try{let n=await g.parse(m),p=a.basename(e);n.name=a.basename(p);let f=_(e);i=d`
      ${f}.__docgen = ${JSON.stringify(n)};
    `}catch(n){s&&h.error(n)}return o+i}export{$ as default};
