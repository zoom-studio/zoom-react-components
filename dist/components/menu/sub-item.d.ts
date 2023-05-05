import { FC, ReactNode } from 'react';
import { SubMenuItemProps } from 'react-menu-list';
export declare namespace SubMenuItemNS {
    interface Props extends Omit<SubMenuItemProps, 'menu' | 'children'> {
        title?: string;
        children?: ReactNode;
        isRTL?: boolean;
    }
}
export declare const SubMenuItem: FC<SubMenuItemNS.Props>;
