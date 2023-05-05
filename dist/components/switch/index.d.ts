import React, { HTMLAttributes } from 'react';
import { TypographyNS } from '..';
import { BaseComponent, BaseInputComponent, CommonSize, DataEntriesState } from '../../types';
export declare namespace SwitchNS {
    interface Props extends BaseInputComponent, BaseComponent {
        stateMessageProps?: TypographyNS.TextNS.Props;
        size?: CommonSize;
        disabled?: boolean;
        loading?: boolean;
        disabledOnLoading?: boolean;
        label?: string;
        labelProps?: HTMLAttributes<HTMLLabelElement>;
        state?: DataEntriesState;
        onWrite?: (isChecked: boolean) => void;
    }
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchNS.Props & React.RefAttributes<HTMLDivElement>>;
