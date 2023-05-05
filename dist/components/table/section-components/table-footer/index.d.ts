import { FC } from 'react';
import { Table } from '@tanstack/react-table';
import { TableNS } from '../../types';
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
