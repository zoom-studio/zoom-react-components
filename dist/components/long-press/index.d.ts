import React from 'react';
import { BaseComponent } from '../../types';
export declare namespace LongPressNS {
    interface Props extends BaseComponent {
        interval?: number;
        callback?: () => void;
        disabled?: boolean;
    }
}
export declare const LongPress: React.ForwardRefExoticComponent<LongPressNS.Props & React.RefAttributes<HTMLDivElement>>;
