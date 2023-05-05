import { ReactNode } from 'react';
import { DeepKeys, MaybeArray } from '@zoom-studio/zoom-js-ts-utils';
import { TableNS } from '../types';
export declare namespace ColumnNS {
    interface Props<Dataset extends unknown[]> extends TableNS.ColumnMeta {
        width?: number;
        sortable?: boolean;
        hidable?: boolean;
        resizable?: boolean;
        id?: DeepKeys<Dataset[0]> | (string & {});
        accessor: DeepKeys<Dataset[0]>;
        children?: MaybeArray<JSX.Element>;
        summary?: ReactNode;
    }
}
export declare const Column: <Dataset extends unknown[]>({ width, accessor }: ColumnNS.Props<Dataset>) => JSX.Element;
