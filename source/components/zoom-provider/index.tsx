import React, { FC, ReactNode, useEffect } from 'react'

export namespace ZoomProviderNS {
  export type Themes =
    | 'dark'
    | 'dark-high-contrast'
    | 'light'
    | 'light-high-contrast'

  export interface Props {
    defaultTheme?: Themes
    children?: ReactNode
  }
}

export const ZoomProvider: FC<ZoomProviderNS.Props> = ({
  defaultTheme = 'light',
  children,
}) => {
  useEffect(() => {
    document.body?.setAttribute('data-theme', defaultTheme)
  }, [])

  return <>{children}</>
}
