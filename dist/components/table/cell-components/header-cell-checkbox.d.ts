import { FC } from 'react';
import { Table } from '@tanstack/react-table';
import { UseTableI18nNS } from '../use-i18n';
export declare namespace HeaderCellCheckboxNS {
    interface Props {
        table: Table<object>;
        i18n: Required<UseTableI18nNS.I18n>;
    }
}
export declare const HeaderCellCheckbox: FC<HeaderCellCheckboxNS.Props>;
