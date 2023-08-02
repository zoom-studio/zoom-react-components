import { type useZoomComponent } from '../../hooks'

export namespace UseQRCodePopoverI18nNS {
  export interface I18n {
    download?: string
  }
}

export const useQRCodePopoverI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
  componentI18n?: UseQRCodePopoverI18nNS.I18n,
): Required<UseQRCodePopoverI18nNS.I18n> => {
  const i18n = globalI18ns?.qrCodePopover

  return {
    download: componentI18n?.download ?? i18n?.download ?? 'Download',
  }
}
