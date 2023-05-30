import React from 'react';
import { type ScrollViewNS } from '..';
import { type BaseComponent } from '../../types';
export declare namespace TableGeneratorNS {
    type DataType = string | number | boolean;
    type CellsData = DataType[][];
    const CLASS_NAMES: {
        colActions: string;
        rowActions: string;
        inputCell: string;
    };
    interface ColToAppend {
        appendTo: 'right' | 'left';
    }
    interface RowToAppend {
        appendTo: 'top' | 'bottom';
    }
    interface CellInfo {
        rowIndex: number;
        colIndex: number;
    }
    interface CellsCount {
        rows: number;
        cols: number;
    }
    interface OnWriteCallbackParams {
        cellsData: CellsData;
        cellsCount: CellsCount;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        cellsData?: CellsData | CellsCount;
        maxHeight?: string | number;
        maxWidth?: string | number;
        scrollViewProps?: Omit<ScrollViewNS.Props, 'maxHeight'>;
        onWrite?: (params: OnWriteCallbackParams) => void;
    }
}
export declare const TableGenerator: React.ForwardRefExoticComponent<TableGeneratorNS.Props & React.RefAttributes<HTMLDivElement>>;
