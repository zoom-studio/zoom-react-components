import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { ENTranslations, FATranslations } from './locales'

export namespace I18nNS {
  export interface Language {
    narrow: string
    name: string
  }

  export const LANGUAGES: Language[] = [
    { narrow: 'fa', name: 'Persian' },
    { narrow: 'en', name: 'English' },
  ]
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'fa',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fa: {
        translation: FATranslations,
      },
      en: {
        translation: ENTranslations,
      },
    },
  })

export default i18n
