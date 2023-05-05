import React, { MouseEvent, TouchEvent } from 'react';
import { BaseComponent } from '../../types';
export declare namespace LongTapNS {
    interface Props extends BaseComponent {
        timeout?: number;
        callback?: (evt: MouseDownEvent) => void;
    }
    type MouseDownEvent = MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>;
}
export declare const LongTap: React.ForwardRefExoticComponent<LongTapNS.Props & React.RefAttributes<HTMLDivElement>>;
