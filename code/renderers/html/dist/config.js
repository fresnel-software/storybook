"use strict";var k=Object.create;var p=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var F=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var E=(o,r)=>{for(var e in r)p(o,e,{get:r[e],enumerable:!0})},y=(o,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of w(r))!H.call(o,n)&&n!==e&&p(o,n,{get:()=>r[n],enumerable:!(t=M(r,n))||t.enumerable});return o};var L=(o,r,e)=>(e=o!=null?k(F(o)):{},y(r||!o||!o.__esModule?p(e,"default",{value:o,enumerable:!0}):e,o)),A=o=>y(p({},"__esModule",{value:!0}),o);var _={};E(_,{argTypesEnhancers:()=>T,decorators:()=>S,parameters:()=>I,renderToDOM:()=>C});module.exports=A(_);var d=require("@storybook/docs-tools");var a=require("@storybook/docs-tools"),m=require("@storybook/addons"),c=require("ts-dedent");function N(o){var t;let r=(t=o==null?void 0:o.parameters.docs)==null?void 0:t.source,e=o==null?void 0:o.parameters.__isArgsStory;return(r==null?void 0:r.type)===a.SourceType.DYNAMIC?!1:!e||(r==null?void 0:r.code)||(r==null?void 0:r.type)===a.SourceType.CODE}function O(o){return(0,c.dedent)(o)}function R(o,r){return((r.parameters.docs??{}).transformSource??O)(o,r)}function l(o,r){var n,f;let e=(f=(n=r==null?void 0:r.parameters.docs)==null?void 0:n.source)!=null&&f.excludeDecorators?r.originalStoryFn(r.args,r):o(),t;return N(r)||(typeof e=="string"?t=e:e instanceof Element&&(t=e.outerHTML),t&&(t=R(t,r))),(0,m.useEffect)(()=>{t&&m.addons.getChannel().emit(a.SNIPPET_RENDERED,r.id,t)}),e}var S=[l],g={docs:{inlineStories:!0,transformSource:void 0,source:{type:d.SourceType.DYNAMIC,language:"html",code:void 0,excludeDecorators:void 0}}},T=[d.enhanceArgTypes];var D=L(require("global")),h=require("ts-dedent"),u=require("@storybook/preview-web"),{Node:b}=D.default;function C({storyFn:o,kind:r,name:e,showMain:t,showError:n,forceRemount:f},s){let i=o();if(t(),typeof i=="string")s.innerHTML=i,(0,u.simulatePageLoad)(s);else if(i instanceof b){if(s.firstChild===i&&f===!1)return;s.innerHTML="",s.appendChild(i),(0,u.simulateDOMContentLoaded)()}else n({title:`Expecting an HTML snippet or DOM node from the story: "${e}" of "${r}".`,description:h.dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var I={framework:"html",...g};0&&(module.exports={argTypesEnhancers,decorators,parameters,renderToDOM});