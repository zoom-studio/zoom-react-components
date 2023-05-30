import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps } from 'slate-react'

export namespace UnorderedListElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const UnorderedListElement: FC<UnorderedListElementNS.Props> = ({
  children,
  attributes,
  element,
}) => {
  return <ul {...attributes}>{children}</ul>
}
