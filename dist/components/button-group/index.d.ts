import React from 'react';
import { type BaseComponent } from '../../types';
import { type ButtonNS } from '..';
export declare namespace ButtonGroupNS {
    interface Props extends BaseComponent {
        buttonsProps?: ButtonNS.Props;
        buttons: ButtonNS.Props[];
        direction?: 'column' | 'row';
    }
}
export declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupNS.Props & React.RefAttributes<HTMLDivElement>>;
