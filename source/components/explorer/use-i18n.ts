import { useZoomComponent } from '../../hooks'

export namespace UseExplorerI18nNS {
  export interface I18n {
    uploadNewFile?: string
    searchPlaceholder?: string
    allTypes?: string
    previewMessage?: string
    moreThanOneFileSelectedMessage?: string
    fileSize?: string
    createdAt?: string
    updatedAt?: string
  }
}

export const UseExplorerI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
): Required<UseExplorerI18nNS.I18n> => {
  const i18n = globalI18ns?.explorer

  return {
    uploadNewFile: i18n?.uploadNewFile ?? 'Upload new file',
    searchPlaceholder: i18n?.searchPlaceholder ?? 'Search items',
    allTypes: i18n?.allTypes ?? 'All types',
    previewMessage: i18n?.previewMessage ?? 'Select files to read more detail',
    fileSize: i18n?.fileSize ?? 'File size',
    createdAt: i18n?.createdAt ?? 'Created',
    updatedAt: i18n?.updatedAt ?? 'Updated',
    moreThanOneFileSelectedMessage: i18n?.moreThanOneFileSelectedMessage ?? 'Files selected',
  }
}
