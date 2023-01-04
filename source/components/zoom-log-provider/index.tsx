import React, { createContext, FC, ReactNode } from 'react'

import { logs } from '../../constants'

export namespace ZoomLogProviderNS {
  export type Error = string | object
  export type Log = (description: logs, error?: Error | undefined) => undefined

  export interface ProviderValue {
    sendLog?: Log
  }

  export interface Props {
    onLog: Log
    children?: ReactNode
  }
}

const ZoomLogContext = createContext<ZoomLogProviderNS.ProviderValue>({})

export const ZoomLogProvider: FC<ZoomLogProviderNS.Props> = ({ onLog, children }) => {
  return <ZoomLogContext.Provider value={{ sendLog: onLog }}>{children}</ZoomLogContext.Provider>
}

export { ZoomLogContext as zoomLogContext }
