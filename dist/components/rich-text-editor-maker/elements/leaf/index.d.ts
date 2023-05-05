import { FC, ReactNode } from 'react';
import { RenderLeafProps } from 'slate-react';
import { UseRenderLeafNS } from '..';
export declare namespace LeafElementNS {
    interface Props extends RenderLeafProps, UseRenderLeafNS.Params {
        children: ReactNode;
    }
}
export declare const LeafElement: FC<LeafElementNS.Props>;
