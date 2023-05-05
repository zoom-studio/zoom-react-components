/// <reference types="react" />
import { ColumnDef, ColumnHelper } from '@tanstack/react-table';
export declare namespace CreateColumnNS {
    interface Params {
        columnHelper: ColumnHelper<object>;
        result: ColumnDef<unknown, any>[];
        columnNode: JSX.Element;
    }
}
export declare const createColumn: <Dataset extends unknown[]>({ columnHelper, result, columnNode, }: CreateColumnNS.Params) => void;
