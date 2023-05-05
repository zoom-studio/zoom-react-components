import { FC, ReactNode } from 'react';
import { RenderElementProps } from 'slate-react';
export declare namespace HeadingElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const HeadingElement: FC<HeadingElementNS.Props>;
