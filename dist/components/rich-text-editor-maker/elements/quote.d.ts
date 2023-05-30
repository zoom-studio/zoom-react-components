import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace QuoteElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const QuoteElement: FC<QuoteElementNS.Props>;
