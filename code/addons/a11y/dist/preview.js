"use strict";var w=Object.create;var R=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var h=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var U=(t,o)=>()=>(t&&(o=t(t=0)),o);var P=(t,o)=>()=>(o||t((o={exports:{}}).exports,o),o.exports);var $=(t,o,n,c)=>{if(o&&typeof o=="object"||typeof o=="function")for(let e of _(o))!O.call(t,e)&&e!==n&&R(t,e,{get:()=>o[e],enumerable:!(c=T(o,e))||c.enumerable});return t};var m=(t,o,n)=>(n=t!=null?w(h(t)):{},$(o||!t||!t.__esModule?R(n,"default",{value:t,enumerable:!0}):n,t));var r,G,x,L,b,D,q,a,E=U(()=>{"use strict";r="storybook/a11y",G=`${r}/panel`,x=`${r}/result`,L=`${r}/request`,b=`${r}/running`,D=`${r}/error`,q=`${r}/manual`,a={RESULT:x,REQUEST:L,RUNNING:b,ERROR:D,MANUAL:q}});var N=P((Q,s)=>{"use strict";var p=m(require("global")),g=require("@storybook/addons");E();var{document:M,window:Y}=p.default;s&&s.hot&&s.hot.decline&&s.hot.decline();var i=g.addons.getChannel(),l=!1,f,k=async t=>{let{manual:o}=await y(t);o||await u(t)},u=async t=>{f=t;try{let o=await y(t);if(!l){l=!0,i.emit(a.RUNNING);let n=(await import("axe-core")).default,{element:c="#storybook-root",config:e,options:S={}}=o,d=M.querySelector(c);n.reset(),e&&n.configure(e);let A=await n.run(d,S);f===t?i.emit(a.RESULT,A):(l=!1,u(f))}}catch(o){i.emit(a.ERROR,o)}finally{l=!1}},y=async t=>{let{parameters:o}=await Y.__STORYBOOK_STORY_STORE__.loadStory({storyId:t})||{};return o.a11y||{config:{},options:{}}};i.on(a.REQUEST,k);i.on(a.MANUAL,u)});var V=m(N());
