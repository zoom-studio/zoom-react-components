import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace HashtagElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const HashtagElement: FC<HashtagElementNS.Props>;
