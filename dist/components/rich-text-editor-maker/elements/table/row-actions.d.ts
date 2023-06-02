import { type FC } from 'react';
import { type RichTextEditorMakerNS } from '../../..';
import { type TableElementNS } from './types';
export declare namespace RowActionsNS {
    interface Props {
        rowIndex: number;
        addRow: (side: TableElementNS.VerticalSide) => void;
        removeRow: () => void;
        tableID: string;
        tableInfo: RichTextEditorMakerNS.TableCells;
    }
}
export declare const RowActions: FC<RowActionsNS.Props>;
