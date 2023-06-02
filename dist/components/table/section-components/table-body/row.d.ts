import { type CSSProperties, type FC } from 'react';
import { type Row } from '@tanstack/react-table';
import { type TableNS } from '../../..';
import { type useTableInfiniteScroll } from '../../use-infinite-scroll';
export declare namespace TableBodyRowNS {
    interface Props extends Pick<TableNS.Props, 'renderRowExpanded' | 'infiniteScroll' | 'toggleSelectOnRowClick' | 'selectable'>, Partial<Pick<ReturnType<typeof useTableInfiniteScroll>, 'lastRowRef'>> {
        row: Row<unknown>;
        totalRows: number;
        rowIndex: number;
        getStickyTableDataStyles: (tableDataIndex: number) => CSSProperties;
    }
}
export declare const TableBodyRow: FC<TableBodyRowNS.Props>;
