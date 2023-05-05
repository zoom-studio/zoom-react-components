import { FC, ReactNode } from 'react';
import { RenderElementProps } from 'slate-react';
export declare namespace QuoteElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const QuoteElement: FC<QuoteElementNS.Props>;
