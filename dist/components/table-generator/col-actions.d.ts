import { FC } from 'react';
import { TableGeneratorNS } from '..';
import { UseTableGeneratorDomNS } from './use-dom';
export declare namespace ColActionsNS {
    interface Props extends UseTableGeneratorDomNS.Params {
        colIndex: number;
        addColumn: (colToAppend: TableGeneratorNS.ColToAppend) => void;
        removeColumn: () => void;
    }
}
export declare const ColActions: FC<ColActionsNS.Props>;
