import { FC, RefObject } from 'react';
import { CropperRef } from 'react-advanced-cropper';
import { UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { IconNS, ImageEditorNS, ZoomLogProviderNS } from '..';
export declare namespace EditorActionsNS {
    interface Action {
        icon: IconNS.Names;
        mode: ImageEditorNS.EditorMode | ImageEditorNS.Flip | ImageEditorNS.Rotate;
    }
    interface Props extends Pick<ImageEditorNS.Props, 'defaultFlips' | 'defaultRotation'> {
        i18n: Required<ImageEditorNS.I18n>;
        mode: UseObjectedStateNS.ReturnType<ImageEditorNS.EditorMode>;
        cropperRef: RefObject<CropperRef>;
        sendLog: ZoomLogProviderNS.Log;
        disabled: boolean;
        loading: boolean;
    }
}
export declare const EditorActions: FC<EditorActionsNS.Props>;
