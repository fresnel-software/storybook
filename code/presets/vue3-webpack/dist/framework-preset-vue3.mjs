import{a as r}from"./chunk-HKSD7XQF.mjs";import{VueLoaderPlugin as o}from"vue-loader";import{DefinePlugin as s}from"webpack";var i=e=>({...e,plugins:[...e.plugins,new o,new s({__VUE_OPTIONS_API__:JSON.stringify(!0),__VUE_PROD_DEVTOOLS__:JSON.stringify(!0)})],module:{...e.module,rules:[...e.module.rules,{test:/\.vue$/,loader:r.resolve("vue-loader"),options:{}},{test:/\.ts$/,use:[{loader:r.resolve("ts-loader"),options:{transpileOnly:!0,appendTsSuffixTo:[/\.vue$/]}}]},{test:/\.tsx$/,use:[{loader:r.resolve("ts-loader"),options:{transpileOnly:!0,appendTsxSuffixTo:[/\.vue$/]}}]}]},resolve:{...e.resolve,extensions:[...e.resolve.extensions,".vue"],alias:{...e.resolve.alias,vue$:r.resolve("vue/dist/vue.esm-bundler.js")}}});export{i as webpack};
