import React, { type ReactNode } from 'react';
import { type MaybeString, type DeepKeys, type MaybeArray } from '@zoom-studio/js-ts-utils';
import { type TableNS } from '../types';
export declare namespace ColumnNS {
    interface Props<Dataset extends unknown[]> extends TableNS.ColumnMeta {
        width?: number;
        sortable?: boolean;
        hidable?: boolean;
        resizable?: boolean;
        id?: DeepKeys<Dataset[0]> | MaybeString;
        accessor: DeepKeys<Dataset[0]>;
        children?: MaybeArray<JSX.Element>;
        summary?: ReactNode;
    }
}
export declare const Column: <Dataset extends unknown[]>({ width, accessor }: ColumnNS.Props<Dataset>) => React.JSX.Element;
