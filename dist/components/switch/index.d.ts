import React, { type HTMLAttributes } from 'react';
import { type TypographyNS } from '..';
import { type BaseComponent, type BaseInputComponent, type CommonSize, type DataEntriesState } from '../../types';
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
