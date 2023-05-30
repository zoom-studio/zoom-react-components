import { type ColumnDef, type ColumnHelper } from '@tanstack/react-table';
import { type TableNS } from '../types';
export declare namespace AddActionsNS {
    interface Params extends Pick<TableNS.Props, 'actionsColumnWidth'> {
        columnHelper: ColumnHelper<object>;
        result: ColumnDef<unknown, any>[];
        actions: TableNS.Action<unknown[]>[];
    }
}
export declare const addActions: ({ columnHelper, result, actions, actionsColumnWidth, }: AddActionsNS.Params) => void;
