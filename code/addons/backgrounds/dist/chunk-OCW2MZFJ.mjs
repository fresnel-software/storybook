var l="storybook/background",u="backgrounds";var y={UPDATE:`${l}/update`};import c from"global";import{dedent as g}from"ts-dedent";import{logger as m}from"@storybook/client-logger";var{document:i,window:p}=c,B=()=>p.matchMedia("(prefers-reduced-motion: reduce)").matches,H=(e,t=[],n)=>{if(e==="transparent")return"transparent";if(t.find(o=>o.value===e))return e;let r=t.find(o=>o.name===n);if(r)return r.value;if(n){let o=t.map(s=>s.name).join(", ");m.warn(g`
        Backgrounds Addon: could not find the default color "${n}".
        These are the available colors for your story based on your configuration:
        ${o}.
      `)}return"transparent"},L=e=>{(Array.isArray(e)?e:[e]).forEach(f)},f=e=>{let t=i.getElementById(e);t&&t.parentElement.removeChild(t)},h=(e,t)=>{let n=i.getElementById(e);if(n)n.innerHTML!==t&&(n.innerHTML=t);else{let r=i.createElement("style");r.setAttribute("id",e),r.innerHTML=t,i.head.appendChild(r)}},A=(e,t,n)=>{let r=i.getElementById(e);if(r)r.innerHTML!==t&&(r.innerHTML=t);else{let o=i.createElement("style");o.setAttribute("id",e),o.innerHTML=t;let s=`addon-backgrounds-grid${n?`-docs-${n}`:""}`,a=i.getElementById(s);a?a.parentElement.insertBefore(o,a):i.head.appendChild(o)}};export{l as a,u as b,B as c,H as d,L as e,h as f,A as g};