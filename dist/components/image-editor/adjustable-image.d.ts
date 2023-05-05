import React, { CSSProperties } from 'react';
export declare namespace AdjustableImageNS {
    interface Props {
        src?: string;
        className?: string;
        crossOrigin?: 'anonymous' | 'use-credentials';
        brightness?: number;
        saturation?: number;
        hue?: number;
        contrast?: number;
        style?: CSSProperties;
    }
}
export declare const AdjustableImage: React.ForwardRefExoticComponent<AdjustableImageNS.Props & React.RefAttributes<HTMLCanvasElement>>;
