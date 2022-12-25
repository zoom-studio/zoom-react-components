import { useEffect, useState } from 'react'

import { addThemeToBody } from '../utils'

export namespace UseAddDataAttrsNS {
  export type Layout = 'ltr' | 'rtl'
}

export const useAddDataAttrs = (layout: UseAddDataAttrsNS.Layout = 'rtl') => {
  const [currentLayout, setCurrentLayout] =
    useState<UseAddDataAttrsNS.Layout>(layout)

  const nextLayout = currentLayout === 'ltr' ? 'RTL' : 'LTR'

  const toggleLayout = () => {
    setCurrentLayout(layout => (layout === 'ltr' ? 'rtl' : 'ltr'))
  }

  useEffect(() => {
    const htmlElement = document.querySelector('html')

    if (htmlElement) {
      htmlElement.setAttribute('dir', currentLayout)
      htmlElement.setAttribute(
        'data-digits',
        currentLayout === 'rtl' ? 'farsi' : 'latin',
      )
    }
    addThemeToBody()
  }, [currentLayout])

  return {
    layout: currentLayout,
    setLayout: setCurrentLayout,
    toggleLayout,
    nextLayout,
  }
}
