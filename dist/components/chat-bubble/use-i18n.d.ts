import { type useZoomComponent } from '../../hooks';
export declare namespace UseChatBubbleI18nNS {
    interface I18n {
        important?: string;
    }
}
export declare const useChatBubbleI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'], componentI18n?: UseChatBubbleI18nNS.I18n) => Required<UseChatBubbleI18nNS.I18n>;
