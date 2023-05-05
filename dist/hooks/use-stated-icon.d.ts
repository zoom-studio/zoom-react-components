import { EmojiNS, IconNS } from '../components';
import { CommonVariants } from '../types';
export declare namespace UseStatedIcon {
    interface Params {
        icon?: IconNS.Names;
        emoji?: EmojiNS.Emojis.Names;
        variant: CommonVariants;
        noIconAndEmoji?: boolean;
    }
    interface Return {
        type: 'emoji' | 'icon' | 'nothing';
        name?: IconNS.Names | EmojiNS.Emojis.Names;
    }
    type TupleReturn = [Return['name'], Return['type']];
}
export declare const useStatedIcon: ({ emoji, icon, variant, noIconAndEmoji, }: UseStatedIcon.Params) => UseStatedIcon.TupleReturn;
