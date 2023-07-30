import React from 'react';
import { type Descendant } from 'slate';
import type { BaseComponent } from '../../types';
import { type UseChatBubbleI18nNS } from './use-i18n';
export declare namespace ChatBubbleNS {
    type I18n = UseChatBubbleI18nNS.I18n;
    interface Message {
        time: string;
        message: Descendant[];
        avatar: string;
        userId: number | string;
        datetime: string;
        isMe?: boolean;
        isImportant?: boolean;
        seen?: boolean;
    }
    interface Props extends Omit<BaseComponent, 'children'>, Message {
        i18n?: I18n;
        isSending?: boolean;
        showAvatar?: boolean;
        showArrow?: boolean;
    }
}
export declare const ChatBubble: React.ForwardRefExoticComponent<ChatBubbleNS.Props & React.RefAttributes<HTMLDivElement>>;
