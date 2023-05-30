import { type FC } from 'react';
import { type Table } from '@tanstack/react-table';
import { type TableNS } from '../../types';
export declare namespace TableFooterNS {
    interface Props extends Pick<TableNS.Props, 'selectable' | 'renderRowExpanded'> {
        table: Table<unknown>;
        isLoadingMoreData: boolean;
        isLoading: boolean;
        hasData: boolean;
        i18n: Required<TableNS.I18n>;
    }
}
export declare const TableFooter: FC<TableFooterNS.Props>;
