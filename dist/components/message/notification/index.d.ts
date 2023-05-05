import React, { ReactNode } from 'react';
import { Toast as NotificationType } from 'react-hot-toast';
import { ButtonNS } from '../..';
import { UseStatedIcon } from '../../../hooks';
import { CommonVariants } from '../../../types';
export declare namespace NotificationNS {
    type Action = ButtonNS.Props | ((notificationId: string) => ButtonNS.Props);
    interface Props extends Omit<UseStatedIcon.Params, 'variant'> {
        title: string;
        message: string | ReactNode;
        images?: string[];
        variant?: CommonVariants;
        duration?: number;
        id?: string;
        loading?: boolean;
        closable?: boolean;
        showProgress?: boolean;
        thisNotification?: NotificationType;
        playSound?: boolean;
        customSound?: string;
        actions?: Action[];
    }
}
export declare const Notification: React.ForwardRefExoticComponent<NotificationNS.Props & React.RefAttributes<HTMLDivElement>>;
