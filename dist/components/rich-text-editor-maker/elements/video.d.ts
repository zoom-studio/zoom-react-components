import { FC, ReactNode } from 'react';
import { RenderElementProps } from 'slate-react';
export declare namespace VideoElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const VideoElement: FC<VideoElementNS.Props>;
