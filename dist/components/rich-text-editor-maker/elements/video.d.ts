import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace VideoElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const VideoElement: FC<VideoElementNS.Props>;
