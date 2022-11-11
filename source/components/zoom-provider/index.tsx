import React, { FC, ReactNode, useEffect } from 'react'

export namespace ZoomProviderNS {
  export type Themes =
    | 'dark'
    | 'dark-high-contrast'
    | 'light'
    | 'light-high-contrast'

  export interface Props {
    theme?: Themes
    children?: ReactNode
  }
}

export const ZoomProvider: FC<ZoomProviderNS.Props> = ({
  theme = 'light',
  children,
}) => {
  useEffect(() => {
    document.body?.setAttribute('data-theme', theme)
    localStorage.setItem('zoomrc-theme', theme)
  }, [theme])

  return <>{children}</>
}
