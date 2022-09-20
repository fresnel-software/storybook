/**
 * webpack loader for sveltedoc-parser
 * @param source raw svelte component
 */
declare function svelteDocgen(this: any, source: string): Promise<string>;

export { svelteDocgen as default };
