import { useContext } from 'react'

import { zoomContext, ZoomProviderNS } from '../components'

export namespace UseZoomContextNS {
  export type ReturnType = Required<Omit<ZoomProviderNS.ProviderValue, 'children'>>
}

export const useZoomContext = (): UseZoomContextNS.ReturnType => {
  const ctx = useContext(zoomContext)
  return <UseZoomContextNS.ReturnType>ctx
}
