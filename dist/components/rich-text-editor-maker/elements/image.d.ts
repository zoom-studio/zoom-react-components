import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace ImageElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const ImageElement: FC<ImageElementNS.Props>;
