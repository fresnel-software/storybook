var U=Object.create;var O=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var q=Object.getOwnPropertyNames;var Q=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var Z=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of q(e))!V.call(t,s)&&s!==o&&O(t,s,{get:()=>e[s],enumerable:!(r=X(e,s))||r.enumerable});return t};var P=(t,e,o)=>(o=t!=null?U(Q(t)):{},Z(e||!t||!t.__esModule?O(o,"default",{value:t,enumerable:!0}):o,t));var K=P(require("react")),I=require("@storybook/addons");var Y="test",S="storybookjs/test",L=`${S}/panel`,_=`${S}/add_tests`;var n=P(require("react")),l=require("@storybook/theming"),g=require("@storybook/components"),z=require("react-sizeme");var p=P(require("react")),f=require("@storybook/theming"),H=require("@storybook/components");var u=P(require("react")),h=require("@storybook/theming"),R=/\[32m(.*?)\[39m/,tt=/\[31m(.*?)\[39m/,N="positive",et="negative",C="[39m",M="[31m",F="[32m",st="at",v=":",b=class{},ot=h.styled.pre(({theme:t})=>({background:t.color.lighter,paddingTop:4,paddingBottom:4,paddingLeft:6,borderRadius:2,overflow:"auto",margin:"10px 30px 10px 30px",whiteSpace:"pre"})),nt=h.styled.div({paddingTop:10,marginLeft:31,marginRight:30}),rt=h.styled.div(({theme:t})=>({paddingBottom:10,paddingTop:10,borderBottom:t.appBorderColor,marginLeft:31,marginRight:30,overflowWrap:"break-word"})),it=h.styled.strong(({status:t,theme:e})=>({color:t===N?e.color.positive:e.color.negative,fontWeight:500})),w=(t,e)=>e?t.split(e===N?R:tt).map((o,r)=>r%2?u.default.createElement(it,{key:`${e}_${o}`,status:e},o):o):[t],D=t=>{let e=[];return t&&t.split(/\[2m/).join("").split(/\[22m/).forEach(r=>{r&&r.trim()&&(r.indexOf(M)>-1&&r.indexOf(M)<r.indexOf(C)?e=e.concat(w(r,et)):r.indexOf(F)>-1&&r.indexOf(F)<r.indexOf(C)?e=e.concat(w(r,N)):e=e.concat(r))}),e},at=t=>{let e=t.split(`
`).filter(Boolean),o=new b;o.description=D(e[0]),o.stackTrace="",o.result=[];for(let r=1;r<e.length;r+=1){let s=e[r],m=e[r+1];if(s.trim().toLowerCase().indexOf(st)===0)o.stackTrace+=`${s.trim()}
`;else if(s.trim().indexOf(v)>-1){let c,d=null;s.trim().indexOf(v)===s.length-1?(c=s.trim(),d=D(m),r+=1):(c=s.substring(0,s.indexOf(v)).trim(),d=D(s.substring(s.indexOf(v),s.length))),o.result=[...o.result,c," ",...d,u.default.createElement("br",{key:r})]}else o.result=[...o.result," ",...D(s)]}return o},lt=t=>{let{msg:e}=t,o=at(e);return u.default.createElement(u.Fragment,null,o.description?u.default.createElement(rt,null,o.description):null,o.result?u.default.createElement(nt,null,o.result):null,o.stackTrace?u.default.createElement(ot,null,o.stackTrace):null)},$=lt;var dt=f.styled.div(({theme:t,status:e})=>({display:"flex",width:"100%",borderTop:`1px solid ${t.appBorderColor}`,"&:hover":{background:e==="failed"?t.background.hoverable:null}})),pt=f.styled.div(({theme:t,status:e})=>({padding:t.layoutMargin,paddingLeft:t.layoutMargin-3,background:"none",color:"inherit",textAlign:"left",cursor:e==="failed"?"pointer":null,borderLeft:"3px solid transparent",width:"100%",display:"flex","&:focus":{outline:"0 none",borderLeft:`3px solid ${t.color.secondary}`}})),gt=(0,f.styled)(H.Icons)(({theme:t})=>({height:10,width:10,minWidth:10,color:t.color.mediumdark,marginRight:10,transition:"transform 0.1s ease-in-out",alignSelf:"center",display:"inline-flex"})),B=t=>t.charAt(0).toUpperCase().concat(t.slice(1));function ct(t){let[e,o]=(0,p.useState)(!1),r=()=>{o(!e)},{fullName:s,title:m,failureMessages:c,status:d}=t;return p.default.createElement(p.Fragment,null,p.default.createElement(dt,{status:d},p.default.createElement(pt,{onClick:r,role:"button",status:d},d==="failed"?p.default.createElement(gt,{icon:"arrowdown",color:(0,f.convert)(f.themes.light).color.mediumdark,style:{transform:`rotate(${e?0:-90}deg)`}}):null,p.default.createElement("div",null,B(s)||B(m)))),e?p.default.createElement(p.Fragment,null,c.map((T,a)=>p.default.createElement($,{msg:T,key:a}))):null)}var y=ct;var x=P(require("react")),G=require("@storybook/core-events");var mt=t=>{var e;return e=class extends x.Component{constructor(){super(...arguments);this.state={};this.onAddTests=({kind:s,storyName:m,tests:c})=>{this.setState({kind:s,storyName:m,tests:c})}}componentDidMount(){this.mounted=!0;let{api:s}=this.props;this.stopListeningOnStory=s.on(G.STORY_CHANGED,()=>{let{kind:m,storyName:c,tests:d}=this.state;this.mounted&&(m||c||d)&&this.onAddTests({})}),s.on(_,this.onAddTests)}componentWillUnmount(){this.mounted=!1;let{api:s}=this.props;this.stopListeningOnStory(),s.off(_,this.onAddTests)}render(){let{active:s}=this.props,{tests:m}=this.state;return s?x.default.createElement(t,{tests:m}):null}},e.defaultProps={active:!1},e},j=mt;var i={PASSED_TYPE:"passed",FAILED_TYPE:"failed",PENDING_TYPE:"pending",TODO_TYPE:"todo"},k=l.styled.ul({listStyle:"none",fontSize:14,padding:0,margin:0}),A=l.styled.li({display:"block",padding:0}),ut=l.styled.div({position:"relative",height:10,width:30,display:"flex",top:-2}),ft=l.styled.div({display:"flex",alignItems:"baseline",position:"absolute",zIndex:2,right:20,marginTop:15}),Tt=({result:t,className:e,width:o})=>n.default.createElement("div",{className:e},n.default.createElement(n.Fragment,null,o>325&&t.assertionResults?n.default.createElement("div",null,t.assertionResults.length," ",t.assertionResults.length>1?"tests":"test"):null,o>280&&t.endTime&&t.startTime?n.default.createElement("div",null,t.endTime-t.startTime,"ms"):null)),Pt=(0,l.styled)(Tt)(({theme:t})=>({display:"flex",alignItems:"center",color:t.color.dark,fontSize:"14px",marginTop:-5,"& > *":{marginRight:10}})),ht=l.styled.div(({color:t,progressPercent:e})=>({height:6,top:3,width:`${e}%`,backgroundColor:t})),yt=t=>{let e=new Map;return t.assertionResults.forEach(o=>{e.set(o.status,e.get(o.status)?e.get(o.status).concat(o):[o])}),e},E=t=>{switch(t){case i.PASSED_TYPE:return(0,l.convert)(l.themes.light).color.positive;case i.FAILED_TYPE:return(0,l.convert)(l.themes.light).color.negative;case i.PENDING_TYPE:return(0,l.convert)(l.themes.light).color.warning;case i.TODO_TYPE:return(0,l.convert)(l.themes.light).color.purple;default:return null}},Et=(0,l.styled)(({tests:t,className:e})=>n.default.createElement("div",{className:e},t.map(({name:o,result:r})=>{if(!r||!r.assertionResults)return n.default.createElement(g.Placeholder,{key:o},"This story has tests configured, but no file was found");let s=yt(r),c=[...s.entries()].sort((d,T)=>d[1].length-T[1].length);return n.default.createElement(z.SizeMe,{refreshMode:"debounce",key:o},({size:d})=>{let{width:T}=d;return n.default.createElement("section",null,n.default.createElement(ft,null,n.default.createElement(Pt,{...{result:r,width:T}}),T>240?n.default.createElement(ut,null,c.map(a=>n.default.createElement(ht,{key:`progress-portion-${a[0]}`,color:E(a[0]),progressPercent:a[1]?a[1].length/r.assertionResults.length*100:0}))):null),n.default.createElement(g.TabsState,{initial:"failing-tests",backgroundColor:(0,l.convert)(l.themes.light).background.hoverable},n.default.createElement("div",{id:"failing-tests",title:`${s.get(i.FAILED_TYPE)?s.get(i.FAILED_TYPE).length:0} Failed`,color:E(i.FAILED_TYPE)},n.default.createElement(k,null,s.get(i.FAILED_TYPE)?s.get(i.FAILED_TYPE).map(a=>n.default.createElement(A,{key:a.fullName||a.title},n.default.createElement(y,{...a}))):n.default.createElement(g.Placeholder,{key:`no-tests-${i.FAILED_TYPE}`},"This story has no failing tests."))),n.default.createElement("div",{id:"passing-tests",title:`${s.get(i.PASSED_TYPE)?s.get(i.PASSED_TYPE).length:0} Passed`,color:E(i.PASSED_TYPE)},n.default.createElement(k,null,s.get(i.PASSED_TYPE)?s.get(i.PASSED_TYPE).map(a=>n.default.createElement(A,{key:a.fullName||a.title},n.default.createElement(y,{...a}))):n.default.createElement(g.Placeholder,{key:`no-tests-${i.PASSED_TYPE}`},"This story has no passing tests."))),n.default.createElement("div",{id:"pending-tests",title:`${s.get(i.PENDING_TYPE)?s.get(i.PENDING_TYPE).length:0} Pending`,color:E(i.PENDING_TYPE)},n.default.createElement(k,null,s.get(i.PENDING_TYPE)?s.get(i.PENDING_TYPE).map(a=>n.default.createElement(A,{key:a.fullName||a.title},n.default.createElement(y,{...a}))):n.default.createElement(g.Placeholder,{key:`no-tests-${i.PENDING_TYPE}`},"This story has no pending tests."))),n.default.createElement("div",{id:"todo-tests",title:`${s.get(i.TODO_TYPE)?s.get(i.TODO_TYPE).length:0} Todo`,color:E(i.TODO_TYPE)},n.default.createElement(k,null,s.get(i.TODO_TYPE)?s.get(i.TODO_TYPE).map(a=>n.default.createElement(A,{key:a.fullName||a.title},n.default.createElement(y,{...a}))):n.default.createElement(g.Placeholder,{key:`no-tests-${i.TODO_TYPE}`},"This story has no tests todo.")))))})})))({flex:"1 1 0%"}),W=({tests:t})=>n.default.createElement(g.ScrollArea,{vertical:!0},t?n.default.createElement(Et,{tests:t}):n.default.createElement(g.Placeholder,null,n.default.createElement(n.Fragment,null,"No tests found"),n.default.createElement(n.Fragment,null,"Learn how to\xA0",n.default.createElement(g.Link,{href:"https://github.com/storybookjs/storybook/tree/master/addons/jest",target:"_blank",withArrow:!0},"add Jest test results to your story"))));W.defaultProps={tests:null};var J=j(W);I.addons.register(S,t=>{I.addons.addPanel(L,{title:"Tests",render:({active:e,key:o})=>K.createElement(J,{key:o,api:t,active:e}),paramKey:Y})});
