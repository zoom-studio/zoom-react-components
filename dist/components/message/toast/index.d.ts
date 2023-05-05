import React from 'react';
import { Toast as ToastType } from 'react-hot-toast';
import { UseStatedIcon } from '../../../hooks';
import { CommonVariants } from '../../../types';
export declare namespace ToastNS {
    interface Props extends Omit<UseStatedIcon.Params, 'variant'> {
        variant?: CommonVariants;
        message: string;
        duration?: number;
        id?: string;
        loading?: boolean;
        closable?: boolean;
        thisToast?: ToastType;
        playSound?: boolean;
        customSound?: string;
    }
}
export declare const Toast: React.ForwardRefExoticComponent<ToastNS.Props & React.RefAttributes<HTMLDivElement>>;
