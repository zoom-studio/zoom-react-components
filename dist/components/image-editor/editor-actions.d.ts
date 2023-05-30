import { type FC, type RefObject } from 'react';
import { type CropperRef } from 'react-advanced-cropper';
import { type UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { type IconNS, type ImageEditorNS, type ZoomGlobalConfigProviderNS } from '..';
export declare namespace EditorActionsNS {
    interface Action {
        icon: IconNS.Names;
        mode: ImageEditorNS.EditorMode | ImageEditorNS.Flip | ImageEditorNS.Rotate;
    }
    interface Props extends Pick<ImageEditorNS.Props, 'defaultFlips' | 'defaultRotation'> {
        i18n: Required<ImageEditorNS.I18n>;
        mode: UseObjectedStateNS.ReturnType<ImageEditorNS.EditorMode>;
        cropperRef: RefObject<CropperRef>;
        sendLog: ZoomGlobalConfigProviderNS.Log;
        disabled: boolean;
        loading: boolean;
    }
}
export declare const EditorActions: FC<EditorActionsNS.Props>;
