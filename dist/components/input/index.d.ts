import React, { HTMLAttributes, HTMLInputTypeAttribute, RefObject } from 'react';
import { SpinNS, TypographyNS } from '..';
import { BaseComponent, BaseInputComponent, CommonSize, DataEntriesState } from '../../types';
export declare namespace InputNS {
    type TextSize = Pick<TypographyNS.TextNS.Props, 'small' | 'normal' | 'large'>;
    type Type = Exclude<HTMLInputTypeAttribute, 'button' | 'checkbox' | 'radio' | object> | 'numeral-keypad-text';
    interface Props extends BaseInputComponent, BaseComponent {
        onWrite?: (value: string) => void;
        onTogglePasswordVisibility?: (isVisible: boolean) => void;
        labelProps?: HTMLAttributes<HTMLSpanElement>;
        labelContainerProps?: HTMLAttributes<HTMLLabelElement>;
        labelTextProps?: TypographyNS.TextNS.Props;
        stateMessageProps?: TypographyNS.TextNS.Props;
        spinProps?: SpinNS.Props;
        label?: string;
        size?: CommonSize;
        state?: DataEntriesState;
        labelRef?: RefObject<HTMLLabelElement>;
        disabled?: boolean;
        loading?: boolean;
        labelColon?: boolean;
        disabledOnLoading?: boolean;
        type?: Type;
        passwordToggleButton?: boolean;
        searchClearButton?: boolean;
        numberButtonHandlers?: boolean;
        autoDirection?: boolean;
    }
}
export declare const Input: React.ForwardRefExoticComponent<InputNS.Props & React.RefAttributes<HTMLDivElement>>;
