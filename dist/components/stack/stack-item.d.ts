import React from 'react';
import { type BaseComponent } from '../../types';
import { type StackNS } from '.';
export declare namespace StackItemNS {
    interface Props extends BaseComponent {
        align?: StackNS.Aligns;
        justify?: StackNS.Justifies;
        flex?: string | number;
        grow?: string | number;
        shrink?: number;
        basis?: string;
        inline?: boolean;
    }
}
export declare const StackItem: React.ForwardRefExoticComponent<StackItemNS.Props & React.RefAttributes<HTMLDivElement>>;
