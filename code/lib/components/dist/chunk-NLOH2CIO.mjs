import{a as S,c as o}from"./chunk-EX2QXXYQ.mjs";var h=S((B,d)=>{o();d.exports=l;l.displayName="jsx";l.aliases=[];function l(j){(function(a){var p=a.util.clone(a.languages.javascript),x=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,y=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,u=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function c(e,t){return e=e.replace(/<S>/g,function(){return x}).replace(/<BRACES>/g,function(){return y}).replace(/<SPREAD>/g,function(){return u}),RegExp(e,t)}u=c(u).source,a.languages.jsx=a.languages.extend("markup",p),a.languages.jsx.tag.pattern=c(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),a.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,a.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,a.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,a.languages.jsx.tag.inside.comment=p.comment,a.languages.insertBefore("inside","attr-name",{spread:{pattern:c(/<SPREAD>/.source),inside:a.languages.jsx}},a.languages.jsx.tag),a.languages.insertBefore("inside","special-attr",{script:{pattern:c(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:a.languages.jsx}}},a.languages.jsx.tag);var g=function(e){return e?typeof e=="string"?e:typeof e.content=="string"?e.content:e.content.map(g).join(""):""},i=function(e){for(var t=[],s=0;s<e.length;s++){var n=e[s],f=!1;if(typeof n!="string"&&(n.type==="tag"&&n.content[0]&&n.content[0].type==="tag"?n.content[0].content[0].content==="</"?t.length>0&&t[t.length-1].tagName===g(n.content[0].content[1])&&t.pop():n.content[n.content.length-1].content==="/>"||t.push({tagName:g(n.content[0].content[1]),openedBraces:0}):t.length>0&&n.type==="punctuation"&&n.content==="{"?t[t.length-1].openedBraces++:t.length>0&&t[t.length-1].openedBraces>0&&n.type==="punctuation"&&n.content==="}"?t[t.length-1].openedBraces--:f=!0),(f||typeof n=="string")&&t.length>0&&t[t.length-1].openedBraces===0){var r=g(n);s<e.length-1&&(typeof e[s+1]=="string"||e[s+1].type==="plain-text")&&(r+=g(e[s+1]),e.splice(s+1,1)),s>0&&(typeof e[s-1]=="string"||e[s-1].type==="plain-text")&&(r=g(e[s-1])+r,e.splice(s-1,1),s--),e[s]=new a.Token("plain-text",r,null,r)}n.content&&typeof n.content!="string"&&i(n.content)}};a.hooks.add("after-tokenize",function(e){e.language!=="jsx"&&e.language!=="tsx"||i(e.tokens)})})(j)}});export{h as a};
