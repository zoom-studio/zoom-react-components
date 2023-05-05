import React from 'react';
import { BaseComponent } from '../../types';
import { ButtonNS } from '..';
export declare namespace ButtonGroupNS {
    interface Props extends BaseComponent {
        buttonsProps?: ButtonNS.Props;
        buttons: ButtonNS.Props[];
        direction?: 'column' | 'row';
    }
}
export declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupNS.Props & React.RefAttributes<HTMLDivElement>>;
