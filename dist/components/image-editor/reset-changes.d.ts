import { Dispatch, FC, RefObject, SetStateAction } from 'react';
import { CropperRef } from 'react-advanced-cropper';
import { ZoomLogProviderNS } from '../zoom-log-provider';
import { ImageEditorNS } from '.';
export declare namespace ResetChangesNS {
    interface Props {
        cropperRef: RefObject<CropperRef>;
        sendLog: ZoomLogProviderNS.Log;
        i18n: Required<ImageEditorNS.I18n>;
        setAdjustments: Dispatch<SetStateAction<ImageEditorNS.Adjustments>>;
        confirmBeforeReset: boolean;
        defaultAdjustments: ImageEditorNS.Adjustments;
        disabled: boolean;
    }
}
export declare const ResetChanges: FC<ResetChangesNS.Props>;
