var i=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(t,r)=>(typeof require!="undefined"?require:t)[r]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});import{dirname as J,join as f}from"path";import{copy as W,writeFile as $,remove as K}from"fs-extra";import M from"express";import{logger as R}from"@storybook/node-logger";import{globalExternals as z}from"@fal-works/esbuild-plugin-global-externals";import{pnpPlugin as Q}from"@yarnpkg/esbuild-plugin-pnp";import X from"esbuild-plugin-alias";import se,{dirname as H,join as q}from"path";import{readFile as D,pathExists as ie}from"fs-extra";import{render as _}from"ejs";var A=async e=>q(H(i.resolve("@storybook/builder-manager/package.json")),"templates",e),B=async e=>{let t=await A(e);return D(t,"utf8")};var F=async(e,t,r,o,s,a,n,l,c,{versionCheck:u,releaseNotesData:w,docsMode:x,previewUrl:O,serverChannelUrl:m})=>{let d=await r,g=await t,b=await e;return _(b,{title:g?`${g} - Storybook`:"Storybook",files:{js:s,css:o},globals:{FEATURES:JSON.stringify(await a,null,2),REFS:JSON.stringify(await n,null,2),LOGLEVEL:JSON.stringify(await l,null,2),DOCS_OPTIONS:JSON.stringify(await c,null,2),VERSIONCHECK:JSON.stringify(JSON.stringify(u),null,2),RELEASE_NOTES_DATA:JSON.stringify(JSON.stringify(w),null,2),PREVIEW_URL:JSON.stringify(O,null,2),SERVER_CHANNEL_URL:JSON.stringify(m,null,2)},head:d?await D(d,"utf8"):""})};import{definitions as N}from"@storybook/ui/dist/globals";import{join as V}from"path";import{getRefs as I}from"@storybook/core-common";var S=e=>{try{return Promise.resolve(i.resolve(e))}catch{return Promise.resolve(!1)}};var P=async e=>{let t=I(e),r=e.presets.apply("features"),o=e.presets.apply("logLevel"),s=e.presets.apply("title"),a=e.presets.apply("docs",{}),n=B("template.ejs"),l=S(V(e.configDir,"manager-head.html")),[c,u]=await Promise.all([L.get(),T(e)]);return{refs:t,features:r,title:s,docsOptions:a,template:n,customHead:l,instance:c,config:u,logLevel:o}};import{writeFile as U,ensureFile as G}from"fs-extra";async function j(e){let t=await Promise.all(p?.outputFiles?.map(async s=>(await G(s.path).then(()=>U(s.path,s.contents)),s.path.replace(e,"./sb-addons")))||[]),r=t.filter(s=>s.endsWith(".mjs"));return{cssFiles:t.filter(s=>s.endsWith(".css")),jsFiles:r}}var p,y,T=async e=>{let[t,r]=await Promise.all([e.presets.apply("managerEntries",[]),S(f(e.configDir,"manager"))]);return{entryPoints:r?[...t,r]:t,outdir:f(e.outputDir||"./","sb-addons"),format:"esm",write:!1,outExtension:{".js":".mjs"},loader:{".js":"jsx",".png":"dataurl",".gif":"dataurl",".jpg":"dataurl",".jpeg":"dataurl",".svg":"dataurl",".webp":"dataurl",".webm":"dataurl"},target:["chrome100"],platform:"browser",bundle:!0,minify:!1,sourcemap:!0,legalComments:"external",plugins:[X({process:i.resolve("process/browser.js"),util:i.resolve("util/util.js"),assert:i.resolve("browser-assert")}),z(N),Q()],define:{"process.env.NODE_ENV":"'production'","process.env":"{}",global:"window",module:"{}"}}},L={get:async()=>{let{build:e}=await import("esbuild");return e}},Y=async function*({startTime:t,options:r,router:o}){R.info("=> Starting manager..");let{config:s,customHead:a,features:n,instance:l,refs:c,template:u,title:w,logLevel:x,docsOptions:O}=await P(r);yield;let m=s.outdir;await K(m),yield,p=await l({...s,watch:!0}),yield;let d=f(J(i.resolve("@storybook/ui/package.json")),"dist");o.use("/sb-addons",M.static(m)),o.use("/sb-manager",M.static(d));let{cssFiles:g,jsFiles:b}=await j(m);yield;let E=await F(u,w,a,g,b,n,c,x,O,r);return yield,o.use("/",({path:v},k,C)=>{v==="/"?k.status(200).send(E):C()}),{bail:ee,stats:{toJson:()=>({})},totalTime:process.hrtime(t)}},Z=async function*({startTime:t,options:r}){if(!r.outputDir)throw new Error("outputDir is required");R.info("=> Building manager..");let{config:o,customHead:s,features:a,instance:n,refs:l,template:c,title:u,logLevel:w,docsOptions:x}=await P(r);yield;let O=o.outdir,m=f(J(i.resolve("@storybook/ui/package.json")),"dist"),d=f(r.outputDir,"sb-manager");p=await n({...o,minify:!0,watch:!1}),yield;let g=W(m,d),{cssFiles:b,jsFiles:E}=await j(O);yield;let v=await F(c,u,s,b,E,a,l,w,x,r);return await Promise.all([$(f(r.outputDir,"index.html"),v),g]),R.trace({message:"=> Manager built",time:process.hrtime(t)}),{toJson:()=>({})}},ee=async()=>{if(y)try{await y.throw(new Error)}catch{}if(p&&p.stop)try{p.stop(),R.warn("Force closed manager build")}catch{R.warn("Unable to close manager build!")}},Te=async e=>{y=Y(e);let t;do t=await y.next();while(!t.done);return t.value},Le=async e=>{y=Z(e);let t;do t=await y.next();while(!t.done);return t.value},Me=[],Je=[];export{ee as bail,Le as build,p as compilation,Me as corePresets,L as executor,T as getConfig,Je as overridePresets,Te as start};
