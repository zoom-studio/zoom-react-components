import React, { createContext, FC, ReactNode } from 'react'

import { logs } from '../../constants'

import {
  ImageViewerNS,
  EmojiPickerNS,
  TourNS,
  RichTextEditorNS,
  ImageEditorNS,
  ExplorerNS,
  UploaderNS,
  TableNS,
} from '..'

export namespace ZoomGlobalConfigProviderNS {
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
      richTextEditor?: RichTextEditorNS.I18n
      imageEditor?: ImageEditorNS.I18n
      explorer?: ExplorerNS.I18n
      uploader?: UploaderNS.I18n
      table?: TableNS.I18n
    }
  }
}

const ZoomGlobalConfigContext = createContext<ZoomGlobalConfigProviderNS.ProviderValue>({})

export const ZoomGlobalConfigProvider: FC<ZoomGlobalConfigProviderNS.Props> = ({
  onLog,
  children,
  globalErrors,
  globalI18ns,
}) => {
  return (
    <ZoomGlobalConfigContext.Provider value={{ sendLog: onLog, globalErrors, globalI18ns }}>
      {children}
    </ZoomGlobalConfigContext.Provider>
  )
}

export { ZoomGlobalConfigContext as zoomGlobalConfigContext }
