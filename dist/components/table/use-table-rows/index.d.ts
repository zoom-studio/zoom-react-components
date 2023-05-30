import React, { type ReactNode } from 'react';
import { type Row, type Table } from '@tanstack/react-table';
import { type TableNS } from '../types';
export declare namespace UseTableRowsNS {
    interface VirtualizedRowObservers {
        firstRow: ReactNode;
        lastRow: ReactNode;
    }
}
export declare const useTableRows: (table: Table<unknown>, virtualized?: TableNS.VirtualizedSettings) => {
    tableContainerRef: React.RefObject<HTMLDivElement>;
    tableRows: Row<unknown>[];
    virtualizedRowObservers: UseTableRowsNS.VirtualizedRowObservers;
};
