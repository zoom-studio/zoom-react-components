import { type FC, type MutableRefObject } from 'react';
import { type Row } from '@tanstack/react-table';
import { type CheckboxNS } from '../..';
export declare namespace CellCheckboxNS {
    interface Props extends CheckboxNS.Props {
        indeterminate: boolean;
        dragToSelect: boolean;
        row?: Row<object>;
        isStartedToSelectViaDragRef?: MutableRefObject<boolean>;
        isClickedCheckboxCheckedRef?: MutableRefObject<boolean>;
    }
}
export declare const CellCheckbox: FC<CellCheckboxNS.Props>;
