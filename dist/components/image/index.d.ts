import React, { type HTMLAttributes, type MouseEvent } from 'react';
import { type ImageViewerNS } from '..';
import { type BaseComponent } from '../../types';
export declare namespace ImageNS {
    const Shapes: readonly ["default", "sharp", "sharp-square", "square", "semi-circle", "circle"];
    type Shapes = (typeof Shapes)[number];
    interface Props extends BaseComponent<HTMLImageElement> {
        src: string;
        name?: string;
        lazy?: boolean;
        alt?: string;
        width?: string | number;
        height?: string | number;
        withImageViewer?: boolean;
        imageViewerOpenerIconSize?: string | number;
        imageViewerCustomImages?: ImageViewerNS.Image[];
        shape?: Shapes;
        imageViewerProps?: Omit<ImageViewerNS.Props, 'images' | 'children'>;
        erroredStateIconFontSize?: string;
        onOpenImageViewerClick?: (evt: MouseEvent<HTMLPictureElement>) => void;
        imageProps?: HTMLAttributes<HTMLImageElement>;
    }
}
export declare const Image: React.ForwardRefExoticComponent<ImageNS.Props & React.RefAttributes<HTMLImageElement>>;
