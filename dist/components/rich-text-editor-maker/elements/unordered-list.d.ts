import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace UnorderedListElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const UnorderedListElement: FC<UnorderedListElementNS.Props>;
