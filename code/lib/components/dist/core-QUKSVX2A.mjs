import{a as ne,c as P}from"./chunk-EX2QXXYQ.mjs";var Ge=ne((En,$e)=>{P();function _e(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(function(t){var n=e[t];typeof n=="object"&&!Object.isFrozen(n)&&_e(n)}),e}var De=_e,ht=_e;De.default=ht;var ie=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function F(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function C(e,...t){let n=Object.create(null);for(let s in e)n[s]=e[s];return t.forEach(function(s){for(let g in s)n[g]=s[g]}),n}var dt="</span>",Ae=e=>!!e.kind,pe=class{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=F(t)}openNode(t){if(!Ae(t))return;let n=t.kind;t.sublanguage||(n=`${this.classPrefix}${n}`),this.span(n)}closeNode(t){!Ae(t)||(this.buffer+=dt)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},V=class{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let n={kind:t,children:[]};this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(s=>this._walk(t,s)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&(!t.children||(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{V._collapse(n)})))}},Ee=class extends V{constructor(t){super(),this.options=t}addKeyword(t,n){t!==""&&(this.openNode(n),this.addText(t),this.closeNode())}addText(t){t!==""&&this.add(t)}addSublanguage(t,n){let s=t.root;s.kind=n,s.sublanguage=!0,this.add(s)}toHTML(){return new pe(this,this.options).value()}finalize(){return!0}};function pt(e){return new RegExp(e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")}function q(e){return e?typeof e=="string"?e:e.source:null}function Et(...e){return e.map(n=>q(n)).join("")}function bt(...e){return"("+e.map(n=>q(n)).join("|")+")"}function xt(e){return new RegExp(e.toString()+"|").exec("").length-1}function _t(e,t){let n=e&&e.exec(t);return n&&n.index===0}var vt=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Nt(e,t="|"){let n=0;return e.map(s=>{n+=1;let g=n,h=q(s),b="";for(;h.length>0;){let i=vt.exec(h);if(!i){b+=h;break}b+=h.substring(0,i.index),h=h.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?b+="\\"+String(Number(i[1])+g):(b+=i[0],i[0]==="("&&n++)}return b}).map(s=>`(${s})`).join(t)}var Rt=/\b\B/,Te="[a-zA-Z]\\w*",ve="[a-zA-Z_]\\w*",Ne="\\b\\d+(\\.\\d+)?",Pe="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ce="\\b(0b[01]+)",yt="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",wt=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Et(t,/.*\b/,e.binary,/\b.*/)),C({className:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,s)=>{n.index!==0&&s.ignoreMatch()}},e)},X={begin:"\\\\[\\s\\S]",relevance:0},Mt={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[X]},mt={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[X]},He={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},se=function(e,t,n={}){let s=C({className:"comment",begin:e,end:t,contains:[]},n);return s.contains.push(He),s.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",relevance:0}),s},Ot=se("//","$"),At=se("/\\*","\\*/"),kt=se("#","$"),St={className:"number",begin:Ne,relevance:0},Lt={className:"number",begin:Pe,relevance:0},It={className:"number",begin:Ce,relevance:0},Bt={className:"number",begin:Ne+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},Dt={begin:/(?=\/[^/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[X,{begin:/\[/,end:/\]/,relevance:0,contains:[X]}]}]},Tt={className:"title",begin:Te,relevance:0},Pt={className:"title",begin:ve,relevance:0},Ct={begin:"\\.\\s*"+ve,relevance:0},Ht=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})},re=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Rt,IDENT_RE:Te,UNDERSCORE_IDENT_RE:ve,NUMBER_RE:Ne,C_NUMBER_RE:Pe,BINARY_NUMBER_RE:Ce,RE_STARTERS_RE:yt,SHEBANG:wt,BACKSLASH_ESCAPE:X,APOS_STRING_MODE:Mt,QUOTE_STRING_MODE:mt,PHRASAL_WORDS_MODE:He,COMMENT:se,C_LINE_COMMENT_MODE:Ot,C_BLOCK_COMMENT_MODE:At,HASH_COMMENT_MODE:kt,NUMBER_MODE:St,C_NUMBER_MODE:Lt,BINARY_NUMBER_MODE:It,CSS_NUMBER_MODE:Bt,REGEXP_MODE:Dt,TITLE_MODE:Tt,UNDERSCORE_TITLE_MODE:Pt,METHOD_GUARD:Ct,END_SAME_AS_BEGIN:Ht});function Ut(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function jt(e,t){!t||!e.beginKeywords||(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Ut,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function $t(e,t){!Array.isArray(e.illegal)||(e.illegal=bt(...e.illegal))}function Gt(e,t){if(!!e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Kt(e,t){e.relevance===void 0&&(e.relevance=1)}var Ft=["of","and","for","in","not","or","if","then","parent","list","value"],zt="keyword";function Ue(e,t,n=zt){let s={};return typeof e=="string"?g(n,e.split(" ")):Array.isArray(e)?g(n,e):Object.keys(e).forEach(function(h){Object.assign(s,Ue(e[h],t,h))}),s;function g(h,b){t&&(b=b.map(i=>i.toLowerCase())),b.forEach(function(i){let a=i.split("|");s[a[0]]=[h,Wt(a[0],a[1])]})}}function Wt(e,t){return t?Number(t):Vt(e)?0:1}function Vt(e){return Ft.includes(e.toLowerCase())}function qt(e,{plugins:t}){function n(i,a){return new RegExp(q(i),"m"+(e.case_insensitive?"i":"")+(a?"g":""))}class s{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,a]),this.matchAt+=xt(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(l=>l[1]);this.matcherRe=n(Nt(a),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(a);if(!l)return null;let u=l.findIndex((w,j)=>j>0&&w!==void 0),_=this.matchIndexes[u];return l.splice(0,u),Object.assign(l,_)}}class g{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let l=new s;return this.rules.slice(a).forEach(([u,_])=>l.addRule(u,_)),l.compile(),this.multiRegexes[a]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,l){this.rules.push([a,l]),l.type==="begin"&&this.count++}exec(a){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let u=l.exec(a);if(this.resumingScanAtSamePosition()&&!(u&&u.index===this.lastIndex)){let _=this.getMatcher(0);_.lastIndex=this.lastIndex+1,u=_.exec(a)}return u&&(this.regexIndex+=u.position+1,this.regexIndex===this.count&&this.considerAll()),u}}function h(i){let a=new g;return i.contains.forEach(l=>a.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function b(i,a){let l=i;if(i.isCompiled)return l;[Gt].forEach(_=>_(i,a)),e.compilerExtensions.forEach(_=>_(i,a)),i.__beforeBegin=null,[jt,$t,Kt].forEach(_=>_(i,a)),i.isCompiled=!0;let u=null;if(typeof i.keywords=="object"&&(u=i.keywords.$pattern,delete i.keywords.$pattern),i.keywords&&(i.keywords=Ue(i.keywords,e.case_insensitive)),i.lexemes&&u)throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");return u=u||i.lexemes||/\w+/,l.keywordPatternRe=n(u,!0),a&&(i.begin||(i.begin=/\B|\b/),l.beginRe=n(i.begin),i.endSameAsBegin&&(i.end=i.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=n(i.end)),l.terminatorEnd=q(i.end)||"",i.endsWithParent&&a.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(l.illegalRe=n(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(_){return Xt(_==="self"?i:_)})),i.contains.forEach(function(_){b(_,l)}),i.starts&&b(i.starts,a),l.matcher=h(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=C(e.classNameAliases||{}),b(e)}function je(e){return e?e.endsWithParent||je(e.starts):!1}function Xt(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return C(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:je(e)?C(e,{starts:e.starts?C(e.starts):null}):Object.isFrozen(e)?C(e):e}var Yt="10.7.3";function Jt(e){return Boolean(e||e==="")}function Zt(e){let t={props:["language","code","autodetect"],data:function(){return{detectedLanguage:"",unknownLanguage:!1}},computed:{className(){return this.unknownLanguage?"":"hljs "+this.detectedLanguage},highlighted(){if(!this.autoDetect&&!e.getLanguage(this.language))return console.warn(`The language "${this.language}" you specified could not be found.`),this.unknownLanguage=!0,F(this.code);let s={};return this.autoDetect?(s=e.highlightAuto(this.code),this.detectedLanguage=s.language):(s=e.highlight(this.language,this.code,this.ignoreIllegals),this.detectedLanguage=this.language),s.value},autoDetect(){return!this.language||Jt(this.autodetect)},ignoreIllegals(){return!0}},render(s){return s("pre",{},[s("code",{class:this.className,domProps:{innerHTML:this.highlighted}})])}};return{Component:t,VuePlugin:{install(s){s.component("highlightjs",t)}}}}var Qt={"after:highlightElement":({el:e,result:t,text:n})=>{let s=ke(e);if(!s.length)return;let g=document.createElement("div");g.innerHTML=t.value,t.value=en(s,ke(g),n)}};function be(e){return e.nodeName.toLowerCase()}function ke(e){let t=[];return function n(s,g){for(let h=s.firstChild;h;h=h.nextSibling)h.nodeType===3?g+=h.nodeValue.length:h.nodeType===1&&(t.push({event:"start",offset:g,node:h}),g=n(h,g),be(h).match(/br|hr|img|input/)||t.push({event:"stop",offset:g,node:h}));return g}(e,0),t}function en(e,t,n){let s=0,g="",h=[];function b(){return!e.length||!t.length?e.length?e:t:e[0].offset!==t[0].offset?e[0].offset<t[0].offset?e:t:t[0].event==="start"?e:t}function i(u){function _(w){return" "+w.nodeName+'="'+F(w.value)+'"'}g+="<"+be(u)+[].map.call(u.attributes,_).join("")+">"}function a(u){g+="</"+be(u)+">"}function l(u){(u.event==="start"?i:a)(u.node)}for(;e.length||t.length;){let u=b();if(g+=F(n.substring(s,u[0].offset)),s=u[0].offset,u===e){h.reverse().forEach(a);do l(u.splice(0,1)[0]),u=b();while(u===e&&u.length&&u[0].offset===s);h.reverse().forEach(i)}else u[0].event==="start"?h.push(u[0].node):h.pop(),l(u.splice(0,1)[0])}return g+F(n.substr(s))}var Se={},he=e=>{console.error(e)},Le=(e,...t)=>{console.log(`WARN: ${e}`,...t)},m=(e,t)=>{Se[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Se[`${e}/${t}`]=!0)},de=F,Ie=C,Be=Symbol("nomatch"),tn=function(e){let t=Object.create(null),n=Object.create(null),s=[],g=!0,h=/(^(<[^>]+>|\t|)+|\n)/gm,b="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:null,__emitter:Ee};function l(r){return a.noHighlightRe.test(r)}function u(r){let o=r.className+" ";o+=r.parentNode?r.parentNode.className:"";let E=a.languageDetectRe.exec(o);if(E){let v=I(E[1]);return v||(Le(b.replace("{}",E[1])),Le("Falling back to no-highlight mode for this block.",r)),v?E[1]:"no-highlight"}return o.split(/\s+/).find(v=>l(v)||I(v))}function _(r,o,E,v){let R="",$="";typeof o=="object"?(R=r,E=o.ignoreIllegals,$=o.language,v=void 0):(m("10.7.0","highlight(lang, code, ...args) has been deprecated."),m("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),$=r,R=o);let A={code:R,language:$};Z("before:highlight",A);let k=A.result?A.result:w(A.language,A.code,E,v);return k.code=A.code,Z("after:highlight",k),k}function w(r,o,E,v){function R(c,f){let p=G.case_insensitive?f[0].toLowerCase():f[0];return Object.prototype.hasOwnProperty.call(c.keywords,p)&&c.keywords[p]}function $(){if(!d.keywords){y.addText(N);return}let c=0;d.keywordPatternRe.lastIndex=0;let f=d.keywordPatternRe.exec(N),p="";for(;f;){p+=N.substring(c,f.index);let x=R(d,f);if(x){let[M,te]=x;if(y.addText(p),p="",ee+=te,M.startsWith("_"))p+=f[0];else{let ft=G.classNameAliases[M]||M;y.addKeyword(f[0],ft)}}else p+=f[0];c=d.keywordPatternRe.lastIndex,f=d.keywordPatternRe.exec(N)}p+=N.substr(c),y.addText(p)}function A(){if(N==="")return;let c=null;if(typeof d.subLanguage=="string"){if(!t[d.subLanguage]){y.addText(N);return}c=w(d.subLanguage,N,!0,Oe[d.subLanguage]),Oe[d.subLanguage]=c.top}else c=D(N,d.subLanguage.length?d.subLanguage:null);d.relevance>0&&(ee+=c.relevance),y.addSublanguage(c.emitter,c.language)}function k(){d.subLanguage!=null?A():$(),N=""}function S(c){return c.className&&y.openNode(G.classNameAliases[c.className]||c.className),d=Object.create(c,{parent:{value:d}}),d}function T(c,f,p){let x=_t(c.endRe,p);if(x){if(c["on:end"]){let M=new ie(c);c["on:end"](f,M),M.isMatchIgnored&&(x=!1)}if(x){for(;c.endsParent&&c.parent;)c=c.parent;return c}}if(c.endsWithParent)return T(c.parent,f,p)}function lt(c){return d.matcher.regexIndex===0?(N+=c[0],1):(fe=!0,0)}function ot(c){let f=c[0],p=c.rule,x=new ie(p),M=[p.__beforeBegin,p["on:begin"]];for(let te of M)if(!!te&&(te(c,x),x.isMatchIgnored))return lt(f);return p&&p.endSameAsBegin&&(p.endRe=pt(f)),p.skip?N+=f:(p.excludeBegin&&(N+=f),k(),!p.returnBegin&&!p.excludeBegin&&(N=f)),S(p),p.returnBegin?0:f.length}function ct(c){let f=c[0],p=o.substr(c.index),x=T(d,c,p);if(!x)return Be;let M=d;M.skip?N+=f:(M.returnEnd||M.excludeEnd||(N+=f),k(),M.excludeEnd&&(N=f));do d.className&&y.closeNode(),!d.skip&&!d.subLanguage&&(ee+=d.relevance),d=d.parent;while(d!==x.parent);return x.starts&&(x.endSameAsBegin&&(x.starts.endRe=x.endRe),S(x.starts)),M.returnEnd?0:f.length}function ut(){let c=[];for(let f=d;f!==G;f=f.parent)f.className&&c.unshift(f.className);c.forEach(f=>y.openNode(f))}let Q={};function me(c,f){let p=f&&f[0];if(N+=c,p==null)return k(),0;if(Q.type==="begin"&&f.type==="end"&&Q.index===f.index&&p===""){if(N+=o.slice(f.index,f.index+1),!g){let x=new Error("0 width match regex");throw x.languageName=r,x.badRule=Q.rule,x}return 1}if(Q=f,f.type==="begin")return ot(f);if(f.type==="illegal"&&!E){let x=new Error('Illegal lexeme "'+p+'" for mode "'+(d.className||"<unnamed>")+'"');throw x.mode=d,x}else if(f.type==="end"){let x=ct(f);if(x!==Be)return x}if(f.type==="illegal"&&p==="")return 1;if(ge>1e5&&ge>f.index*3)throw new Error("potential infinite loop, way more iterations than matches");return N+=p,p.length}let G=I(r);if(!G)throw he(b.replace("{}",r)),new Error('Unknown language: "'+r+'"');let gt=qt(G,{plugins:s}),ue="",d=v||gt,Oe={},y=new a.__emitter(a);ut();let N="",ee=0,K=0,ge=0,fe=!1;try{for(d.matcher.considerAll();;){ge++,fe?fe=!1:d.matcher.considerAll(),d.matcher.lastIndex=K;let c=d.matcher.exec(o);if(!c)break;let f=o.substring(K,c.index),p=me(f,c);K=c.index+p}return me(o.substr(K)),y.closeAllNodes(),y.finalize(),ue=y.toHTML(),{relevance:Math.floor(ee),value:ue,language:r,illegal:!1,emitter:y,top:d}}catch(c){if(c.message&&c.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:c.message,context:o.slice(K-100,K+100),mode:c.mode},sofar:ue,relevance:0,value:de(o),emitter:y};if(g)return{illegal:!1,relevance:0,value:de(o),emitter:y,language:r,top:d,errorRaised:c};throw c}}function j(r){let o={relevance:0,emitter:new a.__emitter(a),value:de(r),illegal:!1,top:i};return o.emitter.addText(r),o}function D(r,o){o=o||a.languages||Object.keys(t);let E=j(r),v=o.filter(I).filter(Me).map(S=>w(S,r,!1));v.unshift(E);let R=v.sort((S,T)=>{if(S.relevance!==T.relevance)return T.relevance-S.relevance;if(S.language&&T.language){if(I(S.language).supersetOf===T.language)return 1;if(I(T.language).supersetOf===S.language)return-1}return 0}),[$,A]=R,k=$;return k.second_best=A,k}function Y(r){return a.tabReplace||a.useBR?r.replace(h,o=>o===`
`?a.useBR?"<br>":o:a.tabReplace?o.replace(/\t/g,a.tabReplace):o):r}function O(r,o,E){let v=o?n[o]:E;r.classList.add("hljs"),v&&r.classList.add(v)}let le={"before:highlightElement":({el:r})=>{a.useBR&&(r.innerHTML=r.innerHTML.replace(/\n/g,"").replace(/<br[ /]*>/g,`
`))},"after:highlightElement":({result:r})=>{a.useBR&&(r.value=r.value.replace(/\n/g,"<br>"))}},W=/^(<[^>]+>|\t)+/gm,Xe={"after:highlightElement":({result:r})=>{a.tabReplace&&(r.value=r.value.replace(W,o=>o.replace(/\t/g,a.tabReplace)))}};function J(r){let o=null,E=u(r);if(l(E))return;Z("before:highlightElement",{el:r,language:E}),o=r;let v=o.textContent,R=E?_(v,{language:E,ignoreIllegals:!0}):D(v);Z("after:highlightElement",{el:r,result:R,text:v}),r.innerHTML=R.value,O(r,E,R.language),r.result={language:R.language,re:R.relevance,relavance:R.relevance},R.second_best&&(r.second_best={language:R.second_best.language,re:R.second_best.relevance,relavance:R.second_best.relevance})}function Ye(r){r.useBR&&(m("10.3.0","'useBR' will be removed entirely in v11.0"),m("10.3.0","Please see https://github.com/highlightjs/highlight.js/issues/2559")),a=Ie(a,r)}let oe=()=>{if(oe.called)return;oe.called=!0,m("10.6.0","initHighlighting() is deprecated.  Use highlightAll() instead."),document.querySelectorAll("pre code").forEach(J)};function Je(){m("10.6.0","initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."),ce=!0}let ce=!1;function ye(){if(document.readyState==="loading"){ce=!0;return}document.querySelectorAll("pre code").forEach(J)}function Ze(){ce&&ye()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",Ze,!1);function Qe(r,o){let E=null;try{E=o(e)}catch(v){if(he("Language definition for '{}' could not be registered.".replace("{}",r)),g)he(v);else throw v;E=i}E.name||(E.name=r),t[r]=E,E.rawDefinition=o.bind(null,e),E.aliases&&we(E.aliases,{languageName:r})}function et(r){delete t[r];for(let o of Object.keys(n))n[o]===r&&delete n[o]}function tt(){return Object.keys(t)}function nt(r){m("10.4.0","requireLanguage will be removed entirely in v11."),m("10.4.0","Please see https://github.com/highlightjs/highlight.js/pull/2844");let o=I(r);if(o)return o;throw new Error("The '{}' language is required, but not loaded.".replace("{}",r))}function I(r){return r=(r||"").toLowerCase(),t[r]||t[n[r]]}function we(r,{languageName:o}){typeof r=="string"&&(r=[r]),r.forEach(E=>{n[E.toLowerCase()]=o})}function Me(r){let o=I(r);return o&&!o.disableAutodetect}function rt(r){r["before:highlightBlock"]&&!r["before:highlightElement"]&&(r["before:highlightElement"]=o=>{r["before:highlightBlock"](Object.assign({block:o.el},o))}),r["after:highlightBlock"]&&!r["after:highlightElement"]&&(r["after:highlightElement"]=o=>{r["after:highlightBlock"](Object.assign({block:o.el},o))})}function it(r){rt(r),s.push(r)}function Z(r,o){let E=r;s.forEach(function(v){v[E]&&v[E](o)})}function st(r){return m("10.2.0","fixMarkup will be removed entirely in v11.0"),m("10.2.0","Please see https://github.com/highlightjs/highlight.js/issues/2534"),Y(r)}function at(r){return m("10.7.0","highlightBlock will be removed entirely in v12.0"),m("10.7.0","Please use highlightElement now."),J(r)}Object.assign(e,{highlight:_,highlightAuto:D,highlightAll:ye,fixMarkup:st,highlightElement:J,highlightBlock:at,configure:Ye,initHighlighting:oe,initHighlightingOnLoad:Je,registerLanguage:Qe,unregisterLanguage:et,listLanguages:tt,getLanguage:I,registerAliases:we,requireLanguage:nt,autoDetection:Me,inherit:Ie,addPlugin:it,vuePlugin:Zt(e).VuePlugin}),e.debugMode=function(){g=!1},e.safeMode=function(){g=!0},e.versionString=Yt;for(let r in re)typeof re[r]=="object"&&De(re[r]);return Object.assign(e,re),e.addPlugin(le),e.addPlugin(Qt),e.addPlugin(Xe),e},nn=tn({});$e.exports=nn});var Ke=ne((bn,Re)=>{P();(function(){var e;typeof Re<"u"?e=Re.exports=s:e=function(){return this||(0,eval)("this")}(),e.format=s,e.vsprintf=n,typeof console<"u"&&typeof console.log=="function"&&(e.printf=t);function t(){console.log(s.apply(null,arguments))}function n(g,h){return s.apply(null,[g].concat(h))}function s(g){for(var h=1,b=[].slice.call(arguments),i=0,a=g.length,l="",u,_=!1,w,j,D=!1,Y,O=function(){return b[h++]},le=function(){for(var W="";/\d/.test(g[i]);)W+=g[i++],u=g[i];return W.length>0?parseInt(W):null};i<a;++i)if(u=g[i],_)switch(_=!1,u=="."?(D=!1,u=g[++i]):u=="0"&&g[i+1]=="."?(D=!0,i+=2,u=g[i]):D=!0,Y=le(),u){case"b":l+=parseInt(O(),10).toString(2);break;case"c":w=O(),typeof w=="string"||w instanceof String?l+=w:l+=String.fromCharCode(parseInt(w,10));break;case"d":l+=parseInt(O(),10);break;case"f":j=String(parseFloat(O()).toFixed(Y||6)),l+=D?j:j.replace(/^0/,"");break;case"j":l+=JSON.stringify(O());break;case"o":l+="0"+parseInt(O(),10).toString(8);break;case"s":l+=O();break;case"x":l+="0x"+parseInt(O(),10).toString(16);break;case"X":l+="0x"+parseInt(O(),10).toString(16).toUpperCase();break;default:l+=u;break}else u==="%"?_=!0:l+=u;return l}})()});var ze=ne((xn,Fe)=>{"use strict";P();var rn=Ke(),H=U(Error);Fe.exports=H;H.eval=U(EvalError);H.range=U(RangeError);H.reference=U(ReferenceError);H.syntax=U(SyntaxError);H.type=U(TypeError);H.uri=U(URIError);H.create=U;function U(e){return t.displayName=e.displayName||e.name,t;function t(n){return n&&(n=rn.apply(null,arguments)),new e(n)}}});var pn=ne(z=>{P();var L=Ge(),ae=ze();z.highlight=Ve;z.highlightAuto=sn;z.registerLanguage=an;z.listLanguages=ln;z.registerAlias=on;B.prototype.addText=gn;B.prototype.addKeyword=cn;B.prototype.addSublanguage=un;B.prototype.openNode=fn;B.prototype.closeNode=hn;B.prototype.closeAllNodes=qe;B.prototype.finalize=qe;B.prototype.toHTML=dn;var We="hljs-";function Ve(e,t,n){var s=L.configure({}),g=n||{},h=g.prefix,b;if(typeof e!="string")throw ae("Expected `string` for name, got `%s`",e);if(!L.getLanguage(e))throw ae("Unknown language: `%s` is not registered",e);if(typeof t!="string")throw ae("Expected `string` for value, got `%s`",t);if(h==null&&(h=We),L.configure({__emitter:B,classPrefix:h}),b=L.highlight(t,{language:e,ignoreIllegals:!0}),L.configure(s||{}),b.errorRaised)throw b.errorRaised;return{relevance:b.relevance,language:b.language,value:b.emitter.rootNode.children}}function sn(e,t){var n=t||{},s=n.subset||L.listLanguages(),g=n.prefix,h=s.length,b=-1,i,a,l,u;if(g==null&&(g=We),typeof e!="string")throw ae("Expected `string` for value, got `%s`",e);for(a={relevance:0,language:null,value:[]},i={relevance:0,language:null,value:[]};++b<h;)u=s[b],L.getLanguage(u)&&(l=Ve(u,e,t),l.language=u,l.relevance>a.relevance&&(a=l),l.relevance>i.relevance&&(a=i,i=l));return a.language&&(i.secondBest=a),i}function an(e,t){L.registerLanguage(e,t)}function ln(){return L.listLanguages()}function on(e,t){var n=e,s;t&&(n={},n[e]=t);for(s in n)L.registerAliases(n[s],{languageName:s})}function B(e){this.options=e,this.rootNode={children:[]},this.stack=[this.rootNode]}function cn(e,t){this.openNode(t),this.addText(e),this.closeNode()}function un(e,t){var n=this.stack,s=n[n.length-1],g=e.rootNode.children,h=t?{type:"element",tagName:"span",properties:{className:[t]},children:g}:g;s.children=s.children.concat(h)}function gn(e){var t=this.stack,n,s;e!==""&&(n=t[t.length-1],s=n.children[n.children.length-1],s&&s.type==="text"?s.value+=e:n.children.push({type:"text",value:e}))}function fn(e){var t=this.stack,n=this.options.classPrefix+e,s=t[t.length-1],g={type:"element",tagName:"span",properties:{className:[n]},children:[]};s.children.push(g),t.push(g)}function hn(){this.stack.pop()}function dn(){return""}function qe(){}});export default pn();
