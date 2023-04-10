import { useZoomComponent } from '../../hooks'

export namespace UseTableI18nNS {
  export interface I18n {
    selectAll?: string
    selectCurrentPage?: string
  }
}

export const useTableI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
): Required<UseTableI18nNS.I18n> => {
  const i18n = globalI18ns?.table

  return {
    selectAll: i18n?.selectAll ?? 'Select all',
    selectCurrentPage: i18n?.selectCurrentPage ?? 'Select current page',
  }
}
