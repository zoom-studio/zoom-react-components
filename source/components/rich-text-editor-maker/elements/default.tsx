import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps } from 'slate-react'

export namespace DefaultElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const DefaultElement: FC<DefaultElementNS.Props> = ({ children, attributes }) => {
  return <p {...attributes}>{children}</p>
}
