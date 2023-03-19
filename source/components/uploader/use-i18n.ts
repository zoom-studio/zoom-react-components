import { useZoomComponent } from '../../hooks'

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
): Required<UseUploaderI18nNS.I18n> => {
  const i18n = globalI18ns?.uploader

  return {
    dndTitle: i18n?.dndTitle ?? 'Upload files',
    or: i18n?.or ?? 'Or',
    browseButton: i18n?.browseButton ?? 'Browse files',
    uploadedFiles: i18n?.uploadedFiles ?? 'Uploaded files',
    cancelUploading: i18n?.cancelUploading ?? 'Cancel uploading',
    removeFileTitle: i18n?.removeFileTitle ?? 'Remove file',
    removeFileDescription:
      i18n?.removeFileDescription ??
      'Are you sure to remove this file? It has been uploaded completely!',
    removeFileConfirm: i18n?.removeFileConfirm ?? 'Yes, remove',
    removeFileDiscard: i18n?.removeFileDiscard ?? 'Cancel',
  }
}
