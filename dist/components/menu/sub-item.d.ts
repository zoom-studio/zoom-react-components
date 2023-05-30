import { type FC, type ReactNode } from 'react';
import { type SubMenuItemProps } from 'react-menu-list';
export declare namespace SubMenuItemNS {
    interface Props extends Omit<SubMenuItemProps, 'menu' | 'children'> {
        title?: string;
        children?: ReactNode;
        isRTL?: boolean;
    }
}
export declare const SubMenuItem: FC<SubMenuItemNS.Props>;
