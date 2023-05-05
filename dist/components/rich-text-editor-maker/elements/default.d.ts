import { FC, ReactNode } from 'react';
import { RenderElementProps } from 'slate-react';
export declare namespace DefaultElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const DefaultElement: FC<DefaultElementNS.Props>;
