import { useZoomComponent } from '../../hooks'

export namespace UseExplorerI18nNS {
  export interface I18n {
    uploadNewFile?: string
    searchPlaceholder?: string
    allTypes?: string
    previewMessage?: string
    moreThanOneFileSelectedMessage?: string
    createdAt?: string
    updatedAt?: string
    editImage?: string
    delete?: string
    rename?: string
    download?: string
    saveImage?: string
    cancelEditingImage?: string
    imageEditorTitle?: string
    cancelDelete?: string
    confirmDelete?: string
    confirmDeleteTitle?: string
    confirmDeleteDescription?: string
    renameDialogTitle?: string
    cancelRename?: string
    confirmRename?: string
    renameFileLabel?: string
    fileContextMenuDownload?: string
    fileContextMenuRename?: string
    loadingFiles?: string
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
    createdAt: i18n?.createdAt ?? 'Created',
    updatedAt: i18n?.updatedAt ?? 'Updated',
    moreThanOneFileSelectedMessage: i18n?.moreThanOneFileSelectedMessage ?? 'Files selected',
    editImage: i18n?.editImage ?? 'Edit image',
    delete: i18n?.delete ?? 'Delete',
    rename: i18n?.rename ?? 'Rename',
    download: i18n?.download ?? 'Download',
    saveImage: i18n?.saveImage ?? 'Save image changes',
    cancelEditingImage: i18n?.cancelEditingImage ?? 'Discard changes',
    imageEditorTitle: i18n?.imageEditorTitle ?? 'Edit image',
    cancelDelete: i18n?.cancelDelete ?? 'Cancel',
    confirmDelete: i18n?.confirmDelete ?? 'Delete',
    confirmDeleteTitle: i18n?.confirmDeleteTitle ?? 'Delete file',
    confirmDeleteDescription: i18n?.confirmDeleteDescription ?? 'Are you sure to delete this file?',
    renameDialogTitle: i18n?.renameDialogTitle ?? 'Rename file',
    cancelRename: i18n?.cancelRename ?? 'Cancel',
    confirmRename: i18n?.confirmRename ?? 'Save new name',
    renameFileLabel: i18n?.renameFileLabel ?? 'File name',
    fileContextMenuDownload: i18n?.fileContextMenuDownload ?? 'Download this file',
    fileContextMenuRename: i18n?.fileContextMenuRename ?? 'Rename this file',
    loadingFiles: i18n?.loadingFiles ?? 'Loading files...',
  }
}
