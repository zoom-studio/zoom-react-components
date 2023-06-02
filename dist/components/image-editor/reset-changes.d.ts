import { type Dispatch, type FC, type RefObject, type SetStateAction } from 'react';
import { type CropperRef } from 'react-advanced-cropper';
import { type ZoomGlobalConfigProviderNS } from '../zoom-global-config-provider';
import { type ImageEditorNS } from '.';
export declare namespace ResetChangesNS {
    interface Props {
        cropperRef: RefObject<CropperRef>;
        sendLog: ZoomGlobalConfigProviderNS.Log;
        i18n: Required<ImageEditorNS.I18n>;
        setAdjustments: Dispatch<SetStateAction<ImageEditorNS.Adjustments>>;
        confirmBeforeReset: boolean;
        defaultAdjustments: ImageEditorNS.Adjustments;
        disabled: boolean;
    }
}
export declare const ResetChanges: FC<ResetChangesNS.Props>;
