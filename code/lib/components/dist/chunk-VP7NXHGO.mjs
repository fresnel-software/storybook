import{a as r,c as a}from"./chunk-EX2QXXYQ.mjs";var u=r((s,i)=>{a();i.exports=e;e.displayName="solutionFile";e.aliases=[];function e(o){(function(n){var t={pattern:/\{[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}\}/i,alias:"constant",inside:{punctuation:/[{}]/}};n.languages["solution-file"]={comment:{pattern:/#.*/,greedy:!0},string:{pattern:/"[^"\r\n]*"|'[^'\r\n]*'/,greedy:!0,inside:{guid:t}},object:{pattern:/^([ \t]*)(?:([A-Z]\w*)\b(?=.*(?:\r\n?|\n)(?:\1[ \t].*(?:\r\n?|\n))*\1End\2(?=[ \t]*$))|End[A-Z]\w*(?=[ \t]*$))/m,lookbehind:!0,greedy:!0,alias:"keyword"},property:{pattern:/^([ \t]*)(?!\s)[^\r\n"#=()]*[^\s"#=()](?=\s*=)/m,lookbehind:!0,inside:{guid:t}},guid:t,number:/\b\d+(?:\.\d+)*\b/,boolean:/\b(?:FALSE|TRUE)\b/,operator:/=/,punctuation:/[(),]/},n.languages.sln=n.languages["solution-file"]})(o)}});export{u as a};
