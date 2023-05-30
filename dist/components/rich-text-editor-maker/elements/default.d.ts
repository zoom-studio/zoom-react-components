import { type FC, type ReactNode } from 'react';
import { type RenderElementProps } from 'slate-react';
export declare namespace DefaultElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const DefaultElement: FC<DefaultElementNS.Props>;
