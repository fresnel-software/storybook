import{a as k}from"./chunk-645ALPPB.mjs";import{a as b,c as g}from"./chunk-EX2QXXYQ.mjs";var S=b((H,p)=>{g();var x=k();p.exports=n;n.displayName="cshtml";n.aliases=["razor"];function n(l){l.register(x),function(s){var d=/\/(?![/*])|\/\/.*[\r\n]|\/\*[^*]*(?:\*(?!\/)[^*]*)*\*\//.source,h=/@(?!")|"(?:[^\r\n\\"]|\\.)*"|@"(?:[^\\"]|""|\\[\s\S])*"(?!")/.source+"|"+/'(?:(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'|(?=[^\\](?!')))/.source;function o(a,y){for(var i=0;i<y;i++)a=a.replace(/<self>/g,function(){return"(?:"+a+")"});return a.replace(/<self>/g,"[^\\s\\S]").replace(/<str>/g,"(?:"+h+")").replace(/<comment>/g,"(?:"+d+")")}var r=o(/\((?:[^()'"@/]|<str>|<comment>|<self>)*\)/.source,2),m=o(/\[(?:[^\[\]'"@/]|<str>|<comment>|<self>)*\]/.source,2),e=o(/\{(?:[^{}'"@/]|<str>|<comment>|<self>)*\}/.source,2),f=o(/<(?:[^<>'"@/]|<str>|<comment>|<self>)*>/.source,2),c=/(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?/.source,t=/(?!\d)[^\s>\/=$<%]+/.source+c+/\s*\/?>/.source,v=/\B@?/.source+"(?:"+/<([a-zA-Z][\w:]*)/.source+c+/\s*>/.source+"(?:"+(/[^<]/.source+"|"+/<\/?(?!\1\b)/.source+t+"|"+o(/<\1/.source+c+/\s*>/.source+"(?:"+(/[^<]/.source+"|"+/<\/?(?!\1\b)/.source+t+"|<self>")+")*"+/<\/\1\s*>/.source,2))+")*"+/<\/\1\s*>/.source+"|"+/</.source+t+")";s.languages.cshtml=s.languages.extend("markup",{});var w=s.languages.insertBefore("csharp","string",{html:{pattern:RegExp(v),greedy:!0,inside:s.languages.cshtml}},{csharp:s.languages.extend("csharp",{})}),u={pattern:/\S[\s\S]*/,alias:"language-csharp",inside:w};s.languages.insertBefore("cshtml","prolog",{"razor-comment":{pattern:/@\*[\s\S]*?\*@/,greedy:!0,alias:"comment"},block:{pattern:RegExp(/(^|[^@])@/.source+"(?:"+[e,/(?:code|functions)\s*/.source+e,/(?:for|foreach|lock|switch|using|while)\s*/.source+r+/\s*/.source+e,/do\s*/.source+e+/\s*while\s*/.source+r+/(?:\s*;)?/.source,/try\s*/.source+e+/\s*catch\s*/.source+r+/\s*/.source+e+/\s*finally\s*/.source+e,/if\s*/.source+r+/\s*/.source+e+"(?:"+/\s*else/.source+"(?:"+/\s+if\s*/.source+r+")?"+/\s*/.source+e+")*"].join("|")+")"),lookbehind:!0,greedy:!0,inside:{keyword:/^@\w*/,csharp:u}},directive:{pattern:/^([ \t]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\s).*/m,lookbehind:!0,greedy:!0,inside:{keyword:/^@\w+/,csharp:u}},value:{pattern:RegExp(/(^|[^@])@/.source+/(?:await\b\s*)?/.source+"(?:"+/\w+\b/.source+"|"+r+")(?:"+/[?!]?\.\w+\b/.source+"|"+r+"|"+m+"|"+f+r+")*"),lookbehind:!0,greedy:!0,alias:"variable",inside:{keyword:/^@/,csharp:u}},"delegate-operator":{pattern:/(^|[^@])@(?=<)/,lookbehind:!0,alias:"operator"}}),s.languages.razor=s.languages.cshtml}(l)}});export{S as a};