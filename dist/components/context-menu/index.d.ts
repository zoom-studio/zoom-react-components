import React, { type FunctionComponentElement, type ReactNode, type RefObject } from 'react';
import { type MenuNS } from '..';
import { type BaseComponent } from '../../types';
export declare namespace ContextMenuNS {
    type Menu = FunctionComponentElement<MenuNS.Props> | null;
    interface Props extends Omit<BaseComponent, 'reference'> {
        children?: ReactNode;
        items: MenuNS.Item[];
        menuProps?: Omit<MenuNS.Props, 'items'>;
        reference?: RefObject<HTMLDivElement> | ((element: HTMLDivElement | null) => void);
    }
}
export declare const ContextMenu: React.ForwardRefExoticComponent<ContextMenuNS.Props & React.RefAttributes<HTMLDivElement>>;
