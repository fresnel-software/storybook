import{a as o}from"./chunk-JVA5Y325.mjs";import c from"@storybook/react-docgen-typescript-plugin";import{hasDocsOrControls as p}from"@storybook/docs-tools";var l=async(t,e)=>{if(!p(e))return t;let s=await e.presets.apply("typescript",{}),{reactDocgen:r}=s||{};return typeof r!="string"?t:{...t,overrides:[...t?.overrides||[],{test:r==="react-docgen"?/\.(cjs|mjs|tsx?|jsx?)$/:/\.(cjs|mjs|jsx?)$/,plugins:[[o.resolve("babel-plugin-react-docgen"),{DOC_GEN_COLLECTION_NAME:"STORYBOOK_REACT_CLASSES"}]]}]}},u=async(t,e)=>{if(!p(e))return t;let s=await e.presets.apply("typescript",{}),{reactDocgen:r,reactDocgenTypescriptOptions:n}=s||{};return r!=="react-docgen-typescript"?t:{...t,plugins:[...t.plugins||[],new c({...n,savePropValueAsString:!0})]}};export{l as babel,u as webpackFinal};
