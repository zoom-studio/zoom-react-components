import { FC, MutableRefObject } from 'react';
import { Row } from '@tanstack/react-table';
import { CheckboxNS } from '../..';
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
