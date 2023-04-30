import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

export namespace DefaultElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const DefaultElement: FC<DefaultElementNS.Props> = ({ children, attributes, element }) => {
  return <p {...attributes}>{children}</p>
}
