import { type useZoomComponent } from '../../hooks'

export namespace UseUploaderI18nNS {
  export interface I18n {
    dndTitle?: string
    or?: string
    browseButton?: string
    uploadedFiles?: string
    cancelUploading?: string
    removeFileTitle?: string
    removeFileDescription?: string
    removeFileConfirm?: string
    removeFileDiscard?: string
  }
}

export const useUploaderI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
  componentI18n?: UseUploaderI18nNS.I18n,
): Required<UseUploaderI18nNS.I18n> => {
  const i18n = globalI18ns?.uploader

  return {
    dndTitle: componentI18n?.dndTitle ?? i18n?.dndTitle ?? 'Upload files',
    or: componentI18n?.or ?? i18n?.or ?? 'Or',
    browseButton: componentI18n?.browseButton ?? i18n?.browseButton ?? 'Browse files',
    uploadedFiles: componentI18n?.uploadedFiles ?? i18n?.uploadedFiles ?? 'Uploaded files',
    cancelUploading: componentI18n?.cancelUploading ?? i18n?.cancelUploading ?? 'Cancel uploading',
    removeFileTitle: componentI18n?.removeFileTitle ?? i18n?.removeFileTitle ?? 'Remove file',
    removeFileDescription:
      componentI18n?.removeFileDescription ??
      i18n?.removeFileDescription ??
      'Are you sure to remove this file? It has been uploaded completely!',
    removeFileConfirm: componentI18n?.removeFileConfirm ?? i18n?.removeFileConfirm ?? 'Yes, remove',
    removeFileDiscard: componentI18n?.removeFileDiscard ?? i18n?.removeFileDiscard ?? 'Cancel',
  }
}
