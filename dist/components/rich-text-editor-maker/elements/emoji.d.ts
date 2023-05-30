import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace EmojiElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const EmojiElement: FC<EmojiElementNS.Props>;
