import*as e from"preact";import{dedent as s}from"ts-dedent";var p;function i(r,t){e.Fragment?e.render(r,t):p=e.render(r,t,p)}var l=({showError:r,name:t,title:o,storyFn:a,domElement:m})=>{let n=e.h(a,null);return n||(r({title:`Expecting a Preact element from the story: "${t}" of "${o}".`,description:s`
        Did you forget to return the Preact element from the story?
        Use "() => (<MyComp/>)" or "() => { return <MyComp/>; }" when defining the story.
      `}),null)};function d({storyFn:r,title:t,name:o,showMain:a,showError:m,forceRemount:n},c){n&&i(null,c),a(),i(e.h(l,{name:o,title:t,showError:m,storyFn:r,domElement:c}),c)}export{d as a};
