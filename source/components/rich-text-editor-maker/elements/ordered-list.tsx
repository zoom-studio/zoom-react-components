import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps } from 'slate-react'

export namespace OrderedListElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const OrderedListElement: FC<OrderedListElementNS.Props> = ({ children, attributes }) => {
  return <ol {...attributes}>{children}</ol>
}
