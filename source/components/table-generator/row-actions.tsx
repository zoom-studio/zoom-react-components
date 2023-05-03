import React, { FC } from 'react'

import { Button, ButtonNS, TableGeneratorNS } from '..'
import { UseTableGeneratorDomNS, useTableGeneratorDOM } from './use-dom'

export namespace RowActionsNS {
  export interface Props extends UseTableGeneratorDomNS.Params {
    rowIndex: number
    addRow: (rowToAppend: TableGeneratorNS.RowToAppend) => void
    removeRow: () => void
  }
}

export const RowActions: FC<RowActionsNS.Props> = ({
  rowIndex,
  addRow,
  removeRow,
  sendLog,
  tableRef,
}) => {
  const tableDOM = useTableGeneratorDOM({ sendLog, tableRef })

  const actionButtonsProps: ButtonNS.Props = {
    shape: 'circle',
    type: 'bordered',
  }

  const onMouseOverRemoveButton = () => {
    tableDOM.unRemovalAllRemovalInputCells()
    tableDOM.removalInputCellsByRowIndex(rowIndex)
  }

  const onMouseLeaveRemoveButton = () => {
    tableDOM.unRemovalAllRemovalInputCells()
  }

  const onMouseOverAddToTopButton = () => {
    tableDOM.removeAllMarkedAsAppendToTopInputCells()
    tableDOM.markInputCellsAsAppendToTopByRowIndex(rowIndex)
  }

  const onMouseOverAddToBottomButton = () => {
    tableDOM.removeAllMarkedAsAppendToBottomInputCells()
    tableDOM.markInputCellsAsAppendToBottomByRowIndex(rowIndex)
  }

  const onMouseLeaveAddButtons = () => {
    tableDOM.removeAllMarkedAsAppendToTopInputCells()
    tableDOM.removeAllMarkedAsAppendToBottomInputCells()
  }

  return (
    <div className="row-actions">
      <Button
        {...actionButtonsProps}
        variant="success"
        prefixMaterialIcon="add"
        onClick={() => addRow({ appendTo: 'top' })}
        containerProps={{
          onMouseOver: onMouseOverAddToTopButton,
          onMouseLeave: onMouseLeaveAddButtons,
        }}
      />

      <Button
        {...actionButtonsProps}
        variant="error"
        prefixMaterialIcon="clear"
        onClick={removeRow}
        containerProps={{
          onMouseOver: onMouseOverRemoveButton,
          onMouseLeave: onMouseLeaveRemoveButton,
        }}
      />

      <Button
        {...actionButtonsProps}
        variant="success"
        prefixMaterialIcon="add"
        onClick={() => addRow({ appendTo: 'bottom' })}
        containerProps={{
          onMouseOver: onMouseOverAddToBottomButton,
          onMouseLeave: onMouseLeaveAddButtons,
        }}
      />
    </div>
  )
}
