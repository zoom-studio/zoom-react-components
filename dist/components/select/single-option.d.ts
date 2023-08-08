import React from 'react';
import { type SelectNS } from '.';
import { type InputNS } from '..';
import { type useMacOSSelect } from './use-mac-os-select';
export declare namespace SingleOptionNS {
    interface Props<Value extends SelectNS.PossibleValues = number, Data = unknown> extends Required<Pick<SelectNS.Props<true, Value, Data>, 'children'>> {
        option: SelectNS.Option<Value, Data>;
        select: ReturnType<typeof useMacOSSelect>;
        index: number;
        isChildOption?: boolean;
        textSizeProps: InputNS.TextSize;
    }
}
export declare const SingleOption: <Value extends SelectNS.PossibleValues = number, Data = unknown>({ option, select, index, children, isChildOption, textSizeProps, }: SingleOptionNS.Props<Value, Data>) => React.JSX.Element;
