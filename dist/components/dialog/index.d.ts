import React, { HTMLAttributes, MouseEvent, RefObject } from 'react';
import { ButtonNS } from '..';
import { BaseComponent, CommonSize } from '../../types';
export declare namespace DialogNS {
    type Action = ButtonNS.Props;
    type ButtonProps = ButtonNS.Props;
    interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
    }
    interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    }
    interface BodyProps extends HTMLAttributes<HTMLDivElement> {
    }
    interface FooterProps extends HTMLAttributes<HTMLDivElement> {
    }
    interface Props extends BaseComponent {
        isOpen?: boolean;
        onClose?: () => void;
        closable?: boolean;
        backdropProps?: BackdropProps;
        actions?: Action[];
        size?: CommonSize;
        secondaryActions?: Action[];
        title?: string;
        cancelButton?: string | false;
        cancelButtonProps?: ButtonProps;
        onCancelButtonClick?: (evt: MouseEvent<HTMLButtonElement>, defaultOnClick: () => void) => void;
        onWillCancelButtonClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
        fullScreen?: boolean;
        fullScreenButtonProps?: ButtonProps;
        withFullscreenButton?: boolean;
        closeButtonProps?: ButtonProps;
        headerProps?: HeaderProps;
        bodyProps?: BodyProps;
        footerProps?: FooterProps;
        backdropRef?: RefObject<HTMLDivElement>;
        renderHeader?: boolean;
    }
}
export declare const Dialog: React.ForwardRefExoticComponent<DialogNS.Props & React.RefAttributes<HTMLDivElement>>;
