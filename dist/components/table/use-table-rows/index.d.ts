import React, { ReactNode } from 'react';
import { Row, Table } from '@tanstack/react-table';
import { TableNS } from '../types';
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
