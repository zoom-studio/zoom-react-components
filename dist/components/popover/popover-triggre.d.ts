import { type FC } from 'react';
import { type PopoverNS } from '.';
export declare namespace PopoverTriggerNS {
    interface Props extends PopoverNS.Props {
        toggle: () => void;
        open: () => void;
        close: () => void;
    }
}
export declare const PopoverTrigger: FC<PopoverTriggerNS.Props>;
