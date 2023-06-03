import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps } from 'slate-react'

export namespace ListItemElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const ListItemElement: FC<ListItemElementNS.Props> = ({ children, attributes }) => {
  return <li {...attributes}>{children}</li>
}
