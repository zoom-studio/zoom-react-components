import { type FC } from 'react';
import { type MenuItemNS } from './menu-item';
export declare namespace ItemsNS {
    interface Props extends Pick<MenuItemNS.Props, 'linkComponent' | 'closeOnItemClick'> {
        items: MenuItemNS.Item[];
        isRTL?: boolean;
        isDarwin: boolean;
    }
}
export declare const Items: FC<ItemsNS.Props>;
