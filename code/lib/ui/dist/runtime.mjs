import{a as ae,b as K,c as D,d as g,e as y,f as b,g as O,h as B,i as H,j as E,k as U,l as w,m as q,n as P,p as j}from"./chunk-5V5GBKOA.mjs";import{a as R}from"./chunk-QV6IVTJA.mjs";import"./chunk-6REZBQCP.mjs";import{a as se}from"./chunk-722JULI4.mjs";import"./chunk-MY4F7ORE.mjs";import{a as k,b as p,d as C,e as I,t as Y}from"./chunk-6FK76XHH.mjs";import{b as ne}from"./chunk-Z7LX2X6E.mjs";import"./chunk-AIPH5HO4.mjs";import"./chunk-6XCSLWLC.mjs";import{e as f,g as l}from"./chunk-L2PAVIFR.mjs";l();var v=f(k());l();var S=f(k());var W=f(ae()),{window:n,document:h,location:N}=S.default,M="storybook-channel",ie={allowFunction:!0,maxDepth:25},A=class{constructor(t){if(this.config=t,this.buffer=void 0,this.handler=void 0,this.connected=void 0,this.buffer=[],this.handler=null,n&&n.addEventListener("message",this.handleEvent.bind(this),!1),t.page!=="manager"&&t.page!=="preview")throw new Error(`postmsg-channel: "config.page" cannot be "${t.page}"`)}setHandler(t){this.handler=(...e)=>{t.apply(this,e),!this.connected&&this.getLocalFrame().length&&(this.flush(),this.connected=!0)}}send(t,e){let{target:o,allowRegExp:r,allowFunction:a,allowSymbol:i,allowDate:c,allowUndefined:d,allowClass:Q,maxDepth:X,space:Z,lazyEval:ee}=e||{},te=Object.fromEntries(Object.entries({allowRegExp:r,allowFunction:a,allowSymbol:i,allowDate:c,allowUndefined:d,allowClass:Q,maxDepth:X,space:Z,lazyEval:ee}).filter(([m,u])=>typeof u<"u")),L=Object.assign({},ie,S.default.CHANNEL_OPTIONS||{},te);e&&Number.isInteger(e.depth)&&(L.maxDepth=e.depth);let $=this.getFrames(o),re=W.default.parse(N.search,{ignoreQueryPrefix:!0}),oe=b({key:M,event:t,refId:re.refId},L);return $.length?(this.buffer.length&&this.flush(),$.forEach(m=>{try{m.postMessage(oe,"*")}catch{console.error("sending over postmessage fail")}}),Promise.resolve(null)):new Promise((m,u)=>{this.buffer.push({event:t,resolve:m,reject:u})})}flush(){let{buffer:t}=this;this.buffer=[],t.forEach(e=>{this.send(e.event).then(e.resolve).catch(e.reject)})}getFrames(t){if(this.config.page==="manager"){let o=[...h.querySelectorAll("iframe[data-is-storybook][data-is-loaded]")].filter(r=>{try{return!!r.contentWindow&&r.dataset.isStorybook!==void 0&&r.id===t}catch{return!1}}).map(r=>r.contentWindow);return o.length?o:this.getCurrentFrames()}return n&&n.parent&&n.parent!==n?[n.parent]:[]}getCurrentFrames(){return this.config.page==="manager"?[...h.querySelectorAll('[data-is-storybook="true"]')].map(e=>e.contentWindow):n&&n.parent?[n.parent]:[]}getLocalFrame(){return this.config.page==="manager"?[...h.querySelectorAll("#storybook-preview-iframe")].map(e=>e.contentWindow):n&&n.parent?[n.parent]:[]}handleEvent(t){try{let{data:e}=t,{key:o,event:r,refId:a}=typeof e=="string"&&y(e)?O(e,S.default.CHANNEL_OPTIONS||{}):e;if(o===M){let i=this.config.page==="manager"?'<span style="color: #37D5D3; background: black"> manager </span>':'<span style="color: #1EA7FD; background: black"> preview </span>',c=Object.values(g).includes(r.type)?`<span style="color: #FF4785">${r.type}</span>`:`<span style="color: #FFAE00">${r.type}</span>`;if(a&&(r.refId=a),r.source=this.config.page==="preview"?t.origin:ce(t),!r.source){C.error(`${i} received ${c} but was unable to determine the source of the event`);return}let d=`${i} received ${c} (${e.length})`;C.debug(N.origin!==r.source?d:`${d} <span style="color: gray">(on ${N.origin} from ${r.source})</span>`,...r.args),this.handler(r)}}catch(e){p.error(e)}}},ce=s=>{let t=[...h.querySelectorAll("iframe[data-is-storybook]")],[e,...o]=t.filter(r=>{try{return r.contentWindow===s.source}catch{}let a=r.getAttribute("src"),i;try{({origin:i}=new URL(a,h.location))}catch{return!1}return i===s.origin});if(e&&o.length===0){let r=e.getAttribute("src"),{protocol:a,host:i,pathname:c}=new URL(r,h.location);return`${a}//${i}${c}`}return o.length>0&&p.error("found multiple candidates for event source"),null};function _({page:s}){let t=new A({page:s});return new E({transport:t})}l();var V=f(k());var{WebSocket:fe}=V.default,x=class{constructor({url:t,onError:e}){this.socket=void 0,this.handler=void 0,this.buffer=[],this.isReady=!1,this.connect(t,e)}setHandler(t){this.handler=t}send(t){this.isReady?this.sendNow(t):this.sendLater(t)}sendLater(t){this.buffer.push(t)}sendNow(t){let e=b(t,{maxDepth:15,allowFunction:!0});this.socket.send(e)}flush(){let{buffer:t}=this;this.buffer=[],t.forEach(e=>this.send(e))}connect(t,e){this.socket=new fe(t),this.socket.onopen=()=>{this.isReady=!0,this.flush()},this.socket.onmessage=({data:o})=>{let r=typeof o=="string"&&y(o)?O(o):o;this.handler(r)},this.socket.onerror=o=>{e&&e(o)}}};function G({url:s,async:t=!1,onError:e=o=>p.warn(o)}){let o=new x({url:s,onError:e});return new E({transport:o,async:t})}l();var pe=f(ne()),de=f(se());var J={react:pe,"react-dom":de,"@storybook/components":H,"@storybook/channels":U,"@storybook/core-events":g,"@storybook/router":K,"@storybook/theming":Y,"@storybook/api":B,"@storybook/addons":q,"@storybook/client-logger":I};var{FEATURES:me,SERVER_CHANNEL_URL:z}=v.default,F=class extends P{constructor(){super();let e=_({page:"manager"});if(w.setChannel(e),e.emit(D.CHANNEL_CREATED),this.addons=w,this.channel=e,me?.storyStoreV7&&z){let o=G({url:z});this.serverChannel=o,w.setServerChannel(this.serverChannel)}}getElements(e){return this.addons.getElements(e)}getConfig(){return this.addons.getConfig()}handleAPI(e){this.addons.loadAddons(e)}},{document:ue}=v.default,ge=ue.getElementById("root");j(ge,new F);Object.keys(R).forEach(s=>{v.default[R[s]]=J[s]});
