import React from 'react';
import { type InputNS, type SelectNS } from '..';
import { type useMacOSSelect } from './use-mac-os-select';
export declare namespace SelectValueNS {
    interface Props<MultiSelect extends boolean = false, Value extends SelectNS.PossibleValues = number, Data = unknown> extends Pick<SelectNS.Props<MultiSelect, Value, Data>, 'placeholder' | 'options'>, Required<Pick<SelectNS.Props<MultiSelect, Value, Data>, 'renderSelectedOption'>> {
        textSizeProps: InputNS.TextSize;
        multiSelect: boolean;
        select: ReturnType<typeof useMacOSSelect>;
    }
}
export declare const SelectValue: <MultiSelect extends boolean = false, Value extends SelectNS.PossibleValues = number, Data = unknown>({ textSizeProps, multiSelect, placeholder, select, renderSelectedOption, options, }: SelectValueNS.Props<MultiSelect, Value, Data>) => React.JSX.Element;
