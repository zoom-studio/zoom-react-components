import React from 'react';
import { type EmojiNS, type IconNS } from '..';
import { type BaseComponent, type CommonSize, type CommonVariants } from '../../types';
export declare namespace ButtonNS {
    type HtmlType = 'submit' | 'reset' | 'button';
    type HtmlTargets = '_self' | '_blank' | '_parent' | '_top';
    const Types: readonly ["primary", "secondary", "dashed", "link", "text", "bordered"];
    type Types = (typeof Types)[number];
    const Shapes: readonly ["default", "circle", "sharp", "square", "sharp-square", "rounded"];
    type Shapes = (typeof Shapes)[number];
    type MaterialIcon = IconNS.Names;
    type EmojiIcon = EmojiNS.Emojis.Names;
    interface Props extends BaseComponent<HTMLButtonElement> {
        type?: Types;
        htmlType?: HtmlType;
        size?: CommonSize;
        shape?: Shapes;
        href?: string;
        target?: HtmlTargets;
        innerClassName?: string;
        suffixClassName?: string;
        prefixClassName?: string;
        disabled?: boolean;
        loading?: boolean;
        full?: boolean;
        active?: boolean;
        disabledOnLoading?: boolean;
        variant?: CommonVariants;
        prefixMaterialIcon?: MaterialIcon;
        prefixEmojiIcon?: EmojiIcon;
        suffixMaterialIcon?: MaterialIcon;
        suffixEmojiIcon?: EmojiIcon;
        useSpan?: boolean;
        showSpinOnLoading?: boolean;
        materialIconProps?: Omit<IconNS.Props, 'className' | 'name'>;
        emojiIconProps?: Omit<EmojiNS.Props, 'className' | 'name'>;
    }
}
export declare const Button: React.ForwardRefExoticComponent<ButtonNS.Props & React.RefAttributes<HTMLButtonElement>>;
