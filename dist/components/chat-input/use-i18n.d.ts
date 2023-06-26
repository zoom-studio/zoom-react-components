import { type useZoomComponent } from '../../hooks';
export declare namespace UseChatInputI18nNS {
    interface I18n {
        attacheFile?: string;
        attacheImage?: string;
        attacheVideo?: string;
        images?: string;
        videos?: string;
    }
}
export declare const useChatInputI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'], componentI18n?: UseChatInputI18nNS.I18n) => Required<UseChatInputI18nNS.I18n>;
