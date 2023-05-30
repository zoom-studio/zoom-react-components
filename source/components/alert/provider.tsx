import React, { createContext, type FC, type ReactNode, useState } from 'react'

import { type AlertNS } from '.'

export namespace AlertProviderNS {
  export type Alert = AlertNS.Identifier

  export interface ProviderValue {
    alerts?: Alert[]
    isOpen?: (alert: Alert) => boolean
    destroy?: (alert: Alert) => void
    show?: (alert: Alert) => void
  }

  export interface Props {
    children: ReactNode
  }
}

const AlertContext = createContext<AlertProviderNS.ProviderValue>({})

export const AlertProvider: FC<AlertProviderNS.Props> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProviderNS.Alert[]>([])

  const destroy = (alert: AlertProviderNS.Alert): void => {
    setAlerts(currentAlerts => currentAlerts.filter(alertID => alert !== alertID))
  }

  const show = (alert: AlertProviderNS.Alert): void => {
    setAlerts(currentAlerts => {
      if (currentAlerts.includes(alert)) {
        return currentAlerts
      }
      return [...currentAlerts, alert]
    })
  }

  const isOpen = (alert: AlertProviderNS.Alert): boolean => alerts.includes(alert)

  return (
    <AlertContext.Provider value={{ alerts, show, destroy, isOpen }}>
      {children}
    </AlertContext.Provider>
  )
}

export { AlertContext as alertContext }
