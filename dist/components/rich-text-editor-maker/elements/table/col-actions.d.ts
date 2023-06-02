import { type FC } from 'react';
import { type RichTextEditorMakerNS } from '../../..';
import { type TableElementNS } from './types';
export declare namespace ColActionsNS {
    interface Props {
        colIndex: number;
        addColumn: (side: TableElementNS.HorizontalSide) => void;
        removeColumn: () => void;
        tableID: string;
        tableInfo: RichTextEditorMakerNS.TableCells;
    }
}
export declare const ColActions: FC<ColActionsNS.Props>;
