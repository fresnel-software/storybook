import{a as p}from"./chunk-HKSD7XQF.mjs";import a from"path";import i from"fs";var l=["@storybook/react"],u={builder:"@storybook/builder-vite"};function y(){let e=a.resolve("package.json");if(!i.existsSync(e))return!1;let o=i.readFileSync(e,"utf8");return JSON.parse(o)}var k=async(e,{presets:o})=>{let{plugins:n=[]}=e,{reactDocgen:s,reactDocgenTypescriptOptions:c}=await o.apply("typescript",{}),r;try{let t=y();r=t&&(t.devDependencies?.typescript||t.dependencies?.typescript)}catch{r=!1}if(s==="react-docgen-typescript"&&r)n.push(p("@joshwooding/vite-plugin-react-docgen-typescript")(c));else if(s){let{reactDocgen:t}=await import("./react-docgen-R77EHCCO.mjs");n.unshift(t())}return e};export{l as addons,u as core,y as readPackageJson,k as viteFinal};