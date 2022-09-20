var Vt=Object.create;var pt=Object.defineProperty;var Jt=Object.getOwnPropertyDescriptor;var Xt=Object.getOwnPropertyNames;var Yt=Object.getPrototypeOf,Zt=Object.prototype.hasOwnProperty;var Ut=(t,o,e,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of Xt(o))!Zt.call(t,a)&&a!==e&&pt(t,a,{get:()=>o[a],enumerable:!(r=Jt(o,a))||r.enumerable});return t};var T=(t,o,e)=>(e=t!=null?Vt(Yt(t)):{},Ut(o||!t||!t.__esModule?pt(e,"default",{value:t,enumerable:!0}):e,t));var H=require("@storybook/addons");var ot="storybook/interactions",dt=`${ot}/panel`;var U=T(require("global")),i=T(require("react")),q=require("@storybook/api"),O=require("@storybook/core-events"),x=require("@storybook/instrumenter");var C=T(require("react")),F=require("@storybook/components"),Z=require("@storybook/instrumenter"),$=require("@storybook/theming"),Nt=require("polished");var c=T(require("react")),g=require("@storybook/components"),ft=require("@storybook/instrumenter"),E=require("@storybook/theming");var ut=T(require("react")),N=require("@storybook/instrumenter"),M=require("@storybook/theming"),qt=M.styled.div(({theme:t,status:o})=>{let e={[N.CallStates.DONE]:t.color.positive,[N.CallStates.ERROR]:t.color.negative,[N.CallStates.ACTIVE]:t.color.warning,[N.CallStates.WAITING]:t.color.warning}[o];return{padding:"4px 6px 4px 8px;",borderRadius:"4px",backgroundColor:e,color:"white",fontFamily:M.typography.fonts.base,textTransform:"uppercase",fontSize:M.typography.size.s1,letterSpacing:3,fontWeight:M.typography.weight.bold,width:65,textAlign:"center"}}),gt=({status:t})=>{let o={[N.CallStates.DONE]:"Pass",[N.CallStates.ERROR]:"Fail",[N.CallStates.ACTIVE]:"Runs",[N.CallStates.WAITING]:"Runs"}[t];return ut.default.createElement(qt,{status:t},o)};var Kt=E.styled.div(({theme:t})=>({background:t.background.app,borderBottom:`1px solid ${t.appBorderColor}`,position:"sticky",top:0,zIndex:1})),Qt=E.styled.nav(({theme:t})=>({height:40,display:"flex",alignItems:"center",justifyContent:"space-between",paddingLeft:15})),to=(0,E.styled)(g.Button)(({theme:t})=>({borderRadius:4,padding:6,color:t.textMutedColor,"&:not(:disabled)":{"&:hover,&:focus-visible":{color:t.color.secondary}}})),j=(0,E.styled)(g.TooltipNote)(({theme:t})=>({fontFamily:t.typography.fonts.base})),W=(0,E.styled)(g.IconButton)(({theme:t})=>({color:t.color.mediumdark,margin:"0 3px"})),oo=(0,E.styled)(g.Separator)({marginTop:0}),eo=(0,E.styled)(g.P)(({theme:t})=>({color:t.textMutedColor,justifyContent:"flex-end",textAlign:"right",whiteSpace:"nowrap",marginTop:"auto",marginBottom:1,paddingRight:15,fontSize:13})),mt=E.styled.div({display:"flex",alignItems:"center"}),no=(0,E.styled)(W)({marginLeft:9}),ro=(0,E.styled)(to)({marginLeft:9,marginRight:9,marginBottom:1,lineHeight:"12px"}),so=(0,E.styled)(W)(({theme:t,animating:o,disabled:e})=>({opacity:e?.5:1,svg:{animation:o&&`${t.animation.rotate360} 200ms ease-out`}})),yt=({controls:t,controlStates:o,status:e,storyFileName:r,onScrollToEnd:a,isRerunAnimating:l,setIsRerunAnimating:s})=>{let d=e===ft.CallStates.ERROR?"Scroll to error":"Scroll to end";return c.default.createElement(Kt,null,c.default.createElement(g.Bar,null,c.default.createElement(Qt,null,c.default.createElement(mt,null,c.default.createElement(gt,{status:e}),c.default.createElement(ro,{onClick:a,disabled:!a},d),c.default.createElement(oo,null),c.default.createElement(g.WithTooltip,{hasChrome:!1,tooltip:c.default.createElement(j,{note:"Go to start"})},c.default.createElement(no,{"aria-label":"Go to start",containsIcon:!0,onClick:t.start,disabled:!o.start},c.default.createElement(g.Icons,{icon:"rewind"}))),c.default.createElement(g.WithTooltip,{hasChrome:!1,tooltip:c.default.createElement(j,{note:"Go back"})},c.default.createElement(W,{"aria-label":"Go back",containsIcon:!0,onClick:t.back,disabled:!o.back},c.default.createElement(g.Icons,{icon:"playback"}))),c.default.createElement(g.WithTooltip,{hasChrome:!1,tooltip:c.default.createElement(j,{note:"Go forward"})},c.default.createElement(W,{"aria-label":"Go forward",containsIcon:!0,onClick:t.next,disabled:!o.next},c.default.createElement(g.Icons,{icon:"playnext"}))),c.default.createElement(g.WithTooltip,{hasChrome:!1,tooltip:c.default.createElement(j,{note:"Go to end"})},c.default.createElement(W,{"aria-label":"Go to end",containsIcon:!0,onClick:t.end,disabled:!o.end},c.default.createElement(g.Icons,{icon:"fastforward"}))),c.default.createElement(g.WithTooltip,{hasChrome:!1,tooltip:c.default.createElement(j,{note:"Rerun"})},c.default.createElement(so,{"aria-label":"Rerun",containsIcon:!0,onClick:t.rerun,onAnimationEnd:()=>s(!1),animating:l,disabled:l},c.default.createElement(g.Icons,{icon:"sync"})))),r&&c.default.createElement(mt,null,c.default.createElement(eo,null,r)))))};var y=T(require("react")),P=require("@storybook/components"),B=require("@storybook/instrumenter"),I=require("@storybook/theming"),Tt=require("polished");var u=T(require("react")),z=require("@storybook/theming");var Ct=require("@devtools-ds/object-inspector"),J=require("@storybook/theming"),n=T(require("react")),ao={base:"#444",nullish:"#7D99AA",string:"#16B242",number:"#5D40D0",boolean:"#f41840",objectkey:"#698394",instance:"#A15C20",function:"#EA7509",muted:"#7D99AA",tag:{name:"#6F2CAC",suffix:"#1F99E5"},date:"#459D9C",error:{name:"#D43900",message:"#444"},regex:{source:"#A15C20",flags:"#EA7509"},meta:"#EA7509",method:"#0271B6"},lo={base:"#eee",nullish:"#aaa",string:"#5FE584",number:"#6ba5ff",boolean:"#ff4191",objectkey:"#accfe6",instance:"#E3B551",function:"#E3B551",muted:"#aaa",tag:{name:"#f57bff",suffix:"#8EB5FF"},date:"#70D4D3",error:{name:"#f40",message:"#eee"},regex:{source:"#FAD483",flags:"#E3B551"},meta:"#FAD483",method:"#5EC1FF"},b=()=>{let{base:t}=(0,J.useTheme)();return t==="dark"?lo:ao},io=/[^A-Z0-9]/i,bt=/[\s.,…]+$/gm,ht=(t,o)=>{if(t.length<=o)return t;for(let e=o-1;e>=0;e-=1)if(io.test(t[e])&&e>10)return`${t.slice(0,e).replace(bt,"")}\u2026`;return`${t.slice(0,o).replace(bt,"")}\u2026`},co=t=>{try{return JSON.stringify(t,null,1)}catch{return String(t)}},St=(t,o)=>t.flatMap((e,r)=>r===t.length-1?[e]:[e,n.default.cloneElement(o,{key:`sep${r}`})]),v=({value:t,nested:o,showObjectInspector:e,callsById:r,...a})=>{switch(!0){case t===null:return n.default.createElement(po,{...a});case t===void 0:return n.default.createElement(uo,{...a});case Array.isArray(t):return n.default.createElement(yo,{...a,value:t,callsById:r});case typeof t=="string":return n.default.createElement(go,{...a,value:t});case typeof t=="number":return n.default.createElement(mo,{...a,value:t});case typeof t=="boolean":return n.default.createElement(fo,{...a,value:t});case Object.prototype.hasOwnProperty.call(t,"__date__"):return n.default.createElement(Io,{...a,...t.__date__});case Object.prototype.hasOwnProperty.call(t,"__error__"):return n.default.createElement(xo,{...a,...t.__error__});case Object.prototype.hasOwnProperty.call(t,"__regexp__"):return n.default.createElement(Eo,{...a,...t.__regexp__});case Object.prototype.hasOwnProperty.call(t,"__function__"):return n.default.createElement(ho,{...a,...t.__function__});case Object.prototype.hasOwnProperty.call(t,"__symbol__"):return n.default.createElement(_o,{...a,...t.__symbol__});case Object.prototype.hasOwnProperty.call(t,"__element__"):return n.default.createElement(So,{...a,...t.__element__});case Object.prototype.hasOwnProperty.call(t,"__class__"):return n.default.createElement(Co,{...a,...t.__class__});case Object.prototype.hasOwnProperty.call(t,"__callId__"):return n.default.createElement(X,{call:r.get(t.__callId__),callsById:r});case Object.prototype.toString.call(t)==="[object Object]":return n.default.createElement(bo,{value:t,showInspector:e,...a});default:return n.default.createElement(ko,{value:t,...a})}},po=t=>{let o=b();return n.default.createElement("span",{style:{color:o.nullish},...t},"null")},uo=t=>{let o=b();return n.default.createElement("span",{style:{color:o.nullish},...t},"undefined")},go=({value:t,...o})=>{let e=b();return n.default.createElement("span",{style:{color:e.string},...o},JSON.stringify(ht(t,50)))},mo=({value:t,...o})=>{let e=b();return n.default.createElement("span",{style:{color:e.number},...o},t)},fo=({value:t,...o})=>{let e=b();return n.default.createElement("span",{style:{color:e.boolean},...o},String(t))},yo=({value:t,nested:o=!1,callsById:e})=>{let r=b();if(o)return n.default.createElement("span",{style:{color:r.base}},"[\u2026]");let a=t.slice(0,3).map(s=>n.default.createElement(v,{key:JSON.stringify(s),value:s,nested:!0,callsById:e})),l=St(a,n.default.createElement("span",null,", "));return t.length<=3?n.default.createElement("span",{style:{color:r.base}},"[",l,"]"):n.default.createElement("span",{style:{color:r.base}},"(",t.length,") [",l,", \u2026]")},bo=({showInspector:t,value:o,nested:e=!1})=>{let r=(0,J.useTheme)().base==="dark",a=b();if(t)return n.default.createElement(n.default.Fragment,null,n.default.createElement(Ct.ObjectInspector,{id:"interactions-object-inspector",data:o,includePrototypes:!1,colorScheme:r?"dark":"light"}));if(e)return n.default.createElement("span",{style:{color:a.base}},"{\u2026}");let l=St(Object.entries(o).slice(0,2).map(([s,d])=>n.default.createElement(n.Fragment,{key:s},n.default.createElement("span",{style:{color:a.objectkey}},s,": "),n.default.createElement(v,{value:d,nested:!0}))),n.default.createElement("span",null,", "));return Object.keys(o).length<=2?n.default.createElement("span",{style:{color:a.base}},"{ ",l," }"):n.default.createElement("span",{style:{color:a.base}},"(",Object.keys(o).length,") ","{ ",l,", \u2026 }")},Co=({name:t})=>{let o=b();return n.default.createElement("span",{style:{color:o.instance}},t)},ho=({name:t})=>{let o=b();return t?n.default.createElement("span",{style:{color:o.function}},t):n.default.createElement("span",{style:{color:o.nullish,fontStyle:"italic"}},"anonymous")},So=({prefix:t,localName:o,id:e,classNames:r=[],innerText:a})=>{let l=t?`${t}:${o}`:o,s=b();return n.default.createElement("span",{style:{wordBreak:"keep-all"}},n.default.createElement("span",{key:`${l}_lt`,style:{color:s.muted}},"<"),n.default.createElement("span",{key:`${l}_tag`,style:{color:s.tag.name}},l),n.default.createElement("span",{key:`${l}_suffix`,style:{color:s.tag.suffix}},e?`#${e}`:r.reduce((d,f)=>`${d}.${f}`,"")),n.default.createElement("span",{key:`${l}_gt`,style:{color:s.muted}},">"),!e&&r.length===0&&a&&n.default.createElement(n.default.Fragment,null,n.default.createElement("span",{key:`${l}_text`},a),n.default.createElement("span",{key:`${l}_close_lt`,style:{color:s.muted}},"<"),n.default.createElement("span",{key:`${l}_close_tag`,style:{color:s.tag.name}},"/",l),n.default.createElement("span",{key:`${l}_close_gt`,style:{color:s.muted}},">")))},Io=({value:t})=>{let[o,e,r]=t.split(/[T.Z]/),a=b();return n.default.createElement("span",{style:{whiteSpace:"nowrap",color:a.date}},o,n.default.createElement("span",{style:{opacity:.7}},"T"),e==="00:00:00"?n.default.createElement("span",{style:{opacity:.7}},e):e,r==="000"?n.default.createElement("span",{style:{opacity:.7}},".",r):`.${r}`,n.default.createElement("span",{style:{opacity:.7}},"Z"))},xo=({name:t,message:o})=>{let e=b();return n.default.createElement("span",{style:{color:e.error.name}},t,o&&": ",o&&n.default.createElement("span",{style:{color:e.error.message},title:o.length>50?o:""},ht(o,50)))},Eo=({flags:t,source:o})=>{let e=b();return n.default.createElement("span",{style:{whiteSpace:"nowrap",color:e.regex.flags}},"/",n.default.createElement("span",{style:{color:e.regex.source}},o),"/",t)},_o=({description:t})=>{let o=b();return n.default.createElement("span",{style:{whiteSpace:"nowrap",color:o.instance}},"Symbol(",t&&n.default.createElement("span",{style:{color:o.meta}},'"',t,'"'),")")},ko=({value:t})=>{let o=b();return n.default.createElement("span",{style:{color:o.meta}},co(t))},wo=({label:t})=>{let o=b(),{typography:e}=(0,J.useTheme)();return n.default.createElement("span",{style:{color:o.base,fontFamily:e.fonts.base,fontSize:e.size.s2-1}},t)},X=({call:t,callsById:o})=>{if(!t)return null;if(t.method==="step"&&t.path.length===0)return n.default.createElement(wo,{label:t.args[0]});let e=t.path.flatMap((l,s)=>{let d=l.__callId__;return[d?n.default.createElement(X,{key:`elem${s}`,call:o.get(d),callsById:o}):n.default.createElement("span",{key:`elem${s}`},l),n.default.createElement("wbr",{key:`wbr${s}`}),n.default.createElement("span",{key:`dot${s}`},".")]}),r=t.args.flatMap((l,s,d)=>{let f=n.default.createElement(v,{key:`node${s}`,value:l,callsById:o});return s<d.length-1?[f,n.default.createElement("span",{key:`comma${s}`},",\xA0"),n.default.createElement("wbr",{key:`wbr${s}`})]:[f]}),a=b();return n.default.createElement(n.default.Fragment,null,n.default.createElement("span",{style:{color:a.base}},e),n.default.createElement("span",{style:{color:a.method}},t.method),n.default.createElement("span",{style:{color:a.base}},"(",n.default.createElement("wbr",null),r,n.default.createElement("wbr",null),")"))};var It=(t,o=0)=>{for(let e=o,r=1;e<t.length;e+=1)if(t[e]==="("?r+=1:t[e]===")"&&(r-=1),r===0)return t.slice(o,e);return""},et=t=>{try{return t==="undefined"?void 0:JSON.parse(t)}catch{return t}},Ao=z.styled.span(({theme:t})=>({color:t.color.positive})),To=z.styled.span(({theme:t})=>({color:t.color.negative})),nt=({value:t,parsed:o})=>o?u.default.createElement(v,{showObjectInspector:!0,value:t,style:{color:"#D43900"}}):u.default.createElement(To,null,t),rt=({value:t,parsed:o})=>o?typeof t=="string"&&t.startsWith("called with")?u.default.createElement(u.default.Fragment,null,t):u.default.createElement(v,{showObjectInspector:!0,value:t,style:{color:"#16B242"}}):u.default.createElement(Ao,null,t),xt=({message:t})=>{let o=t.split(`
`);return u.default.createElement("pre",{style:{margin:0,padding:"8px 10px 8px 36px",fontSize:z.typography.size.s1}},o.flatMap((e,r)=>{if(e.startsWith("expect(")){let m=It(e,7),h=m&&7+m.length,S=m&&e.slice(h).match(/\.(to|last|nth)[A-Z]\w+\(/);if(S){let _=h+S.index+S[0].length,k=It(e,_);if(k)return["expect(",u.default.createElement(nt,{key:`received_${m}`,value:m}),e.slice(h,_),u.default.createElement(rt,{key:`expected_${k}`,value:k}),e.slice(_+k.length),u.default.createElement("br",{key:`br${r}`})]}}if(e.match(/^\s*- /))return[u.default.createElement(rt,{key:e+r,value:e}),u.default.createElement("br",{key:`br${r}`})];if(e.match(/^\s*\+ /))return[u.default.createElement(nt,{key:e+r,value:e}),u.default.createElement("br",{key:`br${r}`})];let[,a,l]=e.match(/^(Expected|Received): (.*)$/)||[];if(a&&l)return a==="Expected"?["Expected: ",u.default.createElement(rt,{key:e+r,value:et(l),parsed:!0}),u.default.createElement("br",{key:`br${r}`})]:["Received: ",u.default.createElement(nt,{key:e+r,value:et(l),parsed:!0}),u.default.createElement("br",{key:`br${r}`})];let[,s,d]=e.match(/(Expected number|Received number|Number) of calls: (\d+)$/i)||[];if(s&&d)return[`${s} of calls: `,u.default.createElement(v,{key:e+r,value:Number(d)}),u.default.createElement("br",{key:`br${r}`})];let[,f]=e.match(/^Received has value: (.+)$/)||[];return f?["Received has value: ",u.default.createElement(v,{key:e+r,value:et(f)}),u.default.createElement("br",{key:`br${r}`})]:[u.default.createElement("span",{key:e+r},e),u.default.createElement("br",{key:`br${r}`})]}))};var _t=T(require("react")),kt=require("@storybook/components"),A=require("@storybook/instrumenter"),wt=require("@storybook/theming"),At=require("polished");var Oo={pure:{gray:{500:"#CCCCCC"}}},No={colors:Oo},Et=No;var{colors:{pure:{gray:vo}}}=Et,Bo=(0,wt.styled)(kt.Icons)(({theme:t,status:o})=>{let e={[A.CallStates.DONE]:t.color.positive,[A.CallStates.ERROR]:t.color.negative,[A.CallStates.ACTIVE]:t.color.secondary,[A.CallStates.WAITING]:(0,At.transparentize)(.5,vo[500])}[o];return{width:o===A.CallStates.WAITING?6:12,height:o===A.CallStates.WAITING?6:12,color:e,justifySelf:"center"}}),Y=({status:t,className:o})=>{let e={[A.CallStates.DONE]:"check",[A.CallStates.ERROR]:"stopalt",[A.CallStates.ACTIVE]:"play",[A.CallStates.WAITING]:"circle"}[t];return _t.default.createElement(Bo,{"data-testid":`icon-${t}`,status:t,icon:e,className:o})};var Po=I.styled.div(()=>({fontFamily:I.typography.fonts.mono,fontSize:I.typography.size.s1,overflowWrap:"break-word",inlineSize:"calc( 100% - 40px )"})),$o=(0,I.styled)("div",{shouldForwardProp:t=>!["call","pausedAt"].includes(t.toString())})(({theme:t,call:o})=>({position:"relative",display:"flex",flexDirection:"column",borderBottom:`1px solid ${t.appBorderColor}`,fontFamily:I.typography.fonts.base,fontSize:13,...o.status===B.CallStates.ERROR&&{backgroundColor:t.base==="dark"?(0,Tt.transparentize)(.93,t.color.negative):t.background.warning},paddingLeft:o.ancestors.length*20}),({theme:t,call:o,pausedAt:e})=>e===o.id&&{"&::before":{content:'""',position:"absolute",top:-5,zIndex:1,borderTop:"4.5px solid transparent",borderLeft:`7px solid ${t.color.warning}`,borderBottom:"4.5px solid transparent"},"&::after":{content:'""',position:"absolute",top:-1,zIndex:1,width:"100%",borderTop:`1.5px solid ${t.color.warning}`}}),Do=I.styled.div(({theme:t,isInteractive:o})=>({display:"flex","&:hover":o?{}:{background:t.background.hoverable}})),Mo=(0,I.styled)("button",{shouldForwardProp:t=>!["call"].includes(t.toString())})(({theme:t,disabled:o,call:e})=>({flex:1,display:"grid",background:"none",border:0,gridTemplateColumns:"15px 1fr",alignItems:"center",minHeight:40,margin:0,padding:"8px 15px",textAlign:"start",cursor:o||e.status===B.CallStates.ERROR?"default":"pointer","&:focus-visible":{outline:0,boxShadow:`inset 3px 0 0 0 ${e.status===B.CallStates.ERROR?t.color.warning:t.color.secondary}`,background:e.status===B.CallStates.ERROR?"transparent":t.background.hoverable},"& > div":{opacity:e.status===B.CallStates.WAITING?.5:1}})),Fo=I.styled.div({padding:6}),Lo=(0,I.styled)(P.IconButton)(({theme:t})=>({color:t.color.mediumdark,margin:"0 3px"})),jo=(0,I.styled)(P.TooltipNote)(({theme:t})=>({fontFamily:t.typography.fonts.base})),Wo=(0,I.styled)("div")(({theme:t})=>({padding:"8px 10px 8px 36px",fontSize:I.typography.size.s1,color:t.color.defaultText,pre:{margin:0,padding:0}})),zo=({exception:t})=>{if(t.message.startsWith("expect("))return y.createElement(xt,{...t});let o=t.message.split(`

`),e=o.length>1;return y.createElement(Wo,null,y.createElement("pre",null,o[0]),e&&y.createElement("p",null,"See the full stack trace in the browser console."))},Ot=({call:t,callsById:o,controls:e,controlStates:r,childCallIds:a,isHidden:l,isCollapsed:s,toggleCollapsed:d,pausedAt:f})=>{var _;let[m,h]=y.useState(!1),S=!r.goto||!t.interceptable||!!t.ancestors.length;return l?null:y.createElement($o,{call:t,pausedAt:f},y.createElement(Do,{isInteractive:S},y.createElement(Mo,{call:t,onClick:()=>e.goto(t.id),disabled:S,onMouseEnter:()=>r.goto&&h(!0),onMouseLeave:()=>r.goto&&h(!1)},y.createElement(Y,{status:m?B.CallStates.ACTIVE:t.status}),y.createElement(Po,{style:{marginLeft:6,marginBottom:1}},y.createElement(X,{call:t,callsById:o}))),y.createElement(Fo,null,(a==null?void 0:a.length)>0&&y.createElement(P.WithTooltip,{hasChrome:!1,tooltip:y.createElement(jo,{note:`${s?"Show":"Hide"} interactions`})},y.createElement(Lo,{containsIcon:!0,onClick:d},y.createElement(P.Icons,{icon:"listunordered"}))))),t.status===B.CallStates.ERROR&&((_=t.exception)==null?void 0:_.callId)===t.id&&y.createElement(zo,{exception:t.exception}))};var Ho=$.styled.div(({theme:t,withException:o})=>({minHeight:"100%",background:t.background.content,...o&&{backgroundColor:t.base==="dark"?(0,Nt.transparentize)(.93,t.color.negative):t.background.warning}})),Ro=$.styled.div(({theme:t})=>({padding:15,fontSize:t.typography.size.s2-1,lineHeight:"19px"})),Go=$.styled.code(({theme:t})=>({margin:"0 1px",padding:3,fontSize:t.typography.size.s1-1,lineHeight:1,verticalAlign:"top",background:"rgba(0, 0, 0, 0.05)",border:`1px solid ${t.color.border}`,borderRadius:3})),Vo=$.styled.div({paddingBottom:4,fontWeight:"bold"}),Jo=$.styled.p({margin:0,padding:"0 0 20px"}),Xo=$.styled.pre(({theme:t})=>({margin:0,padding:0,fontSize:t.typography.size.s1-1})),vt=C.memo(({calls:t,controls:o,controlStates:e,interactions:r,fileName:a,hasException:l,caughtException:s,isPlaying:d,pausedAt:f,onScrollToEnd:m,endRef:h,isRerunAnimating:S,setIsRerunAnimating:_,...k})=>{var R;return C.createElement(F.AddonPanel,{...k},C.createElement(Ho,{withException:!!s},e.debugger&&(r.length>0||l||S)&&C.createElement(yt,{controls:o,controlStates:e,status:d?Z.CallStates.ACTIVE:l?Z.CallStates.ERROR:Z.CallStates.DONE,storyFileName:a,onScrollToEnd:m,isRerunAnimating:S,setIsRerunAnimating:_}),C.createElement("div",null,r.map(w=>C.createElement(Ot,{key:w.id,call:w,callsById:t,controls:o,controlStates:e,childCallIds:w.childCallIds,isHidden:w.isHidden,isCollapsed:w.isCollapsed,toggleCollapsed:w.toggleCollapsed,pausedAt:f}))),s&&!((R=s.message)!=null&&R.startsWith("ignoredException"))&&C.createElement(Ro,null,C.createElement(Vo,null,"Caught exception in ",C.createElement(Go,null,"play")," function"),C.createElement(Jo,null,"This story threw an error after it finished rendering which means your interactions couldn't be run. Go to this story's play function in ",a," to fix."),C.createElement(Xo,{"data-chromatic":"ignore"},s.stack||`${s.name}: ${s.message}`)),C.createElement("div",{ref:h}),!d&&!s&&r.length===0&&C.createElement(F.Placeholder,null,"No interactions found",C.createElement(F.Link,{href:"https://storybook.js.org/docs/react/writing-stories/play-function",target:"_blank",withArrow:!0},"Learn how to add interactions to your story"))))});var Bt=require("@storybook/theming"),Pt=T(require("react-dom"));var $t=({children:t})=>{let o=global.document.getElementById("tabbutton-interactions");return o&&Pt.default.createPortal(t,o)},Dt=(0,Bt.styled)(Y)({marginLeft:5});var Yo={debugger:!1,start:!1,back:!1,goto:!1,next:!1,end:!1},Mt=({log:t,calls:o,collapsed:e,setCollapsed:r})=>{let a=new Map,l=new Map;return t.map(({callId:s,ancestors:d,status:f})=>{let m=!1;return d.forEach(h=>{e.has(h)&&(m=!0),l.set(h,(l.get(h)||[]).concat(s))}),{...o.get(s),status:f,isHidden:m}}).map(s=>{var f;let d=s.status===x.CallStates.ERROR&&((f=a.get(s.ancestors.slice(-1)[0]))==null?void 0:f.status)===x.CallStates.ACTIVE?x.CallStates.ACTIVE:s.status;return a.set(s.id,{...s,status:d}),{...s,status:d,childCallIds:l.get(s.id),isCollapsed:e.has(s.id),toggleCollapsed:()=>r(m=>(m.has(s.id)?m.delete(s.id):m.add(s.id),new Set(m)))}})},Ft=t=>{let[o,e]=i.useState(),[r,a]=i.useState(Yo),[l,s]=i.useState(),[d,f]=i.useState(!1),[m,h]=i.useState(!1),[S,_]=i.useState(!1),[k,R]=i.useState(),[w,st]=i.useState(new Set),[K,Q]=i.useState(),[G,at]=i.useState([]),[lt,Lt]=i.useState(),it=i.useRef([]),V=i.useRef(new Map),jt=({status:p,...L})=>V.current.set(L.id,L),tt=i.useRef();i.useEffect(()=>{let p;return U.default.window.IntersectionObserver&&(p=new U.default.window.IntersectionObserver(([L])=>R(L.isIntersecting?void 0:L.target),{root:U.default.window.document.querySelector("#panel-tab-content")}),tt.current&&p.observe(tt.current)),()=>p==null?void 0:p.disconnect()},[]);let D=(0,q.useChannel)({[x.EVENTS.CALL]:jt,[x.EVENTS.SYNC]:p=>{a(p.controlStates),s(p.pausedAt),at(Mt({log:p.logItems,calls:V.current,collapsed:w,setCollapsed:st})),it.current=p.logItems},[O.STORY_RENDER_PHASE_CHANGED]:p=>{e(p.storyId),h(p.newPhase==="playing"),s(void 0),p.newPhase==="rendering"&&(f(!1),Q(void 0))},[O.STORY_THREW_EXCEPTION]:()=>{f(!0)},[O.PLAY_FUNCTION_THREW_EXCEPTION]:p=>{(p==null?void 0:p.message)!==O.IGNORED_EXCEPTION.message?Q(p):Q(void 0)}},[w]);i.useEffect(()=>{at(Mt({log:it.current,calls:V.current,collapsed:w,setCollapsed:st}))},[w]),i.useEffect(()=>{m||S||Lt(G.filter(({method:p})=>p!=="step").length)},[G,m,S]);let Wt=i.useMemo(()=>({start:()=>D(x.EVENTS.START,{storyId:o}),back:()=>D(x.EVENTS.BACK,{storyId:o}),goto:p=>D(x.EVENTS.GOTO,{storyId:o,callId:p}),next:()=>D(x.EVENTS.NEXT,{storyId:o}),end:()=>D(x.EVENTS.END,{storyId:o}),rerun:()=>{_(!0),D(O.FORCE_REMOUNT,{storyId:o})}}),[o]),zt=(0,q.useParameter)("fileName",""),[Ht]=zt.toString().split("/").slice(-1),Rt=()=>k==null?void 0:k.scrollIntoView({behavior:"smooth",block:"end"}),Gt=lt>0||!!K||S,ct=!!K||G.some(p=>p.status===x.CallStates.ERROR);return d?i.createElement(i.Fragment,{key:"interactions"}):i.createElement(i.Fragment,{key:"interactions"},i.createElement($t,null,Gt&&(ct?i.createElement(Dt,{status:x.CallStates.ERROR}):` (${lt})`)),i.createElement(vt,{calls:V.current,controls:Wt,controlStates:r,interactions:G,fileName:Ht,hasException:ct,caughtException:K,isPlaying:m,pausedAt:l,endRef:tt,onScrollToEnd:k&&Rt,isRerunAnimating:S,setIsRerunAnimating:_,...t}))};H.addons.register(ot,()=>{H.addons.add(dt,{type:H.types.PANEL,title:"Interactions",match:({viewMode:t})=>t==="story",render:Ft})});
