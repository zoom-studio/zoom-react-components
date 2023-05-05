import React, { HTMLAttributes } from 'react';
import { TypographyNS } from '..';
import { BaseComponent, BaseInputComponent, CommonSize, DataEntriesState } from '../../types';
export declare namespace RadioButtonNS {
    type Value = number | string;
    interface Props extends BaseInputComponent, BaseComponent {
        name: string;
        stateMessageProps?: TypographyNS.TextNS.Props;
        size?: CommonSize;
        disabled?: boolean;
        loading?: boolean;
        disabledOnLoading?: boolean;
        label?: string;
        labelProps?: HTMLAttributes<HTMLLabelElement>;
        state?: DataEntriesState;
        value: Value;
        onWrite?: (value: Value) => void;
    }
}
export declare const RadioButton: React.ForwardRefExoticComponent<RadioButtonNS.Props & React.RefAttributes<HTMLDivElement>>;
