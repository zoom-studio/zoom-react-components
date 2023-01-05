import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'

import { ToastNS } from './toast'
import { Toasts, ToastsNS } from './toasts'

export namespace ToastProviderNS {
  export interface Props extends ProviderValue {
    children?: ReactNode
  }

  export interface ProviderValue extends Partial<Omit<ToastsNS.Props, 'toasts'>> {
    setToasts?: Dispatch<SetStateAction<ToastNS.Toast[]>>
    toasts?: ToastNS.Toast[]
  }
}

export const ToastContext = createContext<ToastProviderNS.ProviderValue>({})

export const ToastProvider: FC<ToastProviderNS.Props> = ({ children, ...values }) => {
  const [toasts, setToasts] = useState<ToastNS.Toast[]>(values.toasts ?? [])

  return (
    <ToastContext.Provider value={{ ...values, setToasts, toasts }}>
      <Toasts {...values} toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}
