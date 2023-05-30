import React from 'react';
import { type ImageNS } from '..';
import { type BaseComponent, type CommonSize } from '../../types';
export declare namespace AvatarNS {
    interface Props extends BaseComponent {
        avatars: string[];
        size?: CommonSize;
        withImageViewer?: boolean;
        imageProps?: Omit<ImageNS.Props, 'src'>;
    }
}
export declare const Avatar: React.ForwardRefExoticComponent<AvatarNS.Props & React.RefAttributes<HTMLDivElement>>;
