import React, { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export namespace PortalNS {
  export interface Props {
    children?: ReactNode
  }
}

export const Portal: FC<PortalNS.Props> = ({ children }) => {
  if (!document) {
    return <></>
  }

  return createPortal(children, document.body)
}
