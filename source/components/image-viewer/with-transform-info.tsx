import React, { useState, type FC, type ReactNode } from 'react'

import { useTransformEffect, type ReactZoomPanPinchContextState } from 'react-zoom-pan-pinch'

export namespace WithTransformInfoNS {
  export interface Props {
    children: (params: ReactZoomPanPinchContextState | null) => ReactNode
  }
}

export const WithTransformInfo: FC<WithTransformInfoNS.Props> = ({ children }) => {
  const [info, setInfo] = useState<ReactZoomPanPinchContextState | null>(null)
  useTransformEffect(setInfo)
  return <>{children(info)}</>
}
