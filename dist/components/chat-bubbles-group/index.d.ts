import React from 'react';
import { type ChatBubbleNS, type InfiniteScrollViewNS } from '..';
import type { BaseComponent } from '../../types';
export declare namespace ChatBubblesGroupNS {
    interface Props extends Omit<BaseComponent, 'children'> {
        bubbles: ChatBubbleNS.Props[];
        infiniteScrollProps: Omit<InfiniteScrollViewNS.Props, 'children' | 'reverseScroll' | 'dataset' | 'groupBy'>;
    }
}
export declare const ChatBubblesGroup: React.ForwardRefExoticComponent<ChatBubblesGroupNS.Props & React.RefAttributes<HTMLDivElement>>;
