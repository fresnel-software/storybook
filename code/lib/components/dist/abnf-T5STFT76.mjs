import{a as u,c as a}from"./chunk-EX2QXXYQ.mjs";var M=u((g,t)=>{a();function d(e){return e?typeof e=="string"?e:e.source:null}function b(...e){return e.map(o=>d(o)).join("")}function A(e){let n={ruleDeclaration:/^[a-zA-Z][a-zA-Z0-9-]*/,unexpectedChars:/[!@#$^&',?+~`|:]/},o=["ALPHA","BIT","CHAR","CR","CRLF","CTL","DIGIT","DQUOTE","HEXDIG","HTAB","LF","LWSP","OCTET","SP","VCHAR","WSP"],s=e.COMMENT(/;/,/$/),c={className:"symbol",begin:/%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/},i={className:"symbol",begin:/%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/},r={className:"symbol",begin:/%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/},l={className:"symbol",begin:/%[si]/},m={className:"attribute",begin:b(n.ruleDeclaration,/(?=\s*=)/)};return{name:"Augmented Backus-Naur Form",illegal:n.unexpectedChars,keywords:o,contains:[m,s,c,i,r,l,e.QUOTE_STRING_MODE,e.NUMBER_MODE]}}t.exports=A});export default M();