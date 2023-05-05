import { FC } from 'react';
import { Table } from '@tanstack/react-table';
import { TableNS } from '../../types';
export declare namespace TableHeaderNS {
    interface Props extends Required<Pick<TableNS.Props, 'resizeColumnOnReleaseMouseButton' | 'resizableColumns'>>, Pick<TableNS.Props, 'selectable' | 'renderRowExpanded'> {
        table: Table<unknown>;
        isLoading: boolean;
        hasData: boolean;
    }
}
export declare const TableHeader: FC<TableHeaderNS.Props>;
