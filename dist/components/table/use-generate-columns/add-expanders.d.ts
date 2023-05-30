import { type ColumnDef, type ColumnHelper } from '@tanstack/react-table';
export declare namespace AddExpandersNS {
    interface Params {
        columnHelper: ColumnHelper<object>;
        result: ColumnDef<unknown, any>[];
    }
}
export declare const addExpanders: ({ columnHelper, result }: AddExpandersNS.Params) => void;
