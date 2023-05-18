import React, { FC } from 'react'

import { RenderElementProps } from 'slate-react'

import { RowActions } from './row-actions'
import { TableElementNS } from './types'
import { useZoomComponent } from '../../../../hooks'
import { RichUtils, useEditorContext } from '../../utils'

export namespace TableCellElementNS {
  export interface Props extends RenderElementProps {}
}

export const TableCellElement: FC<TableCellElementNS.Props> = ({
  children,
  attributes,
  element,
}) => {
  const { sendLog } = useZoomComponent('rich-text-editor-table-cell-element')
  const { editor } = useEditorContext()

  const richUtils = new RichUtils({ editor })

  const { tableColIndex, tableRowIndex, id } = element

  const addRow = (side: TableElementNS.VerticalSide) => {
    richUtils.insertTableRow(tableRowIndex!, side, id!)
  }

  const removeRow = (rowToRemove: number) => () => {}

  return (
    <>
      {tableColIndex === 0 && (
        <td
          className="action-cell row-action-cell"
          data-row-index={tableRowIndex}
          contentEditable={false}
        >
          <div className="row-actions-container">
            <RowActions
              rowIndex={tableRowIndex!}
              addRow={addRow}
              removeRow={removeRow(tableRowIndex!)}
              sendLog={sendLog}
              tableID={id!}
            />
          </div>
        </td>
      )}

      <td {...attributes} data-col-index={tableColIndex} data-row-index={tableRowIndex}>
        {tableRowIndex}
        {children}
      </td>
    </>
  )
}
