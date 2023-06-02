import { type FC } from 'react';
import { type TableGeneratorNS } from '.';
export declare namespace CellInputNS {
    interface Props {
        rowIndex: number;
        colIndex: number;
        value: TableGeneratorNS.DataType;
        onWrite?: (value: string) => void;
        isRTL: boolean;
    }
}
export declare const CellInput: FC<CellInputNS.Props>;
