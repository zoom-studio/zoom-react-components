import { type useZoomComponent } from '../../hooks';
export declare namespace UseImageViewerI18nNS {
    interface I18n {
        closeTooltip?: string;
        zoomInTooltip?: string;
        zoomOutTooltip?: string;
        downloadTooltip?: string;
        printTooltip?: string;
        deleteTooltip?: string;
        deletePopConfirmTitle: string;
        deletePopConfirmDescription?: string;
        deletePopConfirmSubmitButton?: string;
        deletePopConfirmCancelButton?: string;
    }
}
export declare const useImageViewerI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'], componentI18n?: UseImageViewerI18nNS.I18n) => Required<UseImageViewerI18nNS.I18n>;
