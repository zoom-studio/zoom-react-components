import React, { FC } from 'react'

import { RenderElementProps } from 'slate-react'

export namespace TableRowElementNS {
  export interface Props extends RenderElementProps {}
}

export const TableRowElement: FC<TableRowElementNS.Props> = ({ children, attributes, element }) => {
  const { tableRowIndex } = element

  return (
    <tr {...attributes} data-row-index={tableRowIndex}>
      {children}
    </tr>
  )
}
