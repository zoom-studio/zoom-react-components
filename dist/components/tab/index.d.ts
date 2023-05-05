import React, { ReactNode } from 'react';
import { EmojiNS, IconNS, ScrollViewNS } from '..';
import { BaseComponent, Color } from '../../types';
export declare namespace TabNS {
    interface TabWidth {
        min?: string | number;
        max?: string | number;
    }
    interface Tab {
        children?: ReactNode;
        title?: string;
        closable?: boolean;
        disabled?: boolean;
        loading?: boolean;
        icon?: IconNS.Names;
        emoji?: EmojiNS.Emojis.Names;
        link?: string;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        tabs: Tab[];
        activeTab?: number;
        onChange?: (tabIndex: number) => void;
        onClose?: (tabIndex: number) => void;
        scrollViewProps?: Omit<ScrollViewNS.Props, 'children' | 'maxHeight' | 'className'>;
        tabsWidth?: 'auto' | TabWidth;
        background?: Color;
    }
}
export declare const Tab: React.ForwardRefExoticComponent<TabNS.Props & React.RefAttributes<HTMLDivElement>>;
