import { ColumnDef } from '@tanstack/react-table';
import { TableNS } from '../types';
import { UseTableI18nNS } from '../use-i18n';
export declare namespace UseGenerateColumnsNS {
    interface Params<Dataset extends unknown[]> extends Pick<TableNS.Props<Dataset>, 'children' | 'selectable' | 'renderRowExpanded' | 'actionsColumnWidth' | 'dragToSelect'> {
        i18n: Required<UseTableI18nNS.I18n>;
        actions: TableNS.Action<Dataset>[];
        isLoading: boolean;
    }
}
export declare const useGenerateColumns: <Dataset extends unknown[]>({ children, selectable, i18n, renderRowExpanded, actions, actionsColumnWidth, dragToSelect, isLoading, }: UseGenerateColumnsNS.Params<Dataset>) => ColumnDef<unknown, any>[];
