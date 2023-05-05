import { MutableRefObject } from 'react';
import { ColumnDef, ColumnHelper } from '@tanstack/react-table';
import { UseTableI18nNS } from '../use-i18n';
import { TableNS } from '../types';
export declare namespace AddCheckBoxesNS {
    interface Params extends Pick<TableNS.Props, 'dragToSelect'> {
        columnHelper: ColumnHelper<object>;
        result: ColumnDef<unknown, any>[];
        i18n: Required<UseTableI18nNS.I18n>;
        isStartedToSelectViaDragRef: MutableRefObject<boolean>;
        isClickedCheckboxCheckedRef: MutableRefObject<boolean>;
        isLoading: boolean;
    }
}
export declare const addCheckBoxes: ({ columnHelper, result, i18n, isStartedToSelectViaDragRef, isClickedCheckboxCheckedRef, dragToSelect, isLoading, }: AddCheckBoxesNS.Params) => void;
