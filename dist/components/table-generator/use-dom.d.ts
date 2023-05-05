import { MutableRefObject } from 'react';
import { ZoomLogProviderNS } from '../..';
export declare namespace UseTableGeneratorDomNS {
    interface Params {
        sendLog: ZoomLogProviderNS.Log;
        tableRef: MutableRefObject<HTMLTableElement | null>;
    }
}
export declare const useTableGeneratorDOM: ({ sendLog, tableRef }: UseTableGeneratorDomNS.Params) => {
    getTable: (logDescription: string, callback?: ((table: HTMLTableElement) => void) | undefined) => HTMLTableElement | undefined;
    activeColActions: (colIndex: number) => void;
    deactiveCurrentActiveColActions: () => void;
    activeRowActions: (rowIndex: number) => void;
    deactiveCurrentActiveRowActions: () => void;
    removalInputCellsByColIndex: (colIndex: number) => void;
    removalInputCellsByRowIndex: (rowIndex: number) => void;
    unRemovalAllRemovalInputCells: () => void;
    removeAllMarkedAsAppendToLeftInputCells: () => void;
    removeAllMarkedAsAppendToRightInputCells: () => void;
    removeAllMarkedAsAppendToTopInputCells: () => void;
    removeAllMarkedAsAppendToBottomInputCells: () => void;
    markInputCellsAsAppendToLeftByColIndex: (colIndex: number) => void;
    markInputCellsAsAppendToRightByColIndex: (colIndex: number) => void;
    markInputCellsAsAppendToTopByRowIndex: (rowIndex: number) => void;
    markInputCellsAsAppendToBottomByRowIndex: (rowIndex: number) => void;
};
