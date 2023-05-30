import React, { type ReactNode } from 'react';
import { type BaseComponent } from '../../../types';
export declare namespace CellNS {
    interface Props<Dataset extends unknown[]> extends Omit<BaseComponent<HTMLTableCellElement>, 'children'> {
        children?: ReactNode | ((data: Dataset[0], index: number) => ReactNode);
    }
}
export declare const Cell: <Dataset extends unknown[]>({ children, className, containerProps, }: CellNS.Props<Dataset>) => React.JSX.Element;
