import { type useZoomComponent } from '../../hooks'

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
  componentI18n?: UseExplorerI18nNS.I18n,
): Required<UseExplorerI18nNS.I18n> => {
  const i18n = globalI18ns?.explorer

  return {
    uploadNewFile: componentI18n?.uploadNewFile ?? i18n?.uploadNewFile ?? 'Upload new file',
    searchPlaceholder:
      componentI18n?.searchPlaceholder ?? i18n?.searchPlaceholder ?? 'Search items',
    allTypes: componentI18n?.allTypes ?? i18n?.allTypes ?? 'All types',
    previewMessage:
      componentI18n?.previewMessage ?? i18n?.previewMessage ?? 'Select files to read more detail',
    createdAt: componentI18n?.createdAt ?? i18n?.createdAt ?? 'Created',
    updatedAt: componentI18n?.updatedAt ?? i18n?.updatedAt ?? 'Updated',
    moreThanOneFileSelectedMessage:
      componentI18n?.moreThanOneFileSelectedMessage ??
      i18n?.moreThanOneFileSelectedMessage ??
      'Files selected',
    editImage: componentI18n?.editImage ?? i18n?.editImage ?? 'Edit image',
    delete: componentI18n?.delete ?? i18n?.delete ?? 'Delete',
    rename: componentI18n?.rename ?? i18n?.rename ?? 'Rename',
    download: componentI18n?.download ?? i18n?.download ?? 'Download',
    saveImage: componentI18n?.saveImage ?? i18n?.saveImage ?? 'Save image changes',
    cancelEditingImage:
      componentI18n?.cancelEditingImage ?? i18n?.cancelEditingImage ?? 'Discard changes',
    imageEditorTitle: componentI18n?.imageEditorTitle ?? i18n?.imageEditorTitle ?? 'Edit image',
    cancelDelete: componentI18n?.cancelDelete ?? i18n?.cancelDelete ?? 'Cancel',
    confirmDelete: componentI18n?.confirmDelete ?? i18n?.confirmDelete ?? 'Delete',
    confirmDeleteTitle:
      componentI18n?.confirmDeleteTitle ?? i18n?.confirmDeleteTitle ?? 'Delete file',
    confirmDeleteDescription:
      componentI18n?.confirmDeleteDescription ??
      i18n?.confirmDeleteDescription ??
      'Are you sure to delete this file?',
    renameDialogTitle: componentI18n?.renameDialogTitle ?? i18n?.renameDialogTitle ?? 'Rename file',
    cancelRename: componentI18n?.cancelRename ?? i18n?.cancelRename ?? 'Cancel',
    confirmRename: componentI18n?.confirmRename ?? i18n?.confirmRename ?? 'Save new name',
    renameFileLabel: componentI18n?.renameFileLabel ?? i18n?.renameFileLabel ?? 'File name',
    fileContextMenuDownload:
      componentI18n?.fileContextMenuDownload ??
      i18n?.fileContextMenuDownload ??
      'Download this file',
    fileContextMenuRename:
      componentI18n?.fileContextMenuRename ?? i18n?.fileContextMenuRename ?? 'Rename this file',
    loadingFiles: componentI18n?.loadingFiles ?? i18n?.loadingFiles ?? 'Loading files...',
  }
}
