import React, { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { BaseComponent, CommonSize } from '../../types';
import { ButtonNS } from '..';
export declare namespace BottomSheetNS {
    type Action = ButtonNS.Props;
    interface Props extends Omit<BaseComponent, 'children'> {
        children: ReactNode;
        isOpen?: boolean;
        onClose?: () => void;
        size?: CommonSize;
        backdropProps?: HTMLAttributes<HTMLDivElement>;
        closable?: boolean;
        actions?: Action[];
        secondaryActions?: Action[];
        cancelButtonProps?: Action;
        title?: string;
        cancelButton?: string | false;
        onCancelButtonClick?: (evt: MouseEvent<HTMLButtonElement>, defaultOnClick: () => void) => void;
        onWillCancelButtonClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
        closeButtonProps?: Action;
    }
}
export declare const BottomSheet: React.ForwardRefExoticComponent<BottomSheetNS.Props & React.RefAttributes<HTMLDivElement>>;
