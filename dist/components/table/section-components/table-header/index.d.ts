import { type FC } from 'react';
import { type Table } from '@tanstack/react-table';
import { type TableNS } from '../../types';
export declare namespace TableHeaderNS {
    interface Props extends Required<Pick<TableNS.Props, 'resizeColumnOnReleaseMouseButton' | 'resizableColumns'>>, Pick<TableNS.Props, 'selectable' | 'renderRowExpanded'> {
        table: Table<unknown>;
        isLoading: boolean;
        hasData: boolean;
    }
}
export declare const TableHeader: FC<TableHeaderNS.Props>;
