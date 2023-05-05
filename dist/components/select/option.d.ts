import { FC } from 'react';
export declare namespace SelectOptionNS {
    type Value = string | number;
    interface Props<Values extends SelectOptionNS.Value> {
        label: string;
        value: Values;
        disabled?: boolean;
        selected?: boolean;
    }
    interface GroupedOptions {
        [value: Value]: Props<SelectOptionNS.Value>;
    }
    interface InnerProps {
        onSelect: (option: Value) => void;
        searchQuery: string;
        isGroupOption?: boolean;
    }
}
export declare const SelectOption: FC<SelectOptionNS.Props<SelectOptionNS.Value> & SelectOptionNS.InnerProps>;
