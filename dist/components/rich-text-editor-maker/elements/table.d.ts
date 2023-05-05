import { FC, ReactNode } from 'react';
import { RenderElementProps } from 'slate-react';
export declare namespace TableElementNS {
    interface Props extends RenderElementProps {
        children: ReactNode;
    }
}
export declare const TableElement: FC<TableElementNS.Props>;
