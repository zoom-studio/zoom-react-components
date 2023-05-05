import { FC, ReactNode } from 'react';
import { RenderElementProps } from 'slate-react';
export declare namespace EmojiElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const EmojiElement: FC<EmojiElementNS.Props>;
