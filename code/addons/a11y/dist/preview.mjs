import{a as w,b as y,c as i,g as o,h as S}from"./chunk-M5RWOKLV.mjs";import E from"global";import{addons as O}from"@storybook/addons";var u=w((b,n)=>{"use strict";i();S();var{document:T,window:_}=E;n&&n.hot&&n.hot.decline&&n.hot.decline();var a=O.getChannel(),r=!1,c,N=async t=>{let{manual:e}=await f(t);e||await l(t)},l=async t=>{c=t;try{let e=await f(t);if(!r){r=!0,a.emit(o.RUNNING);let s=(await import("axe-core")).default,{element:g="#storybook-root",config:m,options:d={}}=e,p=T.querySelector(g);s.reset(),m&&s.configure(m);let R=await s.run(p,d);c===t?a.emit(o.RESULT,R):(r=!1,l(c))}}catch(e){a.emit(o.ERROR,e)}finally{r=!1}},f=async t=>{let{parameters:e}=await _.__STORYBOOK_STORY_STORE__.loadStory({storyId:t})||{};return e.a11y||{config:{},options:{}}};a.on(o.REQUEST,N);a.on(o.MANUAL,l)});i();var q=y(u());