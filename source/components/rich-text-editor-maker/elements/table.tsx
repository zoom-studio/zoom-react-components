import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

import { TableGenerator } from '../..'

export namespace TableElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const TableElement: FC<TableElementNS.Props> = ({ children, attributes, element }) => {
  return (
    <div {...attributes} contentEditable={false} className="table-editor-container">
      <TableGenerator cellsData={element.tableInfo} maxWidth="95%" />
      {children}
    </div>
  )
}
