import { type useZoomComponent } from '../../hooks';
export declare namespace UseTourI18nNS {
    interface I18n {
        nextButton?: string;
        backButton?: string;
        skipButton?: string;
        finishButton?: string;
    }
}
export declare const useTourI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'], componentI18n?: UseTourI18nNS.I18n) => Required<UseTourI18nNS.I18n>;
