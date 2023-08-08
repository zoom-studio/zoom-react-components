import React, { type FC } from 'react'

import { classNames } from '@zoom-studio/js-ts-utils'
import { type RenderElementProps } from 'slate-react'

import { RichUtils, useEditorContext } from '../../utils'
import { RowActions } from './row-actions'
import { TableElementNS } from './types'
import { useTableDOM } from './use-dom'

export namespace TableCellElementNS {
  export interface Props extends RenderElementProps {}
}

export const TableCellElement: FC<TableCellElementNS.Props> = ({
  children,
  attributes,
  element,
}) => {
  const { editor, readonly } = useEditorContext()

  const richUtils = new RichUtils({ editor })

  const { tableColIndex, tableRowIndex, id, tableInfo } = element

  const tableDOM = useTableDOM(id!)

  const addRow = (side: TableElementNS.VerticalSide) => {
    richUtils.insertTableRow(tableRowIndex!, side, id!)
  }

  const removeRow = (rowToRemove: number) => () => {
    richUtils.removeTableRow(rowToRemove, id!)
  }

  const rowActionCellClasses = classNames('action-cell', {
    [TableElementNS.CLASS_NAMES.rowActions]: true,
  })

  const handleOnMouseOverInputCells = () => {
    tableDOM.deactiveCurrentActiveColActions()
    tableDOM.deactiveCurrentActiveRowActions()
    tableDOM.activeColActions(tableColIndex!)
    tableDOM.activeRowActions(tableRowIndex!)
  }

  return (
    <>
      {tableColIndex === 0 && !readonly && (
        <td className={rowActionCellClasses} data-row-index={tableRowIndex} contentEditable={false}>
          <div className="row-actions-container">
            <RowActions
              rowIndex={tableRowIndex!}
              addRow={addRow}
              removeRow={removeRow(tableRowIndex!)}
              tableID={id!}
              tableInfo={tableInfo!}
            />
          </div>
        </td>
      )}

      <td
        {...attributes}
        className={TableElementNS.CLASS_NAMES.inputCell}
        onMouseOver={handleOnMouseOverInputCells}
        data-col-index={tableColIndex}
        data-row-index={tableRowIndex}
      >
        {children}
      </td>
    </>
  )
}
