import React, { FC } from 'react'

import { Button, ButtonNS } from '../../..'

import { TableElementNS } from './types'
import { useTableGeneratorDOM } from './use-dom'

export namespace RowActionsNS {
  export interface Props {
    rowIndex: number
    addRow: (side: TableElementNS.VerticalSide) => void
    removeRow: () => void
    tableID: string
  }
}

export const RowActions: FC<RowActionsNS.Props> = ({ rowIndex, addRow, removeRow, tableID }) => {
  const tableDOM = useTableGeneratorDOM(tableID)

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
        onClick={() => addRow('top')}
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
        onClick={() => addRow('bottom')}
        containerProps={{
          onMouseOver: onMouseOverAddToBottomButton,
          onMouseLeave: onMouseLeaveAddButtons,
        }}
      />
    </div>
  )
}
