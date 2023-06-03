import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps } from 'slate-react'

export namespace QuoteElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const QuoteElement: FC<QuoteElementNS.Props> = ({ children, attributes }) => {
  return <blockquote {...attributes}>{children}</blockquote>
}
