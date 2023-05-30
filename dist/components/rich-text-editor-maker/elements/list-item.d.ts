import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace ListItemElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const ListItemElement: FC<ListItemElementNS.Props>;
