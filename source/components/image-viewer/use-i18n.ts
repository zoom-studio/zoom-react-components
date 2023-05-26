import { useZoomComponent } from '../../hooks'

export namespace UseImageViewerI18nNS {
  export interface I18n {
    closeTooltip?: string
    zoomInTooltip?: string
    zoomOutTooltip?: string
    downloadTooltip?: string
    printTooltip?: string
    deleteTooltip?: string
    deletePopConfirmTitle: string
    deletePopConfirmDescription?: string
    deletePopConfirmSubmitButton?: string
    deletePopConfirmCancelButton?: string
  }
}

export const useImageViewerI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
  componentI18n?: UseImageViewerI18nNS.I18n,
): Required<UseImageViewerI18nNS.I18n> => {
  const i18n = globalI18ns?.imageViewer

  return {
    zoomInTooltip: componentI18n?.zoomInTooltip ?? i18n?.zoomInTooltip ?? 'Zoom in',
    closeTooltip: componentI18n?.closeTooltip ?? i18n?.closeTooltip ?? 'Close',
    printTooltip: componentI18n?.printTooltip ?? i18n?.printTooltip ?? 'Print image',
    deleteTooltip: componentI18n?.deleteTooltip ?? i18n?.deleteTooltip ?? 'Delete image',
    downloadTooltip: componentI18n?.downloadTooltip ?? i18n?.downloadTooltip ?? 'Download image',
    zoomOutTooltip: componentI18n?.zoomOutTooltip ?? i18n?.zoomOutTooltip ?? 'Zoom out',
    deletePopConfirmTitle:
      componentI18n?.deletePopConfirmTitle ?? i18n?.deletePopConfirmTitle ?? 'Delete image',
    deletePopConfirmCancelButton:
      componentI18n?.deletePopConfirmCancelButton ??
      i18n?.deletePopConfirmCancelButton ??
      'Discard',
    deletePopConfirmSubmitButton:
      componentI18n?.deletePopConfirmSubmitButton ??
      i18n?.deletePopConfirmSubmitButton ??
      'Yes, delete',
    deletePopConfirmDescription:
      componentI18n?.deletePopConfirmDescription ??
      i18n?.deletePopConfirmDescription ??
      'Are you sure to delete this image?',
  }
}
