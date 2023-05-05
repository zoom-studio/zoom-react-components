import { FC } from 'react';
import { TableNS } from '../types';
export declare namespace CellActionsNS {
    interface Props {
        actions: TableNS.Action<unknown[]>[];
        data: object;
    }
}
export declare const CellActions: FC<CellActionsNS.Props>;
