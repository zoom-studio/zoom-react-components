import { type useZoomComponent } from '../../hooks'

export namespace UseChatBubbleI18nNS {
  export interface I18n {
    important?: string
  }
}

export const useChatBubbleI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
  componentI18n?: UseChatBubbleI18nNS.I18n,
): Required<UseChatBubbleI18nNS.I18n> => {
  const i18n = globalI18ns?.chatBubble

  return {
    important: componentI18n?.important ?? i18n?.important ?? 'Important',
  }
}
