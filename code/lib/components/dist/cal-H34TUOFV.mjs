import{a as l,c as o}from"./chunk-EX2QXXYQ.mjs";var g=l((N,r)=>{o();function M(e){let n="div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var",c="false true",i=[e.C_LINE_COMMENT_MODE,e.COMMENT(/\{/,/\}/,{relevance:0}),e.COMMENT(/\(\*/,/\*\)/,{relevance:10})],t={className:"string",begin:/'/,end:/'/,contains:[{begin:/''/}]},s={className:"string",begin:/(#\d+)+/},d={className:"number",begin:"\\b\\d+(\\.\\d+)?(DT|D|T)",relevance:0},E={className:"string",begin:'"',end:'"'},a={className:"function",beginKeywords:"procedure",end:/[:;]/,keywords:"procedure|10",contains:[e.TITLE_MODE,{className:"params",begin:/\(/,end:/\)/,keywords:n,contains:[t,s]}].concat(i)},T={className:"class",begin:"OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",returnBegin:!0,contains:[e.TITLE_MODE,a]};return{name:"C/AL",case_insensitive:!0,keywords:{keyword:n,literal:c},illegal:/\/\*/,contains:[t,s,d,E,e.NUMBER_MODE,T,a]}}r.exports=M});export default g();
