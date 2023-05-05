import { CSSProperties, FC } from 'react';
import { Row } from '@tanstack/react-table';
import { TableNS } from '../../..';
import { useTableInfiniteScroll } from '../../use-infinite-scroll';
export declare namespace TableBodyRowNS {
    interface Props extends Pick<TableNS.Props, 'renderRowExpanded' | 'infiniteScroll' | 'toggleSelectOnRowClick' | 'selectable'>, Partial<Pick<ReturnType<typeof useTableInfiniteScroll>, 'lastRowRef'>> {
        row: Row<unknown>;
        totalRows: number;
        rowIndex: number;
        getStickyTableDataStyles: (tableDataIndex: number) => CSSProperties;
    }
}
export declare const TableBodyRow: FC<TableBodyRowNS.Props>;
