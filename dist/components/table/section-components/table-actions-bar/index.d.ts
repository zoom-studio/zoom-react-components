import { FC } from 'react';
import { Table } from '@tanstack/react-table';
import { TableNS } from '../../types';
export declare namespace TableActionsBarNS {
    interface Props extends Pick<TableNS.Props, 'showColumnsButton' | 'showSearch' | 'title' | 'debounceSearchInput' | 'searchInputDebounceDelay' | 'onSearch'> {
        i18n: Required<TableNS.I18n>;
        table: Table<unknown>;
    }
}
export declare const TableActionsBar: FC<TableActionsBarNS.Props>;
