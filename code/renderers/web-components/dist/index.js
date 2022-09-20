var T=Object.create;var p=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var x=Object.getPrototypeOf,R=Object.prototype.hasOwnProperty;var h=(e,o)=>{for(var r in o)p(e,r,{get:o[r],enumerable:!0})},f=(e,o,r,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of M(o))!R.call(e,a)&&a!==r&&p(e,a,{get:()=>o[a],enumerable:!(i=b(o,a))||i.enumerable});return e};var c=(e,o,r)=>(r=e!=null?T(x(e)):{},f(o||!e||!e.__esModule?p(r,"default",{value:e,enumerable:!0}):r,e)),E=e=>f(p({},"__esModule",{value:!0}),e);var J={};h(J,{addDecorator:()=>N,addParameters:()=>P,clearDecorators:()=>F,configure:()=>v,forceReRender:()=>K,getCustomElements:()=>q,getStorybook:()=>W,isValidComponent:()=>B,isValidMetaData:()=>U,raw:()=>Y,setAddon:()=>H,setCustomElements:()=>I,setCustomElementsManifest:()=>V,storiesOf:()=>D});module.exports=E(J);var O=c(require("global"));var m=c(require("global")),{window:L}=m.default;L.STORYBOOK_ENV="web-components";var S=require("@storybook/core-client");var u=c(require("global")),y=require("ts-dedent"),A=require("lit-html"),C=require("lit-html/directive-helpers.js"),d=require("@storybook/preview-web"),{Node:k}=u.default;function w({storyFn:e,kind:o,name:r,showMain:i,showError:a,forceRemount:l},t){let s=e();if(i(),(0,C.isTemplateResult)(s)){(l||!t.querySelector('[id="root-inner"]'))&&(t.innerHTML='<div id="root-inner"></div>');let g=t.querySelector('[id="root-inner"]');(0,A.render)(s,g),(0,d.simulatePageLoad)(t)}else if(typeof s=="string")t.innerHTML=s,(0,d.simulatePageLoad)(t);else if(s instanceof k){if(t.firstChild===s&&!l)return;t.innerHTML="",t.appendChild(s),(0,d.simulateDOMContentLoaded)()}else a({title:`Expecting an HTML snippet or DOM node from the story: "${r}" of "${o}".`,description:y.dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var _="web-components",n=(0,S.start)(w),D=(e,o)=>n.clientApi.storiesOf(e,o).addParameters({framework:_}),v=(...e)=>n.configure(_,...e),N=n.clientApi.addDecorator,P=n.clientApi.addParameters,F=n.clientApi.clearDecorators,H=n.clientApi.setAddon,K=n.forceReRender,W=n.clientApi.getStorybook,Y=n.clientApi.raw;function B(e){if(!e)return!1;if(typeof e=="string")return!0;throw new Error('Provided component needs to be a string. e.g. component: "my-element"')}function U(e){if(!e)return!1;if(e.tags&&Array.isArray(e.tags)||e.modules&&Array.isArray(e.modules))return!0;throw new Error(`You need to setup valid meta data in your config.js via setCustomElements().
    See the readme of addon-docs for web components for more details.`)}function I(e){window.__STORYBOOK_CUSTOM_ELEMENTS__=e}function V(e){window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__=e}function q(){return window.__STORYBOOK_CUSTOM_ELEMENTS__||window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__}var{window:$,EventSource:j}=O.default;module&&module.hot&&module.hot.decline&&(module.hot.decline(),new j("__webpack_hmr").addEventListener("message",function(r){try{let{action:i}=JSON.parse(r.data);i==="built"&&$.location.reload()}catch{}}));0&&(module.exports={addDecorator,addParameters,clearDecorators,configure,forceReRender,getCustomElements,getStorybook,isValidComponent,isValidMetaData,raw,setAddon,setCustomElements,setCustomElementsManifest,storiesOf});
