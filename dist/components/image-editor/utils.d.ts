import { type RawAspectRatio } from 'react-advanced-cropper';
import { type ImageEditorNS } from '.';
export declare const getHandlers: (isOnCropMode: boolean, aspectRatio?: RawAspectRatio) => ImageEditorNS.Handlers;
export declare const requireDefaultAdjustments: (defaultAdjustments: Partial<ImageEditorNS.Adjustments>) => ImageEditorNS.Adjustments;
