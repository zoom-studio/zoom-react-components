import React, { type HTMLAttributes, type HTMLInputTypeAttribute, type RefObject } from 'react';
import { type SpinNS, type TypographyNS } from '..';
import { type BaseComponent, type BaseInputComponent, type CommonSize, type DataEntriesState } from '../../types';
export declare namespace InputNS {
    type TextSize = Pick<TypographyNS.TextNS.Props, 'small' | 'normal' | 'large'>;
    type Type = Exclude<HTMLInputTypeAttribute, 'button' | 'checkbox' | 'radio' | object> | 'numeral-keypad-text';
    interface ComboBoxPartedItem {
        value: string;
        matched: boolean;
    }
    interface Props extends Omit<BaseInputComponent, 'inputRef' | 'value'>, BaseComponent {
        onWrite?: (value: string) => void;
        onTogglePasswordVisibility?: (isVisible: boolean) => void;
        comboBox?: string[];
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
        changeStyleOnFocus?: boolean;
        value?: string;
    }
}
export declare const Input: React.ForwardRefExoticComponent<InputNS.Props & React.RefAttributes<HTMLDivElement>>;
