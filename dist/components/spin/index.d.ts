import React from 'react';
import { TypographyNS } from '..';
import { BaseComponent, CommonSize } from '../../types';
import { Color } from '../../types/color';
export declare namespace SpinNS {
    interface Props extends BaseComponent<HTMLSpanElement> {
        size?: CommonSize;
        speed?: string;
        tip?: string;
        tipProps?: TypographyNS.TextNS.Props;
        color?: Color;
    }
}
export declare const Spin: React.ForwardRefExoticComponent<SpinNS.Props & React.RefAttributes<HTMLSpanElement>>;
