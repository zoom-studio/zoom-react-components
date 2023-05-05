import { useZoomComponent } from '../../hooks';
export declare namespace UseImageEditorI18nNS {
    interface I18n {
        saturation?: string;
        crop?: string;
        brightness?: string;
        contrast?: string;
        hue?: string;
        flipVertically?: string;
        flipHorizontally?: string;
        rotateRight?: string;
        rotateLeft?: string;
        reset?: string;
        resetMessage?: string;
        confirmReset?: string;
        cancelReset?: string;
    }
}
export declare const useImageEditorI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns']) => Required<UseImageEditorI18nNS.I18n>;
