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
  componentI18n?: UseTableI18nNS.I18n,
): Required<UseTableI18nNS.I18n> => {
  const i18n = globalI18ns?.table

  return {
    loadingMoreData:
      componentI18n?.loadingMoreData ?? i18n?.loadingMoreData ?? 'Loading more data...',
    endMessage: componentI18n?.endMessage ?? i18n?.endMessage ?? 'End of the list.',
    backToTio: componentI18n?.backToTio ?? i18n?.backToTio ?? 'Back to the top',
    searchPlaceholder:
      componentI18n?.searchPlaceholder ?? i18n?.searchPlaceholder ?? 'Search records...',
    columnsTooltip: componentI18n?.columnsTooltip ?? i18n?.columnsTooltip ?? 'Columns visibility',
    filterTooltip: componentI18n?.filterTooltip ?? i18n?.filterTooltip ?? 'Filter records',
    noData: componentI18n?.noData ?? i18n?.noData ?? 'No records',
  }
}
