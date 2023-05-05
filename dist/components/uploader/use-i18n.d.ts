import { useZoomComponent } from '../../hooks';
export declare namespace UseUploaderI18nNS {
    interface I18n {
        dndTitle?: string;
        or?: string;
        browseButton?: string;
        uploadedFiles?: string;
        cancelUploading?: string;
        removeFileTitle?: string;
        removeFileDescription?: string;
        removeFileConfirm?: string;
        removeFileDiscard?: string;
    }
}
export declare const useUploaderI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns']) => Required<UseUploaderI18nNS.I18n>;
