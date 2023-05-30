import { type FC } from 'react';
import { type IconNS, type PopoverNS } from '..';
export declare namespace EditorActionNS {
    interface Popover extends Pick<PopoverNS.Props, 'className' | 'onClose' | 'disabled' | 'content' | 'isOpen' | 'onOpenChange' | 'width' | 'placement'> {
    }
    interface Props {
        onClick?: () => void;
        icon?: IconNS.Names;
        text?: string;
        title: string;
        isActive?: boolean;
        disabled?: boolean;
        popover?: Popover;
    }
}
export declare const EditorAction: FC<EditorActionNS.Props>;
