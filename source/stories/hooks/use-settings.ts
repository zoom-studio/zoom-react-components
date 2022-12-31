import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ZoomProviderNS } from '../../components'

export const useSettings = () => {
  const { i18n } = useTranslation()
  const [theme, setTheme] = useState<ZoomProviderNS.Themes>('dark')
  const [digits, setDigits] = useState<ZoomProviderNS.Digits>('latin')
  const language = i18n.language
  const isRTL = i18n.dir(language) === 'rtl'

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTheme(<ZoomProviderNS.Themes>document.body.getAttribute('data-theme'))
      setDigits(<ZoomProviderNS.Digits>document.body.getAttribute('data-digits'))
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return { theme, digits, language, isRTL }
}
