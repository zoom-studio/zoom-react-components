import React, { type FC, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export namespace PortalNS {
  export interface Props {
    children?: ReactNode
    container?: Element | DocumentFragment | null | undefined
  }
}

export const Portal: FC<PortalNS.Props> = ({ container = document.body, children }) => {
  if (!document) {
    return <></>
  }

  return createPortal(children, container ?? document.body)
}
