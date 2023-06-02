import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace HeadingElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const HeadingElement: FC<HeadingElementNS.Props>;
