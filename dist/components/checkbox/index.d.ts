import React, { type HTMLAttributes } from 'react';
import { type TypographyNS } from '..';
import { type BaseComponent, type BaseInputComponent, type CommonSize, type DataEntriesState } from '../../types';
export declare namespace CheckboxNS {
    interface Props extends BaseInputComponent, BaseComponent {
        stateMessageProps?: TypographyNS.TextNS.Props;
        size?: CommonSize;
        disabled?: boolean;
        loading?: boolean;
        disabledOnLoading?: boolean;
        label?: string;
        labelProps?: HTMLAttributes<HTMLLabelElement>;
        state?: DataEntriesState;
        indeterminate?: boolean;
        onWrite?: (isChecked: boolean) => void;
    }
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxNS.Props & React.RefAttributes<HTMLDivElement>>;
