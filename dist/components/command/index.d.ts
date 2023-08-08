import React, { type HTMLAttributeAnchorTarget, type HTMLAttributes, type ReactNode, type RefObject } from 'react';
import { type EmojiNS, type IconNS } from '..';
import { type BaseComponent } from '../../types';
export declare namespace CommandNS {
    const SECTION_TITLE_HEIGHT = 32;
    const ITEMS_WITH_DESCRIPTION_HEIGHT = 64;
    const ITEMS_WITHOUT_DESCRIPTION_HEIGHT = 54;
    const HEADER_HEIGHT = 51;
    const ActionType: readonly ["jump-to", "callback", "container"];
    type ActionType = (typeof ActionType)[number];
    type ActionID = string | number;
    interface Section {
        sectionName: string;
        actions: Action[];
    }
    interface LinkPerformer {
        url: string;
        target?: HTMLAttributeAnchorTarget;
    }
    interface Action {
        id: ActionID;
        name: string;
        type?: ActionType;
        performs?: LinkPerformer | ((action: Action) => void);
        keywords?: string;
        icon?: IconNS.Names;
        emoji?: EmojiNS.Emojis.Names;
        description?: string;
        subItems?: Item[];
    }
    type Item = Action | Section;
    interface ChildrenCallbackParams {
        isOpen: boolean;
        open: () => void;
        close: () => void;
        toggle: () => void;
    }
    interface Path {
        name: string;
        id: string;
        items: Item[];
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        items: Item[];
        children?: ReactNode | ((params: ChildrenCallbackParams) => ReactNode);
        defaultIsOpen?: boolean;
        backdropRef?: RefObject<HTMLDivElement>;
        backdropProps?: HTMLAttributes<HTMLDivElement>;
        placeholder?: string;
        onWillOpen?: () => void;
        onWillClose?: () => void;
    }
}
export declare const Command: React.ForwardRefExoticComponent<CommandNS.Props & React.RefAttributes<HTMLDivElement>>;
