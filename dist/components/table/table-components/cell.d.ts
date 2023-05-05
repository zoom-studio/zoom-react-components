import { ReactNode } from 'react';
import { BaseComponent } from '../../../types';
export declare namespace CellNS {
    interface Props<Dataset extends unknown[]> extends Omit<BaseComponent<HTMLTableCellElement>, 'children'> {
        children?: ReactNode | ((data: Dataset[0], index: number) => ReactNode);
    }
}
export declare const Cell: <Dataset extends unknown[]>({ children, className, containerProps, }: CellNS.Props<Dataset>) => JSX.Element;
