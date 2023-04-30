import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

export namespace OrderedListElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const OrderedListElement: FC<OrderedListElementNS.Props> = ({
  children,
  attributes,
  element,
}) => {
  return <ol {...attributes}>{children}</ol>
}
