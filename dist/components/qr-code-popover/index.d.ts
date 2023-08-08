import React, { type ReactNode } from 'react';
import { type ButtonNS, type PopoverNS, type QRCodeNS } from '..';
import { type UseQRCodePopoverI18nNS } from './use-i18n';
export declare namespace QRCodePopoverNS {
    type I18n = UseQRCodePopoverI18nNS.I18n;
    interface Props extends Omit<QRCodeNS.Props, 'children'> {
        buttonProps?: ButtonNS.Props;
        popoverProps?: Omit<PopoverNS.Props, 'content' | 'trigger'>;
        actions?: ButtonNS.Props[];
        showDownloadAction?: boolean;
        title?: ReactNode;
        actionButtonsProps?: ButtonNS.Props;
        children?: ButtonNS.Props['children'];
    }
}
export declare const QRCodePopover: React.ForwardRefExoticComponent<QRCodePopoverNS.Props & React.RefAttributes<HTMLButtonElement>>;
