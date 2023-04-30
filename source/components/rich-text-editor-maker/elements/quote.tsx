import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

export namespace QuoteElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const QuoteElement: FC<QuoteElementNS.Props> = ({ children, attributes, element }) => {
  return <blockquote {...attributes}>{children}</blockquote>
}
