import"./chunk-HKSD7XQF.mjs";import y from"path";import{createFilter as D}from"@rollup/pluginutils";import{parse as N,handlers as O,resolver as k,importers as b}from"react-docgen";import E from"magic-string";import{namedTypes as r}from"ast-types";import{getNameOrValue as i,isReactForwardRefCall as x}from"react-docgen/dist/utils";function s(o,e,a){if(r.ClassDeclaration.check(e.node)||r.FunctionDeclaration.check(e.node))o.set("actualName",i(e.get("id")));else if(r.ArrowFunctionExpression.check(e.node)||r.FunctionExpression.check(e.node)||x(e,a)){let t=e;for(;t.parent;){if(r.VariableDeclarator.check(t.parent.node)){o.set("actualName",i(t.parent.get("id")));return}if(r.AssignmentExpression.check(t.parent.node)){let n=t.parent.get("left");if(r.Identifier.check(n.node)||r.Literal.check(n.node)){o.set("actualName",i(n));return}}t=t.parent}o.set("actualName","")}}var R=Object.values(O).map(o=>o),I=k.findAllExportedComponentDefinitions,j=b.makeFsImporter(),v=[...R,s];function $({include:o=/\.(mjs|tsx?|jsx?)$/,exclude:e=[/node_modules\/.*/]}={}){let a=process.cwd(),t=D(o,e);return{name:"storybook:react-docgen-plugin",enforce:"pre",async transform(n,p){let d=y.relative(a,p);if(!!t(d))try{let m=N(n,I,v,{importer:j,filename:p}),c=new E(n);return m.forEach(f=>{let{actualName:l,...g}=f;if(l){let u=JSON.stringify(g);c.append(`;${l}.__docgenInfo=${u}`)}}),{code:c.toString(),map:c.generateMap()}}catch{}}}}export{$ as reactDocgen};
