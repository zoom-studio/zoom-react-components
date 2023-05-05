import { FC, ReactNode } from 'react';
import { RenderElementProps } from 'slate-react';
export declare namespace ListItemElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const ListItemElement: FC<ListItemElementNS.Props>;
