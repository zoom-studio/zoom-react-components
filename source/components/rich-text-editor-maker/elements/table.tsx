import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'
import { CustomElement } from 'slate'

import { TableGenerator, TableGeneratorNS } from '../..'
import { useEditorContext } from '../utils'

export namespace TableElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const TableElement: FC<TableElementNS.Props> = ({ children, attributes, element }) => {
  const { tableInfo } = element
  const editorContext = useEditorContext()

  const handleOnWrite = (evt: TableGeneratorNS.OnWriteCallbackParams) => {
    const { cellsData } = evt
    editorContext.setEditorValue(currentValue =>
      currentValue.map(n => {
        const node = n as CustomElement
        if (node.type === 'table' && node.id === element.id) {
          return { ...node, tableInfo: cellsData }
        }
        return n
      }),
    )
  }

  return (
    <div
      {...attributes}
      contentEditable={false}
      id={element?.id}
      className="table-editor-container"
    >
      <TableGenerator onWrite={handleOnWrite} cellsData={tableInfo} maxWidth="95%" />
      {children}
    </div>
  )
}
