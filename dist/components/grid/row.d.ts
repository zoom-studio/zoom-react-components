import React from 'react';
import { BaseComponent } from '../../types';
export declare namespace RowNS {
    interface Props extends BaseComponent {
        fixWidth?: boolean;
    }
}
export declare const Row: React.ForwardRefExoticComponent<RowNS.Props & React.RefAttributes<HTMLDivElement>>;
