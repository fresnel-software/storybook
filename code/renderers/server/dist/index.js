var H=Object.create;var p=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var N=Object.getPrototypeOf,U=Object.prototype.hasOwnProperty;var $=(e,r)=>{for(var o in r)p(e,o,{get:r[o],enumerable:!0})},y=(e,r,o,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of P(r))!U.call(e,t)&&t!==o&&p(e,t,{get:()=>r[t],enumerable:!(n=I(r,t))||n.enumerable});return e};var m=(e,r,o)=>(o=e!=null?H(N(e)):{},y(r||!e||!e.__esModule?p(o,"default",{value:e,enumerable:!0}):o,e)),E=e=>y(p({},"__esModule",{value:!0}),e);var ee={};$(ee,{addDecorator:()=>_,addParameters:()=>q,clearDecorators:()=>z,configure:()=>Y,forceReRender:()=>Z,getStorybook:()=>Q,raw:()=>X,setAddon:()=>G,storiesOf:()=>J});module.exports=E(ee);var g=m(require("global")),{window:V}=g.default;V.STORYBOOK_ENV="SERVER";var A=require("@storybook/core-client");var S=m(require("global")),u=require("ts-dedent"),d=require("@storybook/preview-web"),{fetch:j,Node:K}=S.default,W=async(e,r,o,n)=>{let t=new URL(`${e}/${r}`);return t.search=new URLSearchParams({...n.globals,...o}).toString(),(await j(t)).text()},B=(e,r)=>{let o={...e};return Object.keys(r).forEach(n=>{let t=r[n],{control:s}=t,l=s&&s.type.toLowerCase(),c=o[n];switch(l){case"date":o[n]=new Date(c).toISOString();break;case"object":o[n]=JSON.stringify(c);break;default:}}),o},h=e=>{};async function w({id:e,title:r,name:o,showMain:n,showError:t,forceRemount:s,storyFn:l,storyContext:c,storyContext:{parameters:R,args:x,argTypes:C}},i){l();let T=B(x,C),{server:{url:k,id:v,fetchStoryHtml:F=W,params:L}}=R,M=v||e,D={...L,...T},a=await F(k,M,D,c);if(n(),typeof a=="string")i.innerHTML=a,(0,d.simulatePageLoad)(i);else if(a instanceof K){if(i.firstChild===a&&s===!1)return;i.innerHTML="",i.appendChild(a),(0,d.simulateDOMContentLoaded)()}else t({title:`Expecting an HTML snippet or DOM node from the story: "${o}" of "${r}".`,description:u.dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var b="server",f=(0,A.start)(w,{render:h}),J=(e,r)=>f.clientApi.storiesOf(e,r).addParameters({framework:b}),Y=(...e)=>f.configure(b,...e),{addDecorator:_,addParameters:q,clearDecorators:z,setAddon:G,getStorybook:Q,raw:X}=f.clientApi,{forceReRender:Z}=f;var O;(O=module==null?void 0:module.hot)==null||O.decline();0&&(module.exports={addDecorator,addParameters,clearDecorators,configure,forceReRender,getStorybook,raw,setAddon,storiesOf});