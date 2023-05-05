import React from 'react';
import { BaseComponent } from '../../types';
export declare namespace ContainerNS {
    interface Props extends BaseComponent {
        fluid?: boolean;
    }
}
export declare const Container: React.ForwardRefExoticComponent<ContainerNS.Props & React.RefAttributes<HTMLDivElement>>;
