import{dedent as F}from"ts-dedent";import f from"vue";var u="STORYBOOK_COMPONENT",c="STORYBOOK_VALUES",i=new Map,R=t=>{if(i.has(t))return i.get(t);let o=new f({beforeDestroy(){i.delete(t)},data(){return{[u]:void 0,[c]:{}}},render(e){i.set(t,o);let p=this[u]?[e(this[u])]:void 0;return e("div",{attrs:{id:"storybook-root"}},p)}});return o},b=(t,o)=>{let{id:e,component:p,argTypes:s}=o,r=p;if(!r)throw new Error(`Unable to render story ${e} as the component annotation is missing from the default export`);let n="component";return r.name?n=f.config.isReservedTag&&f.config.isReservedTag(r.name)?`sb-${r.name}`:r.name:r.__docgenInfo?.displayName&&(n=r.__docgenInfo?.displayName),{props:Object.keys(s),components:{[n]:r},template:`<${n} v-bind="$props" />`}};function h({title:t,name:o,storyFn:e,storyContext:{args:p},showMain:s,showError:r,showException:n,forceRemount:m},y){let a=R(y);f.config.errorHandler=n;let d=e();if(!d){r({title:`Expecting a Vue component from the story: "${o}" of "${t}".`,description:F`
        Did you forget to return the Vue component from the story?
        Use "() => ({ template: '<my-comp></my-comp>' })" or "() => ({ components: MyComp, template: '<my-comp></my-comp>' })" when defining the story.
      `});return}(!a[u]||m)&&(a[u]=d),a[c]={...d.options[c],...p},i.has(y)||a.$mount(y),s()}import g from"vue";import{sanitizeStoryContextUpdate as x}from"@storybook/store";function S(t){let o=t&&t.toString().match(/^\s*function (\w+)/);return o?o[1]:""}function k({type:t,default:o}){return typeof o=="function"&&S(t)!=="Function"?o.call():o}function l(t){return Object.entries(t.options.props||{}).map(([o,e])=>({[o]:k(e)})).reduce((o,e)=>({...o,...e}),{})}var O="STORYBOOK_WRAPS";function C(t,o){let e;if(typeof t=="string")e={template:t};else if(t!=null)e=t;else return null;if(!e._isVue)o&&(e.components={...e.components||{},story:o}),e=g.extend(e);else if(e.options[O])return e;return g.extend({[O]:e,[c]:{...o?o.options[c]:{},...l(e)},functional:!0,render(p,{data:s,parent:r,children:n}){return p(e,{...s,props:{...s.props||{},...r.$root[c]}},n)}})}function P(t,o){return o.reduce((e,p)=>s=>{let r,n=p(m=>(r=e({...s,...x(m)}),r),s);return r||(r=e(s)),n===r?r:C(n,r)},e=>C(t(e)))}export{b as a,h as b,P as c};
