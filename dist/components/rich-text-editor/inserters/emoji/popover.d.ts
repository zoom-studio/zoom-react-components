import { FC } from 'react';
import { EmojiNS } from '../../..';
export declare namespace EmojiInserterPopoverNS {
    interface Props {
        onSelect: (emojiName: EmojiNS.Emojis.Names) => void;
    }
}
export declare const EmojiInserterPopover: FC<EmojiInserterPopoverNS.Props>;
