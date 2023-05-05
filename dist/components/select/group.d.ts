import { FC } from 'react';
import { SelectOptionNS } from './option';
export declare namespace SelectGroupNS {
    interface Props<Values extends SelectOptionNS.Value> {
        options?: SelectOptionNS.Props<Values>[];
        label: string;
        disabled?: boolean;
        selected?: boolean;
        value: SelectOptionNS.Value;
    }
    interface GroupedProps extends Omit<Props<SelectOptionNS.Value>, 'options'> {
        options?: SelectOptionNS.GroupedOptions;
    }
    interface GroupedSelectedOptions {
        [parentValue: SelectOptionNS.Value]: SelectOptionNS.Value[];
    }
    interface InnerProps {
        onSelect: (option: GroupedSelectedOptions) => void;
        onSelectAll: (options: GroupedSelectedOptions) => void;
        multiSelect: boolean;
        selectAllText: string;
        deselectAllText: string;
        searchQuery: string;
    }
}
export declare const SelectGroup: FC<SelectGroupNS.GroupedProps & SelectGroupNS.InnerProps>;
