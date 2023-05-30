export declare const useTableDOM: (tableID: string) => {
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
