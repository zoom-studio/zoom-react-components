import { type useZoomComponent } from '../../hooks';
export declare namespace UseDatePickerI18nNS {
    interface I18n {
        noEventMessage?: string;
        hour?: string;
        minute?: string;
        second?: string;
    }
}
export declare const useDatePickerI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'], componentI18n?: UseDatePickerI18nNS.I18n) => Required<UseDatePickerI18nNS.I18n>;
