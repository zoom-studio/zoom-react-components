import React, { HTMLAttributes, ReactNode } from 'react';
import { SpinNS, TypographyNS } from '..';
import { BaseComponent } from '../../types';
export declare namespace PopoverNS {
    export const Trigger: readonly ["click", "focus", "hover"];
    export type Trigger = typeof Trigger[number];
    export type Placement = typeof Placement[number];
    const Placement: readonly ["top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-start", "bottom", "bottom-end", "left-start", "left", "left-end"];
    export interface Handlers {
        openPopover: () => void;
        closePopover: () => void;
    }
    export interface Props extends Omit<BaseComponent, 'children'> {
        title?: string | ReactNode;
        content?: ReactNode | ((handlers: Handlers) => ReactNode);
        description?: string;
        trigger?: Trigger;
        loading?: boolean;
        placement?: Placement;
        showArrow?: boolean;
        spinProps?: SpinNS.Props;
        defaultIsOpen?: boolean;
        hoverDelay?: number;
        width?: string | number;
        autoCloseDelay?: number;
        children?: JSX.Element | ((handlers: Handlers) => JSX.Element);
        isOpen?: boolean;
        titleProps?: TypographyNS.TitleNS.Props;
        contentProps?: HTMLAttributes<HTMLDivElement>;
        popoverProps?: HTMLAttributes<HTMLDivElement>;
        descriptionProps?: TypographyNS.TextNS.Props;
        disabled?: boolean;
        onOpen?: () => void;
        onClose?: () => void;
        onOpenChange?: (isOpen: boolean) => void;
    }
    export {};
}
export declare const Popover: React.ForwardRefExoticComponent<PopoverNS.Props & React.RefAttributes<HTMLDivElement>>;
