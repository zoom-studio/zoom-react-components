import { useTranslation } from 'react-i18next'

import { FATranslations } from '../../i18n/locales'

export const useI18n = (storyScope: keyof typeof FATranslations) => {
  const { t: translate } = useTranslation()
  const t = (path: string) => translate(storyScope + '.' + path)
  return { t }
}
