var y=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var f=(r,o,e,p)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of m(o))!x.call(r,t)&&t!==e&&y(r,t,{get:()=>o[t],enumerable:!(p=k(o,t))||p.enumerable});return r},i=(r,o,e)=>(f(r,o,"default"),e&&f(e,o,"default"));var d=r=>f(y({},"__esModule",{value:!0}),r);var b={};module.exports=d(b);i(b,require("@storybook/react"),module.exports);
