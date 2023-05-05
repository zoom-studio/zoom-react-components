import React from 'react';
import { EmojiNS, IconNS } from '..';
import { BaseComponent } from '../../types';
export declare namespace EmojiPickerNS {
    const CACHE_KEY = "zoomrc-emoji-picker-history";
    type Collection = EmojiNS.Emojis.GroupNames | 'History';
    interface Props extends BaseComponent {
        onSelect?: (emoji: EmojiNS.Emojis.Names) => void;
        cacheLength?: number;
        defaultMemoizedEmojis?: EmojiNS.Emojis.Names[];
        defaultActiveCollection?: Collection;
        emojisPerRow?: number;
    }
    interface HeaderItem {
        icon: IconNS.Names;
        collection: Collection;
    }
    const defaultMemoizedEmojis: EmojiNS.Emojis.Names[];
    type I18n = {
        pickAnEmoji?: string;
        collections?: {
            [name in Collection]?: string;
        };
        emojis?: {
            [name in EmojiNS.Emojis.Names]?: string;
        };
    };
}
export declare const EmojiPicker: React.ForwardRefExoticComponent<EmojiPickerNS.Props & React.RefAttributes<HTMLDivElement>>;
