import{c as D}from"./chunk-YPOITP6H.mjs";import{useEffect as q}from"@storybook/addons";import g from"global";import R from"global";function T(){let e=R.document.documentElement,t=Math.max(e.scrollHeight,e.offsetHeight);return{width:Math.max(e.scrollWidth,e.offsetWidth),height:t}}function et(){let e=R.document.createElement("canvas");e.id="storybook-addon-measure";let t=e.getContext("2d"),{width:o,height:i}=T();return v(e,t,{width:o,height:i}),e.style.position="absolute",e.style.left="0",e.style.top="0",e.style.zIndex="2147483647",e.style.pointerEvents="none",R.document.body.appendChild(e),{canvas:e,context:t,width:o,height:i}}function v(e,t,{width:o,height:i}){e.style.width=`${o}px`,e.style.height=`${i}px`;let n=R.window.devicePixelRatio;e.width=Math.floor(o*n),e.height=Math.floor(i*n),t.scale(n,n)}var m={};function A(){m.canvas||(m=et())}function P(){m.context&&m.context.clearRect(0,0,m.width,m.height)}function F(e){P(),e(m.context)}function H(){v(m.canvas,m.context,{width:0,height:0});let{width:e,height:t}=T();v(m.canvas,m.context,{width:e,height:t}),m.width=e,m.height=t}function W(){m.canvas&&(P(),m.canvas.parentNode.removeChild(m.canvas),m={})}var b={margin:"#f6b26b",border:"#ffe599",padding:"#93c47d",content:"#6fa8dc",text:"#232020"},p=6;function B(e,{x:t,y:o,w:i,h:n,r:l}){t=t-i/2,o=o-n/2,i<2*l&&(l=i/2),n<2*l&&(l=n/2),e.beginPath(),e.moveTo(t+l,o),e.arcTo(t+i,o,t+i,o+n,l),e.arcTo(t+i,o+n,t,o+n,l),e.arcTo(t,o+n,t,o,l),e.arcTo(t,o,t+i,o,l),e.closePath()}function ot(e,{padding:t,border:o,width:i,height:n,top:l,left:s}){let a=i-o.left-o.right-t.left-t.right,r=n-t.top-t.bottom-o.top-o.bottom,f=s+o.left+t.left,c=l+o.top+t.top;return e==="top"?f+=a/2:e==="right"?(f+=a,c+=r/2):e==="bottom"?(f+=a/2,c+=r):e==="left"?c+=r/2:e==="center"&&(f+=a/2,c+=r/2),{x:f,y:c}}function nt(e,t,{margin:o,border:i,padding:n},l,s){let a=h=>0,r=0,f=0,c=s?1:.5,u=s?l*2:0;return e==="padding"?a=h=>n[h]*c+u:e==="border"?a=h=>n[h]+i[h]*c+u:e==="margin"&&(a=h=>n[h]+i[h]+o[h]*c+u),t==="top"?f=-a("top"):t==="right"?r=a("right"):t==="bottom"?f=a("bottom"):t==="left"&&(r=-a("left")),{offsetX:r,offsetY:f}}function it(e,t){return Math.abs(e.x-t.x)<Math.abs(e.w+t.w)/2&&Math.abs(e.y-t.y)<Math.abs(e.h+t.h)/2}function lt(e,t,o){return e==="top"?t.y=o.y-o.h-p:e==="right"?t.x=o.x+o.w/2+p+t.w/2:e==="bottom"?t.y=o.y+o.h+p:e==="left"&&(t.x=o.x-o.w/2-p-t.w/2),{x:t.x,y:t.y}}function Y(e,t,{x:o,y:i,w:n,h:l},s){return B(e,{x:o,y:i,w:n,h:l,r:3}),e.fillStyle=`${b[t]}dd`,e.fill(),e.strokeStyle=b[t],e.stroke(),e.fillStyle=b.text,e.fillText(s,o,i),B(e,{x:o,y:i,w:n,h:l,r:3}),e.fillStyle=`${b[t]}dd`,e.fill(),e.strokeStyle=b[t],e.stroke(),e.fillStyle=b.text,e.fillText(s,o,i),{x:o,y:i,w:n,h:l}}function z(e,t){e.font="600 12px monospace",e.textBaseline="middle",e.textAlign="center";let o=e.measureText(t),i=o.actualBoundingBoxAscent+o.actualBoundingBoxDescent,n=o.width+p*2,l=i+p*2;return{w:n,h:l}}function st(e,t,{type:o,position:i="center",text:n},l,s=!1){let{x:a,y:r}=ot(i,t),{offsetX:f,offsetY:c}=nt(o,i,t,p+1,s);a+=f,r+=c;let{w:u,h}=z(e,n);if(l&&it({x:a,y:r,w:u,h},l)){let C=lt(i,{x:a,y:r,w:u,h},l);a=C.x,r=C.y}return Y(e,o,{x:a,y:r,w:u,h},n)}function at(e,{w:t,h:o}){let i=t*.5+p,n=o*.5+p;return{offsetX:(e.x==="left"?-1:1)*i,offsetY:(e.y==="top"?-1:1)*n}}function rt(e,t,{type:o,text:i}){let{floatingAlignment:n,extremities:l}=t,s=l[n.x],a=l[n.y],{w:r,h:f}=z(e,i),{offsetX:c,offsetY:u}=at(n,{w:r,h:f});return s+=c,a+=u,Y(e,o,{x:s,y:a,w:r,h:f},i)}function S(e,t,o,i){let n=[];o.forEach((l,s)=>{let a=i&&l.position==="center"?rt(e,t,l):st(e,t,l,n[s-1],i);n[s]=a})}function X(e,t,o,i){let n=o.reduce((l,s)=>(Object.prototype.hasOwnProperty.call(l,s.position)||(l[s.position]=[]),l[s.position].push(s),l),{});n.top&&S(e,t,n.top,i),n.right&&S(e,t,n.right,i),n.bottom&&S(e,t,n.bottom,i),n.left&&S(e,t,n.left,i),n.center&&S(e,t,n.center,i)}var E={margin:"#f6b26ba8",border:"#ffe599a8",padding:"#93c47d8c",content:"#6fa8dca8"},$=30;function d(e){return parseInt(e.replace("px",""),10)}function w(e){return Number.isInteger(e)?e:e.toFixed(2)}function k(e){return e.filter(t=>t.text!==0&&t.text!=="0")}function ft(e){let t={top:g.window.scrollY,bottom:g.window.scrollY+g.window.innerHeight,left:g.window.scrollX,right:g.window.scrollX+g.window.innerWidth},o={top:Math.abs(t.top-e.top),bottom:Math.abs(t.bottom-e.bottom),left:Math.abs(t.left-e.left),right:Math.abs(t.right-e.right)};return{x:o.left>o.right?"left":"right",y:o.top>o.bottom?"top":"bottom"}}function ct(e){let t=g.getComputedStyle(e),{top:o,left:i,right:n,bottom:l,width:s,height:a}=e.getBoundingClientRect(),{marginTop:r,marginBottom:f,marginLeft:c,marginRight:u,paddingTop:h,paddingBottom:C,paddingLeft:G,paddingRight:Z,borderBottomWidth:K,borderTopWidth:V,borderLeftWidth:J,borderRightWidth:Q}=t;o=o+g.window.scrollY,i=i+g.window.scrollX,l=l+g.window.scrollY,n=n+g.window.scrollX;let y={top:d(r),bottom:d(f),left:d(c),right:d(u)},U={top:d(h),bottom:d(C),left:d(G),right:d(Z)},tt={top:d(V),bottom:d(K),left:d(J),right:d(Q)},x={top:o-y.top,bottom:l+y.bottom,left:i-y.left,right:n+y.right};return{margin:y,padding:U,border:tt,top:o,left:i,bottom:l,right:n,width:s,height:a,extremities:x,floatingAlignment:ft(x)}}function mt(e,{margin:t,width:o,height:i,top:n,left:l,bottom:s,right:a}){let r=i+t.bottom+t.top;e.fillStyle=E.margin,e.fillRect(l,n-t.top,o,t.top),e.fillRect(a,n-t.top,t.right,r),e.fillRect(l,s,o,t.bottom),e.fillRect(l-t.left,n-t.top,t.left,r);let f=[{type:"margin",text:w(t.top),position:"top"},{type:"margin",text:w(t.right),position:"right"},{type:"margin",text:w(t.bottom),position:"bottom"},{type:"margin",text:w(t.left),position:"left"}];return k(f)}function ht(e,{padding:t,border:o,width:i,height:n,top:l,left:s,bottom:a,right:r}){let f=i-o.left-o.right,c=n-t.top-t.bottom-o.top-o.bottom;e.fillStyle=E.padding,e.fillRect(s+o.left,l+o.top,f,t.top),e.fillRect(r-t.right-o.right,l+t.top+o.top,t.right,c),e.fillRect(s+o.left,a-t.bottom-o.bottom,f,t.bottom),e.fillRect(s+o.left,l+t.top+o.top,t.left,c);let u=[{type:"padding",text:t.top,position:"top"},{type:"padding",text:t.right,position:"right"},{type:"padding",text:t.bottom,position:"bottom"},{type:"padding",text:t.left,position:"left"}];return k(u)}function ut(e,{border:t,width:o,height:i,top:n,left:l,bottom:s,right:a}){let r=i-t.top-t.bottom;e.fillStyle=E.border,e.fillRect(l,n,o,t.top),e.fillRect(l,s-t.bottom,o,t.bottom),e.fillRect(l,n+t.top,t.left,r),e.fillRect(a-t.right,n+t.top,t.right,r);let f=[{type:"border",text:t.top,position:"top"},{type:"border",text:t.right,position:"right"},{type:"border",text:t.bottom,position:"bottom"},{type:"border",text:t.left,position:"left"}];return k(f)}function dt(e,{padding:t,border:o,width:i,height:n,top:l,left:s}){let a=i-o.left-o.right-t.left-t.right,r=n-t.top-t.bottom-o.top-o.bottom;return e.fillStyle=E.content,e.fillRect(s+o.left+t.left,l+o.top+t.top,a,r),[{type:"content",position:"center",text:`${w(a)} x ${w(r)}`}]}function gt(e){return t=>{if(e&&t){let o=ct(e),i=mt(t,o),n=ht(t,o),l=ut(t,o),s=dt(t,o),a=o.width<=$*3||o.height<=$;X(t,o,[...s,...n,...l,...i],a)}}}function N(e){F(gt(e))}import pt from"global";var O=(e,t)=>{let o=pt.document.elementFromPoint(e,t),i=l=>{if(l&&l.shadowRoot){let s=l.shadowRoot.elementFromPoint(e,t);return l.isEqualNode(s)?l:s.shadowRoot?i(s):s}return l};return i(o)||o};var I,M={x:0,y:0};function j(e,t){I=O(e,t),N(I)}var _=(e,t)=>{let{measureEnabled:o}=t.globals;return q(()=>{let i=n=>{window.requestAnimationFrame(()=>{n.stopPropagation(),M.x=n.clientX,M.y=n.clientY})};return document.addEventListener("mousemove",i),()=>{document.removeEventListener("mousemove",i)}},[]),q(()=>{let i=l=>{window.requestAnimationFrame(()=>{l.stopPropagation(),j(l.clientX,l.clientY)})},n=()=>{window.requestAnimationFrame(()=>{H()})};return o&&(document.addEventListener("mouseover",i),A(),window.addEventListener("resize",n),j(M.x,M.y)),()=>{window.removeEventListener("resize",n),W()}},[o]),e()};var Wt=[_],Bt={[D]:!1};export{Wt as decorators,Bt as globals};
