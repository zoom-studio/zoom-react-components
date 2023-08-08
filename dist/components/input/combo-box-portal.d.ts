import { type FC } from 'react';
import { type useComboBox } from './use-combobox';
export declare namespace ComboBoxPortalNS {
    interface Props {
        comboBox: ReturnType<typeof useComboBox>;
        setValue: (value: string) => void;
        inputValue: string;
    }
}
export declare const ComboBoxPortal: FC<ComboBoxPortalNS.Props>;
