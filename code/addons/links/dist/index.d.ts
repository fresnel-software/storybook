import { ComponentTitle, StoryName, StoryId } from '@storybook/csf';

interface ParamsId {
    storyId: StoryId;
}
interface ParamsCombo {
    kind?: ComponentTitle;
    story?: StoryName;
}
declare const navigate: (params: ParamsId | ParamsCombo) => void;
declare const hrefTo: (title: ComponentTitle, name: StoryName) => Promise<string>;
declare const linkTo: (idOrTitle: string, nameInput?: string | ((...args: any[]) => string) | undefined) => (...args: any[]) => void;
declare const withLinks: (...args: any) => any;

declare function LinkTo(): null;

export { LinkTo, hrefTo, linkTo, navigate, withLinks };
