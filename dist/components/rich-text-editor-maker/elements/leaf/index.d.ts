import { type FC, type ReactNode } from 'react';
import { type RenderLeafProps } from 'slate-react';
import { type UseRenderLeafNS } from '..';
export declare namespace LeafElementNS {
    interface Props extends RenderLeafProps, UseRenderLeafNS.Params {
        children: ReactNode;
    }
}
export declare const LeafElement: FC<LeafElementNS.Props>;
