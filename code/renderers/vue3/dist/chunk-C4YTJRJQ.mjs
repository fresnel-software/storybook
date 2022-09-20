import{h as F}from"vue";import{sanitizeStoryContextUpdate as l}from"@storybook/store";function C(e){return typeof e=="function"?{render:e,name:e.name}:e}function s(e,t){let o=e;return o==null?null:t?{...C(o),components:{...o.components||{},story:t}}:{render(){return F(o)}}}function g(e,t){return t.reduce((o,p)=>m=>{let r,n=p(u=>(r=o({...m,...l(u)}),r),m);return r||(r=o(m)),n===r?r:s(n,r)},o=>s(e(o)))}import{dedent as d}from"ts-dedent";import{createApp as k,h as c}from"vue";var R=(e,t)=>{let{id:o,component:p}=t;if(!p)throw new Error(`Unable to render story ${o} as the component annotation is missing from the default export`);return c(p,e)},i=e=>{},b=e=>{i=e},y=new Map;function A({title:e,name:t,storyFn:o,showMain:p,showError:m,showException:r},n){let u,a=k({unmounted(){y.delete(n)},render(){return y.set(n,a),i(a),c(u)}});if(a.config.errorHandler=r,u=o(),!u){m({title:`Expecting a Vue component from the story: "${t}" of "${e}".`,description:d`
      Did you forget to return the Vue component from the story?
      Use "() => ({ template: '<my-comp></my-comp>' })" or "() => ({ components: MyComp, template: '<my-comp></my-comp>' })" when defining the story.
      `});return}p(),y.has(n)&&y.get(n).unmount(),a.mount(n)}export{g as a,R as b,b as c,A as d};
