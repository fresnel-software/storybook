import{a as d}from"./chunk-LZH5L77F.mjs";import{a as u,c as r}from"./chunk-EX2QXXYQ.mjs";var g=u((c,l)=>{r();var s=d();l.exports=o;o.displayName="django";o.aliases=["jinja2"];function o(t){t.register(s),function(e){e.languages.django={comment:/^\{#[\s\S]*?#\}$/,tag:{pattern:/(^\{%[+-]?\s*)\w+/,lookbehind:!0,alias:"keyword"},delimiter:{pattern:/^\{[{%][+-]?|[+-]?[}%]\}$/,alias:"punctuation"},string:{pattern:/("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},filter:{pattern:/(\|)\w+/,lookbehind:!0,alias:"function"},test:{pattern:/(\bis\s+(?:not\s+)?)(?!not\b)\w+/,lookbehind:!0,alias:"function"},function:/\b[a-z_]\w+(?=\s*\()/i,keyword:/\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,number:/\b\d+(?:\.\d+)?\b/,boolean:/[Ff]alse|[Nn]one|[Tt]rue/,variable:/\b\w+\b/,punctuation:/[{}[\](),.:;]/};var i=/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}|\{#[\s\S]*?#\}/g,n=e.languages["markup-templating"];e.hooks.add("before-tokenize",function(a){n.buildPlaceholders(a,"django",i)}),e.hooks.add("after-tokenize",function(a){n.tokenizePlaceholders(a,"django")}),e.languages.jinja2=e.languages.django,e.hooks.add("before-tokenize",function(a){n.buildPlaceholders(a,"jinja2",i)}),e.hooks.add("after-tokenize",function(a){n.tokenizePlaceholders(a,"jinja2")})}(t)}});export{g as a};
