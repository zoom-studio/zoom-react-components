import { type RenderElementProps } from 'slate-react';
export declare namespace TableElementNS {
    type VerticalSide = 'top' | 'bottom';
    type HorizontalSide = 'right' | 'left';
    const TableStyles: readonly ["normal", "with-header", "with-sidebar", "with-header-and-sidebar"];
    type TableStyles = (typeof TableStyles)[number];
    interface CellInfo {
        rowIndex: number;
        colIndex: number;
    }
    const CLASS_NAMES: {
        colActions: string;
        rowActions: string;
        inputCell: string;
    };
    interface Props extends RenderElementProps {
    }
}
