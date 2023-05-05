import React, { SVGAttributes } from 'react';
import { BaseCustomComponent } from '../../types';
import { Color } from '../../types/color';
export declare namespace SVGIconNS {
    const SVGIconNames: readonly ["empty-box", "image", "file", "sort-descending", "sort-ascending", "not-sorted"];
    type SVGIconNames = typeof SVGIconNames[number];
    interface Props extends BaseCustomComponent<Omit<SVGAttributes<SVGSVGElement>, 'color' | 'size' | 'name'>> {
        name: SVGIconNames;
        size?: number | string;
        color?: Color;
    }
}
export declare const SVGIcon: React.ForwardRefExoticComponent<SVGIconNS.Props & React.RefAttributes<SVGSVGElement>>;
