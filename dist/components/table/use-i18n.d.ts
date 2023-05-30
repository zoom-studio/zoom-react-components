import { type useZoomComponent } from '../../hooks';
export declare namespace UseTableI18nNS {
    interface I18n {
        loadingMoreData?: string;
        endMessage?: string;
        backToTio?: string;
        searchPlaceholder?: string;
        columnsTooltip?: string;
        filterTooltip?: string;
        noData?: string;
    }
}
export declare const useTableI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'], componentI18n?: UseTableI18nNS.I18n) => Required<UseTableI18nNS.I18n>;
