import React, { FC, ReactNode, useEffect } from 'react'

export namespace ZoomProviderNS {
  export const Themes = ['dark', 'dark-high-contrast', 'light', 'light-high-contrast'] as const
  export type Themes = typeof Themes[number]

  export const Digits = ['farsi', 'latin'] as const
  export type Digits = typeof Digits[number]

  export interface Props {
    theme?: Themes
    digits?: Digits
    children?: ReactNode
  }
}

export const ZoomProvider: FC<ZoomProviderNS.Props> = ({
  theme = 'light',
  digits = 'farsi',
  children,
}) => {
  useEffect(() => {
    document.body?.setAttribute('data-theme', theme)
    localStorage.setItem('zoomrc-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body?.setAttribute('data-digits', digits)
    localStorage.setItem('zoomrc-digits', digits)
  }, [digits])

  return <>{children}</>
}
