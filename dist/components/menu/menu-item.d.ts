import { type FC, type MouseEvent } from 'react';
import { type CustomLinkNS } from '../custom-link';
export declare namespace MenuItemNS {
    interface Item {
        title?: string;
        className?: string;
        onClick?: (evt: MouseEvent<HTMLSpanElement>) => void;
        link?: string;
        isActive?: boolean;
        children?: Props[];
        isSeparator?: boolean;
        isDisabled?: boolean;
        accelerator?: {
            ctrlOrCmd?: boolean;
            otherKeys: string[];
        };
    }
    interface Props extends Item {
        linkComponent?: CustomLinkNS.Props['userLink'];
        isRTL?: boolean;
        closeOnItemClick?: boolean;
    }
    interface InnerProps {
        isDarwin: boolean;
    }
}
export declare const MenuItem: FC<MenuItemNS.Props & MenuItemNS.InnerProps>;
