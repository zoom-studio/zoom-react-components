import React, { MutableRefObject } from 'react';
import { PopoverNS } from '.';
export declare namespace PopoverContentNS {
    interface Props extends Omit<PopoverNS.Props, 'isOpen' | 'onOpenChange' | 'onOpen' | 'onClose'> {
        arrowRef: MutableRefObject<SVGSVGElement | null>;
        toggle: () => void;
        open: () => void;
        close: () => void;
    }
}
export declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentNS.Props & React.RefAttributes<HTMLDivElement>>;
