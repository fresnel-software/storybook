import{a as c,c as s}from"./chunk-EX2QXXYQ.mjs";var N=c((b,a)=>{s();function l(n){let e={keyword:"rec with let in inherit assert if else then",literal:"true false or and null",built_in:"import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"},t={className:"subst",begin:/\$\{/,end:/\}/,keywords:e},r={begin:/[a-zA-Z0-9-_]+(\s*=)/,returnBegin:!0,relevance:0,contains:[{className:"attr",begin:/\S+/}]},o={className:"string",contains:[t],variants:[{begin:"''",end:"''"},{begin:'"',end:'"'}]},i=[n.NUMBER_MODE,n.HASH_COMMENT_MODE,n.C_BLOCK_COMMENT_MODE,o,r];return t.contains=i,{name:"Nix",aliases:["nixos"],keywords:e,contains:i}}a.exports=l});export default N();
