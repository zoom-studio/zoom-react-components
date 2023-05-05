import React, { ReactNode } from 'react';
import { EmojiNS, IconNS, TypographyNS } from '..';
import { BaseComponent, CommonSize, DataEntriesState } from '../../types';
export declare namespace RangeSliderNS {
    type ThumbContent = {
        icon: IconNS.Names;
    } | {
        emoji: EmojiNS.Emojis.Names;
    } | JSX.Element;
    interface Props extends Omit<BaseComponent, 'children'> {
        min?: number;
        max?: number;
        value?: number;
        step?: number;
        disabled?: boolean;
        masks?: {
            [value: number]: ReactNode;
        } | undefined;
        onWrite?: (value: number) => void;
        renderPopover?: ((value: number) => ReactNode) | false;
        thumbContent?: ThumbContent;
        size?: CommonSize;
        state?: DataEntriesState;
        label?: string;
        disabledOnLoading?: boolean;
        loading?: boolean;
        labelColon?: boolean;
        stateMessageProps?: TypographyNS.TextNS.Props;
    }
}
export declare const RangeSlider: React.ForwardRefExoticComponent<RangeSliderNS.Props & React.RefAttributes<HTMLDivElement>>;
