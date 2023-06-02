import React from 'react';
import { type TypographyNS } from '..';
import { type BaseComponent, type CommonSize } from '../../types';
import { type Color } from '../../types/color';
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
