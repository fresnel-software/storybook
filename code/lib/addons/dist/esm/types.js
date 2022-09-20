// NOTE: The types exported from this file are simplified versions of the types exported
// by @storybook/csf, with the simpler form retained for backwards compatibility.
// We will likely start exporting the more complex <StoryFnReturnType> based types in 7.0

/** A StandaloneDocsIndexExtry represents a file who's default export is directly renderable */

/** A TemplateDocsIndexEntry represents a stories file that gets rendered in "docs" mode */
// The `any` here is the story store's `StoreItem` record. Ideally we should probably only
// pass a defined subset of that full data, but we pass it all so far :shrug:
// TODO: remove all these types, they belong in the renderer and csf-package
export let types;

(function (types) {
  types["TAB"] = "tab";
  types["PANEL"] = "panel";
  types["TOOL"] = "tool";
  types["TOOLEXTRA"] = "toolextra";
  types["PREVIEW"] = "preview";
  types["NOTES_ELEMENT"] = "notes-element";
})(types || (types = {}));

export function isSupportedType(type) {
  return !!Object.values(types).find(typeVal => typeVal === type);
}