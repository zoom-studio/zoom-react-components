import React from 'react';
import { OverlayScrollbarsComponentRef, UseOverlayScrollbarsParams } from 'overlayscrollbars-react';
import { BaseComponent } from '../../types';
export declare namespace ScrollViewNS {
    type ContainerNode = OverlayScrollbarsComponentRef;
    interface Props extends Omit<BaseComponent, 'reference'> {
        onScroll?: (evt: Event) => void;
        autoHide?: boolean;
        maxWidth?: string | number;
        maxHeight: string | number;
        minHeight?: string | number;
        minWidth?: string | number;
        scrollbarSettings?: UseOverlayScrollbarsParams;
    }
}
export declare const ScrollView: React.ForwardRefExoticComponent<ScrollViewNS.Props & React.RefAttributes<ScrollViewNS.ContainerNode>>;
