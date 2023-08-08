import { type useZoomComponent } from '../../hooks';
export declare namespace UseQRCodePopoverI18nNS {
    interface I18n {
        download?: string;
    }
}
export declare const useQRCodePopoverI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'], componentI18n?: UseQRCodePopoverI18nNS.I18n) => Required<UseQRCodePopoverI18nNS.I18n>;
