import f from"global";import{dedent as d}from"ts-dedent";import{simulatePageLoad as a,simulateDOMContentLoaded as m}from"@storybook/preview-web";var{Node:l}=f;function c({storyFn:o,kind:r,name:n,showMain:i,showError:s,forceRemount:p},e){let t=o();if(i(),typeof t=="string")e.innerHTML=t,a(e);else if(t instanceof l){if(e.firstChild===t&&p===!1)return;e.innerHTML="",e.appendChild(t),m()}else s({title:`Expecting an HTML snippet or DOM node from the story: "${n}" of "${r}".`,description:d`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}export{c as a};
