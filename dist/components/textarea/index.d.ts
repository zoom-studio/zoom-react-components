import React, { type HTMLAttributes, type RefObject } from 'react';
import { type SpinNS, type TypographyNS } from '..';
import { type BaseComponent, type BaseTextareaComponent, type CommonSize, type DataEntriesState } from '../../types';
export declare namespace TextareaNS {
    type TextSize = Pick<TypographyNS.TextNS.Props, 'small' | 'normal' | 'large'>;
    interface Props extends BaseComponent, BaseTextareaComponent {
        onWrite?: (value: string) => void;
        labelProps?: HTMLAttributes<HTMLSpanElement>;
        labelContainerProps?: HTMLAttributes<HTMLLabelElement>;
        labelTextProps?: TypographyNS.TextNS.Props;
        stateMessageProps?: TypographyNS.TextNS.Props;
        spinProps?: SpinNS.Props;
        label?: string;
        size?: CommonSize;
        state?: DataEntriesState;
        disabled?: boolean;
        loading?: boolean;
        labelColon?: boolean;
        disabledOnLoading?: boolean;
        labelRef?: RefObject<HTMLLabelElement>;
        autoHeight?: boolean;
        minHeight?: number | string;
        maxHeight?: number | string;
        autoDirection?: boolean;
    }
}
export declare const Textarea: React.ForwardRefExoticComponent<TextareaNS.Props & React.RefAttributes<HTMLDivElement>>;
