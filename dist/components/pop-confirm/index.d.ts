import React, { type HTMLAttributes, type ReactNode } from 'react';
import { type ButtonNS, type PopoverNS } from '..';
import { type UseStatedIcon } from '../../hooks';
import { type CommonVariants } from '../../types';
export declare namespace PopConfirmNS {
    type Action = ButtonNS.Props | ((handlers: PopoverNS.Handlers) => ButtonNS.Props);
    interface Props extends Omit<UseStatedIcon.Params, 'variant'>, Pick<PopoverNS.Props, 'onOpen' | 'onClose' | 'defaultIsOpen' | 'placement' | 'autoCloseDelay' | 'hoverDelay' | 'width'> {
        title: string;
        buttonProps?: Omit<ButtonNS.Props, 'onClick'>;
        children?: ReactNode;
        variant?: CommonVariants;
        confirm?: Action;
        cancel?: Action;
        containerProps?: HTMLAttributes<HTMLDivElement>;
        description?: string;
    }
}
export declare const PopConfirm: React.ForwardRefExoticComponent<PopConfirmNS.Props & React.RefAttributes<HTMLDivElement>>;
