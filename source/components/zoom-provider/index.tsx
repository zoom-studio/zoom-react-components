import React, {
  type FC,
  type ReactNode,
  useEffect,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

import { Message } from '../message'
import { AlertProvider } from '../alert/provider'

import { type CustomLinkNS } from '../custom-link'
import { type CommonSize } from '../../types'
import { ConditionalWrapper } from '../conditional-wrapper'

export namespace ZoomProviderNS {
  export const Themes = ['dark', 'dark-high-contrast', 'light', 'light-high-contrast'] as const
  export type Themes = (typeof Themes)[number]

  export const Digits = ['farsi', 'latin'] as const
  export type Digits = (typeof Digits)[number]

  export interface ProviderValue {
    theme?: Themes
    digits?: Digits
    isDarwin?: boolean
    setIsDarwin?: Dispatch<SetStateAction<boolean>>
    linkComponent?: CustomLinkNS.Props['userLink']
    isRTL?: boolean
    defaultComponentsSize?: CommonSize
  }

  export interface Props extends Omit<ProviderValue, 'setIsDarwin'> {
    children?: ReactNode
    withMessage?: boolean
    withAlert?: boolean
  }
}

const ZoomContext = createContext<ZoomProviderNS.ProviderValue>({})

export const ZoomProvider: FC<ZoomProviderNS.Props> = props => {
  const { digits = 'farsi', theme = 'dark', defaultComponentsSize = 'normal' } = props
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
    <ZoomContext.Provider value={{ ...props, isDarwin, setIsDarwin, defaultComponentsSize }}>
      <ConditionalWrapper
        condition={props.withAlert}
        trueWrapper={children => <AlertProvider>{children}</AlertProvider>}
        falseWrapper={children => <>{children}</>}
      >
        {props.withMessage && <Message />}
        {props.children}
      </ConditionalWrapper>
    </ZoomContext.Provider>
  )
}

export { ZoomContext as zoomContext }
