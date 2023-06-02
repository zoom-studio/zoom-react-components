import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace MentionElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const MentionElement: FC<MentionElementNS.Props>;
