import { useRef } from 'react'

import { debounce, DebounceSettings } from 'lodash'

export namespace UseDebounceNS {
  export type Callback<T> = (value: T) => void

  export interface Options extends DebounceSettings {
    delay?: number
  }
}

export const useDebounce = <T>(
  callback: UseDebounceNS.Callback<T>,
  options?: UseDebounceNS.Options,
) => {
  const debouncedRef = useRef(
    debounce((value: T) => callback(value), options?.delay || 700, {
      ...options,
      maxWait: options?.maxWait || 1400,
    }),
  )

  return (value: T) => debouncedRef.current(value)
}
