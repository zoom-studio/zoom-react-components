import { type FC } from 'react';
import { type Table } from '@tanstack/react-table';
import { type TableNS } from '../../types';
export declare namespace TableActionsBarNS {
    interface Props extends Pick<TableNS.Props, 'showColumnsButton' | 'showSearch' | 'title' | 'debounceSearchInput' | 'searchInputDebounceDelay' | 'onSearch'> {
        i18n: Required<TableNS.I18n>;
        table: Table<unknown>;
    }
}
export declare const TableActionsBar: FC<TableActionsBarNS.Props>;
