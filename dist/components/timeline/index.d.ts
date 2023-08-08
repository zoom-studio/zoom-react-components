import React, { type ReactNode } from 'react';
import { type EmojiNS, type IconNS, type ScrollViewNS, type TypographyNS } from '..';
import type { BaseComponent, DataEntriesState } from '../../types';
export declare namespace TimelineNS {
    const Direction: readonly ["column", "row"];
    type Direction = (typeof Direction)[number];
    interface EmojiSign {
        emoji: EmojiNS.Emojis.Names;
    }
    interface IconSign {
        icon: IconNS.Names;
    }
    interface Item {
        sign?: EmojiSign | IconSign | 'auto' | 'number';
        loading?: boolean;
        children?: ReactNode;
        datetime?: ReactNode;
        state?: DataEntriesState;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        items: Item[];
        continues?: boolean;
        stateMessageProps?: TypographyNS.TextNS.Props;
        reverse?: boolean;
        title?: ReactNode;
        direction?: Direction;
        inProgressIndex?: number;
        maxHeight?: string | number;
        scrollViewProps?: Omit<ScrollViewNS.Props, 'maxHeight'>;
        stickyTitle?: boolean;
    }
}
export declare const Timeline: React.ForwardRefExoticComponent<TimelineNS.Props & React.RefAttributes<HTMLDivElement>>;
