import React, { type ReactNode } from 'react';
import { type EmojiNS, type IconNS } from '..';
import { type BaseComponent, type Color, type CommonSize } from '../../types';
export declare namespace BadgeNS {
    const Direction: readonly ["row", "row-reverse", "column", "column-reverse"];
    type Direction = (typeof Direction)[number];
    interface Props extends BaseComponent {
        direction?: Direction;
        showZero?: boolean;
        count?: number | undefined | null;
        emoji?: EmojiNS.Emojis.Names;
        icon?: IconNS.Names;
        overflowCount?: number;
        offset?: [number, number] | number;
        background?: Color;
        color?: Color;
        dot?: boolean;
        size?: CommonSize;
        text?: string;
        children?: ReactNode;
        childrenContainerProps?: Omit<BaseComponent, 'children'>;
    }
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeNS.Props & React.RefAttributes<HTMLDivElement>>;
