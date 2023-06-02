import React, { type ReactNode } from 'react';
import { type ButtonNS } from '..';
import { type UseStatedIcon } from '../../hooks';
import { type BaseComponent, type CommonVariants } from '../../types';
export declare namespace AlertNS {
    type Identifier = string | number;
    interface HandlerCallbackParams extends Pick<Props, 'identifier'> {
        destroy: () => void;
    }
    interface Props extends Omit<BaseComponent, 'children'>, Omit<UseStatedIcon.Params, 'variant'> {
        identifier: Identifier;
        title?: string;
        description?: string;
        variant?: CommonVariants;
        actions?: ButtonNS.Props[] | ((params: HandlerCallbackParams) => ButtonNS.Props[]);
        closable?: boolean;
        onWillClose?: (identifier: Identifier) => void;
        banner?: boolean;
        children?: ReactNode | ((params: HandlerCallbackParams) => ReactNode);
        disableDocument?: boolean;
        fluidContent?: boolean;
        openByDefault?: boolean;
        loading?: boolean;
    }
}
export declare const Alert: React.ForwardRefExoticComponent<AlertNS.Props & React.RefAttributes<HTMLDivElement>>;
