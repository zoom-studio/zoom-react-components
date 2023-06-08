import { type useZoomComponent } from '../../hooks'

export namespace UseChatInputI18nNS {
  export interface I18n {
    attacheFile?: string
    attacheImage?: string
    attacheVideo?: string
    images?: string
    videos?: string
  }
}

export const useChatInputI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
  componentI18n?: UseChatInputI18nNS.I18n,
): Required<UseChatInputI18nNS.I18n> => {
  const i18n = globalI18ns?.chatInput

  return {
    attacheFile: componentI18n?.attacheFile ?? i18n?.attacheFile ?? 'Attache files',
    attacheImage: componentI18n?.attacheImage ?? i18n?.attacheImage ?? 'Attache images',
    attacheVideo: componentI18n?.attacheVideo ?? i18n?.attacheVideo ?? 'Attache videos',
    images: componentI18n?.images ?? i18n?.images ?? 'Images',
    videos: componentI18n?.videos ?? i18n?.videos ?? 'Videos',
  }
}
