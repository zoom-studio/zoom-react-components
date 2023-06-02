import React from 'react';
import { type AdjustablePreviewBackgroundNS } from './adjustable-preview-bg';
export declare namespace AdjustableCropperBackgroundNS {
    interface Props {
        className?: string;
        cropper: AdjustablePreviewBackgroundNS.DesiredCropperRef;
        crossOrigin?: 'anonymous' | 'use-credentials';
        brightness?: number;
        saturation?: number;
        hue?: number;
        contrast?: number;
    }
}
export declare const AdjustableCropperBackground: React.ForwardRefExoticComponent<AdjustableCropperBackgroundNS.Props & React.RefAttributes<HTMLCanvasElement>>;
