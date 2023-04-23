import { useZoomComponent } from '../../hooks'

export namespace UseTableI18nNS {
  export interface I18n {
    loadingMoreData?: string
    endMessage?: string
    backToTio?: string
    searchPlaceholder?: string
    columnsTooltip?: string
    filterTooltip?: string
    noData?: string
  }
}

export const useTableI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
): Required<UseTableI18nNS.I18n> => {
  const i18n = globalI18ns?.table

  return {
    loadingMoreData: i18n?.loadingMoreData ?? 'Loading more data...',
    endMessage: i18n?.endMessage ?? 'End of the list.',
    backToTio: i18n?.backToTio ?? 'Back to the top',
    searchPlaceholder: i18n?.searchPlaceholder ?? 'Search records...',
    columnsTooltip: i18n?.columnsTooltip ?? 'Columns visibility',
    filterTooltip: i18n?.filterTooltip ?? 'Filter records',
    noData: i18n?.noData ?? 'No records',
  }
}
