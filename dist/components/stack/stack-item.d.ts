import React from 'react';
import { BaseComponent } from '../../types';
import { StackNS } from '.';
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
