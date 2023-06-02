import { type FC } from 'react';
import { type Table } from '@tanstack/react-table';
import { type UseTableI18nNS } from '../use-i18n';
export declare namespace HeaderCellCheckboxNS {
    interface Props {
        table: Table<object>;
        i18n: Required<UseTableI18nNS.I18n>;
    }
}
export declare const HeaderCellCheckbox: FC<HeaderCellCheckboxNS.Props>;
