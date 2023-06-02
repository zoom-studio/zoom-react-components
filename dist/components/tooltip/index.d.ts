import React from 'react';
import { type PopoverNS } from '../popover';
export declare namespace TooltipNS {
    interface Props extends Pick<PopoverNS.Props, 'placement' | 'hoverDelay'> {
        title: string;
        children?: PopoverNS.Props['children'];
    }
}
export declare const Tooltip: React.ForwardRefExoticComponent<TooltipNS.Props & React.RefAttributes<HTMLDivElement>>;
