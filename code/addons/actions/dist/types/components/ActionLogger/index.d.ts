import React from 'react';
import type { Theme } from '@storybook/theming';
import { ActionDisplay } from '../../models';
export declare const Wrapper: import("@storybook/theming").StyledComponent<{
    className?: string | undefined;
} & {
    children?: React.ReactNode;
} & {
    theme?: Theme | undefined;
}, {}, {}>;
interface ActionLoggerProps {
    actions: ActionDisplay[];
    onClear: () => void;
}
export declare const ActionLogger: ({ actions, onClear }: ActionLoggerProps) => JSX.Element;
export {};
