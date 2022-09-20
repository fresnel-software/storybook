import O from"global";import A from"global";var{window:y}=A;y.STORYBOOK_ENV="web-components";import{start as b}from"@storybook/core-client";import u from"global";import{dedent as g}from"ts-dedent";import{render as C}from"lit-html";import{isTemplateResult as S}from"lit-html/directive-helpers.js";import{simulatePageLoad as d,simulateDOMContentLoaded as w}from"@storybook/preview-web";var{Node:T}=u;function c({storyFn:o,kind:i,name:a,showMain:s,showError:f,forceRemount:p},e){let t=o();if(s(),S(t)){(p||!e.querySelector('[id="root-inner"]'))&&(e.innerHTML='<div id="root-inner"></div>');let l=e.querySelector('[id="root-inner"]');C(t,l),d(e)}else if(typeof t=="string")e.innerHTML=t,d(e);else if(t instanceof T){if(e.firstChild===t&&!p)return;e.innerHTML="",e.appendChild(t),w()}else f({title:`Expecting an HTML snippet or DOM node from the story: "${a}" of "${i}".`,description:g`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var m="web-components",r=b(c),W=(o,i)=>r.clientApi.storiesOf(o,i).addParameters({framework:m}),N=(...o)=>r.configure(m,...o),P=r.clientApi.addDecorator,H=r.clientApi.addParameters,K=r.clientApi.clearDecorators,Y=r.clientApi.setAddon,B=r.forceReRender,U=r.clientApi.getStorybook,I=r.clientApi.raw;function V(o){if(!o)return!1;if(typeof o=="string")return!0;throw new Error('Provided component needs to be a string. e.g. component: "my-element"')}function q(o){if(!o)return!1;if(o.tags&&Array.isArray(o.tags)||o.modules&&Array.isArray(o.modules))return!0;throw new Error(`You need to setup valid meta data in your config.js via setCustomElements().
    See the readme of addon-docs for web components for more details.`)}function $(o){window.__STORYBOOK_CUSTOM_ELEMENTS__=o}function J(o){window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__=o}function z(){return window.__STORYBOOK_CUSTOM_ELEMENTS__||window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__}var{window:_,EventSource:x}=O;module&&module.hot&&module.hot.decline&&(module.hot.decline(),new x("__webpack_hmr").addEventListener("message",function(a){try{let{action:s}=JSON.parse(a.data);s==="built"&&_.location.reload()}catch{}}));export{c as a,W as b,N as c,P as d,H as e,K as f,Y as g,B as h,U as i,I as j,V as k,q as l,$ as m,J as n,z as o};
