import { type RefObject, useEffect } from 'react'

import { isRTLLanguage } from '@zoom-studio/zoom-js-ts-utils'

import { useZoomContext } from './use-zoom-context'

export const useInputDirectionHandler = (
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
  onSendLog: VoidFunction,
  isEnabled?: boolean,
) => {
  const { isRTL } = useZoomContext()
  const RTLLanguage = 'rtl-language'
  const LTRLanguage = 'ltr-language'

  const handleDirection = (value?: string) => {
    const { current: input } = inputRef
    if (!isEnabled || !input) {
      if (!input) {
        onSendLog()
      }
      return null
    }

    if (!value) {
      if (isRTL) {
        input.classList.add(RTLLanguage)
        input.classList.remove(LTRLanguage)
      } else {
        input.classList.add(LTRLanguage)
        input.classList.remove(RTLLanguage)
      }
      return null
    }

    if (isRTLLanguage(value)) {
      input.classList.add(RTLLanguage)
      input.classList.remove(LTRLanguage)
    } else {
      input.classList.remove(RTLLanguage)
      input.classList.add(LTRLanguage)
    }
  }

  useEffect(() => {
    handleDirection()
  }, [isRTL])

  return handleDirection
}
