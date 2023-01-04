import React, {
  FC,
  ReactNode,
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { CustomLinkNS } from '../custom-link'

export namespace ZoomProviderNS {
  export const Themes = ['dark', 'dark-high-contrast', 'light', 'light-high-contrast'] as const
  export type Themes = typeof Themes[number]

  export const Digits = ['farsi', 'latin'] as const
  export type Digits = typeof Digits[number]

  export interface ProviderValue {
    theme?: Themes
    digits?: Digits
    isDarwin?: boolean
    setIsDarwin?: Dispatch<SetStateAction<boolean>>
    linkComponent?: CustomLinkNS.Props['userLink']
    isRTL?: boolean
  }

  export interface Props extends Omit<ProviderValue, 'setIsDarwin'> {
    children?: ReactNode
  }
}

const ZoomContext = createContext<ZoomProviderNS.ProviderValue>({})

export const ZoomProvider: FC<ZoomProviderNS.Props> = props => {
  const { digits = 'farsi', theme = 'dark' } = props
  const [isDarwin, setIsDarwin] = useState(!!props.isDarwin)

  useEffect(() => {
    document.body?.setAttribute('data-theme', theme)
    localStorage.setItem('zoomrc-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body?.setAttribute('data-digits', digits)
    localStorage.setItem('zoomrc-digits', digits)
  }, [digits])

  useEffect(() => {
    setIsDarwin(!!props.isDarwin)
  }, [props.isDarwin])

  return (
    <ZoomContext.Provider value={{ ...props, isDarwin, setIsDarwin }}>
      {props.children}
    </ZoomContext.Provider>
  )
}

export { ZoomContext as zoomContext }
