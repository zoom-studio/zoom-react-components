import React, { createContext, FC, ReactNode } from 'react'

import { logs } from '../../constants'

export namespace ZoomLogProviderNS {
  export type Error = string | object
  export type Log = (description: logs, error?: Error | undefined) => undefined

  export interface ProviderValue extends Pick<Props, 'globalErrors'> {
    sendLog?: Log
  }

  export interface Props {
    onLog: Log
    children?: ReactNode
    globalErrors?: {
      onCopyFailure?: string
      onCopySuccess?: string
    }
  }
}

const ZoomLogContext = createContext<ZoomLogProviderNS.ProviderValue>({})

export const ZoomLogProvider: FC<ZoomLogProviderNS.Props> = ({ onLog, children, globalErrors }) => {
  return (
    <ZoomLogContext.Provider value={{ sendLog: onLog, globalErrors }}>
      {children}
    </ZoomLogContext.Provider>
  )
}

export { ZoomLogContext as zoomLogContext }
