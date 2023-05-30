import React from 'react';
import { type ButtonNS } from '..';
import { type MenuItemNS } from './menu-item';
export declare namespace MenuNS {
    type Item = MenuItemNS.Item;
    interface Props extends Omit<ButtonNS.Props, 'href'>, Pick<MenuItemNS.Props, 'closeOnItemClick'> {
        items: Item[];
        onClose?: () => void;
        onOpen?: () => void;
    }
}
export declare const Menu: React.ForwardRefExoticComponent<MenuNS.Props & React.RefAttributes<HTMLButtonElement>>;
