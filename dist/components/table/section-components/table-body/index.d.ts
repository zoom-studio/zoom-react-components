import { type FC, type RefObject } from 'react';
import { type Row, type Table } from '@tanstack/react-table';
import { type TableNS } from '../../types';
import { type useTableInfiniteScroll } from '../../use-infinite-scroll';
import { type UseTableRowsNS } from '../../use-table-rows';
export declare namespace TableBodyNS {
    interface Props extends Pick<TableNS.Props, 'selectable' | 'renderRowExpanded' | 'toggleSelectOnRowClick' | 'infiniteScroll' | 'endMessage'>, Partial<Pick<ReturnType<typeof useTableInfiniteScroll>, 'lastRowRef'>> {
        rows: Row<unknown>[];
        virtualizedRowObservers: UseTableRowsNS.VirtualizedRowObservers;
        isLoading: boolean;
        table: Table<unknown>;
        isMoreDataRemaining: boolean;
        i18n: Required<TableNS.I18n>;
        hasData: boolean;
        onBackToTop: () => void;
        tableContainerRef: RefObject<HTMLDivElement>;
        virtualizedSettings?: TableNS.VirtualizedSettings;
    }
}
export declare const TableBody: FC<TableBodyNS.Props>;
