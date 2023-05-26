import { useZoomComponent } from '../../hooks'

export namespace UseTourI18nNS {
  export interface I18n {
    nextButton?: string
    backButton?: string
    skipButton?: string
    finishButton?: string
  }
}

export const useTourI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
  componentI18n?: UseTourI18nNS.I18n,
): Required<UseTourI18nNS.I18n> => {
  const i18n = globalI18ns?.tour

  return {
    nextButton: componentI18n?.nextButton ?? i18n?.nextButton ?? 'Next',
    backButton: componentI18n?.backButton ?? i18n?.backButton ?? 'Back',
    skipButton: componentI18n?.skipButton ?? i18n?.skipButton ?? 'Skip',
    finishButton: componentI18n?.finishButton ?? i18n?.finishButton ?? 'Finish',
  }
}
