import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace OrderedListElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const OrderedListElement: FC<OrderedListElementNS.Props>;
