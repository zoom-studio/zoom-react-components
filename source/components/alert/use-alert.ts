import { useContext } from 'react'

import { alertContext, AlertProviderNS } from './provider'

export namespace UseAlertNS {
  export type ReturnType = Required<AlertProviderNS.ProviderValue>
}

export const useAlert = (): UseAlertNS.ReturnType => {
  const ctx = useContext(alertContext)
  return <UseAlertNS.ReturnType>ctx
}
