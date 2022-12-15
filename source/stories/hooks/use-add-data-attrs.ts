import { useEffect } from 'react'

import { addThemeToBody } from '../utils'

export const useAddDataAttrs = (layout: 'ltr' | 'rtl' = 'rtl') => {
  const isRTL = layout === 'rtl'

  useEffect(() => {
    const htmlElement = document.querySelector('html')

    if (htmlElement) {
      htmlElement.setAttribute('dir', layout)
      htmlElement.setAttribute('data-digits', isRTL ? 'farsi' : 'latin')
    }
    addThemeToBody()
  }, [])
}
