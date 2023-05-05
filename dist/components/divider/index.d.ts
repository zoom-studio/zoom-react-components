import React from 'react';
import { TypographyNS } from '..';
import { BaseComponent } from '../../types';
export declare namespace DividerNS {
    interface Props extends BaseComponent {
        vertical?: boolean;
        dashed?: boolean;
        truncate?: boolean;
        childrenPlacement?: 'start' | 'center' | 'end';
        titleProps?: TypographyNS.TitleNS.Props;
        selectableTitle?: boolean;
        verticalHeight?: number | string;
    }
}
export declare const Divider: React.ForwardRefExoticComponent<DividerNS.Props & React.RefAttributes<HTMLDivElement>>;
