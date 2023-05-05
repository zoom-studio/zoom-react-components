import { FC, ReactNode } from 'react';
import { RenderElementProps } from 'slate-react';
export declare namespace OrderedListElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const OrderedListElement: FC<OrderedListElementNS.Props>;
