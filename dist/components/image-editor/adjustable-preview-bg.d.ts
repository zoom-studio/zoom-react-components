import { FC } from 'react';
import { CropperImage, CropperState, CropperTransitions, Size } from 'react-advanced-cropper';
export declare namespace AdjustablePreviewBackgroundNS {
    interface DesiredCropperRef {
        getState: () => CropperState;
        getTransitions: () => CropperTransitions;
        getImage: () => CropperImage;
    }
    interface Props {
        className?: string;
        cropper: DesiredCropperRef;
        crossOrigin?: 'anonymous' | 'use-credentials';
        brightness?: number;
        saturation?: number;
        hue?: number;
        contrast?: number;
        size?: Size | null;
    }
}
export declare const AdjustablePreviewBackground: FC<AdjustablePreviewBackgroundNS.Props>;
