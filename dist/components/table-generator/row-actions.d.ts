import { type FC } from 'react';
import { type TableGeneratorNS } from '..';
import { type UseTableGeneratorDomNS } from './use-dom';
export declare namespace RowActionsNS {
    interface Props extends UseTableGeneratorDomNS.Params {
        rowIndex: number;
        addRow: (rowToAppend: TableGeneratorNS.RowToAppend) => void;
        removeRow: () => void;
    }
}
export declare const RowActions: FC<RowActionsNS.Props>;
