import React, { type HTMLAttributes } from 'react';
import { type TypographyNS } from '..';
import { type BaseComponent, type BaseInputComponent, type CommonSize, type DataEntriesState } from '../../types';
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
