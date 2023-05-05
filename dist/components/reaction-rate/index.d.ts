import React, { MouseEvent } from 'react';
import { Range } from '@zoom-studio/zoom-js-ts-utils';
import { EmojiNS } from '..';
import { BaseComponent, CommonSize } from '../../types';
export declare namespace ReactionRateNS {
    type EmojiName = EmojiNS.Emojis.Names;
    type SelectedRange = Range<1, 6>;
    interface Props extends BaseComponent {
        type?: 'quintuple' | 'couple';
        selectedReaction?: SelectedRange;
        loading?: boolean;
        disabled?: boolean;
        size?: CommonSize;
        onSelect?: (rate: SelectedRange, evt?: MouseEvent<HTMLButtonElement>) => void;
        emojis?: [EmojiName, EmojiName] | [EmojiName, EmojiName, EmojiName, EmojiName, EmojiName];
    }
}
export declare const ReactionRate: React.ForwardRefExoticComponent<ReactionRateNS.Props & React.RefAttributes<HTMLDivElement>>;
