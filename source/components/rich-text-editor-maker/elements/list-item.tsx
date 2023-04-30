import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

export namespace ListItemElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const ListItemElement: FC<ListItemElementNS.Props> = ({ children, attributes, element }) => {
  return <li {...attributes}>{children}</li>
}
