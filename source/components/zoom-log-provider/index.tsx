import React, { createContext, FC, ReactNode } from 'react'

import { logs } from '../../constants'

import { ImageViewerNS, EmojiPickerNS, TourNS } from '..'

export namespace ZoomLogProviderNS {
  export type Error = string | object
  export type Log = (description: logs, error?: Error | undefined) => undefined

  export interface ProviderValue extends Pick<Props, 'globalErrors' | 'globalI18ns'> {
    sendLog?: Log
  }

  export interface Props {
    onLog: Log
    children?: ReactNode
    globalErrors?: {
      onCopyFailure?: string
      onCopySuccess?: string
    }
    globalI18ns?: {
      imageViewer?: ImageViewerNS.I18n
      emojiPicker?: EmojiPickerNS.I18n
      tour?: TourNS.I18n
    }
  }
}

const ZoomLogContext = createContext<ZoomLogProviderNS.ProviderValue>({})

export const ZoomLogProvider: FC<ZoomLogProviderNS.Props> = ({
  onLog,
  children,
  globalErrors,
  globalI18ns,
}) => {
  return (
    <ZoomLogContext.Provider value={{ sendLog: onLog, globalErrors, globalI18ns }}>
      {children}
    </ZoomLogContext.Provider>
  )
}

export { ZoomLogContext as zoomLogContext }
