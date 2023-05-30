import React, { type FC } from 'react'

import { Button, type ButtonNS, type TableGeneratorNS } from '..'
import { type UseTableGeneratorDomNS, useTableGeneratorDOM } from './use-dom'

export namespace ColActionsNS {
  export interface Props extends UseTableGeneratorDomNS.Params {
    colIndex: number
    addColumn: (colToAppend: TableGeneratorNS.ColToAppend) => void
    removeColumn: () => void
  }
}

export const ColActions: FC<ColActionsNS.Props> = ({
  colIndex,
  addColumn,
  removeColumn,
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
    tableDOM.removalInputCellsByColIndex(colIndex)
  }

  const onMouseLeaveRemoveButton = () => {
    tableDOM.unRemovalAllRemovalInputCells()
  }

  const onMouseOverAddToPrevButton = () => {
    tableDOM.removeAllMarkedAsAppendToLeftInputCells()
    tableDOM.markInputCellsAsAppendToLeftByColIndex(colIndex)
  }

  const onMouseOverAddToNextButton = () => {
    tableDOM.removeAllMarkedAsAppendToRightInputCells()
    tableDOM.markInputCellsAsAppendToRightByColIndex(colIndex)
  }

  const onMouseLeaveAddButtons = () => {
    tableDOM.removeAllMarkedAsAppendToLeftInputCells()
    tableDOM.removeAllMarkedAsAppendToRightInputCells()
  }

  return (
    <div className="col-actions">
      <Button
        {...actionButtonsProps}
        variant="success"
        prefixMaterialIcon="add"
        onClick={() => {
          addColumn({ appendTo: 'left' })
        }}
        containerProps={{
          onMouseOver: onMouseOverAddToPrevButton,
          onMouseLeave: onMouseLeaveAddButtons,
        }}
      />

      <Button
        {...actionButtonsProps}
        variant="error"
        prefixMaterialIcon="clear"
        onClick={removeColumn}
        containerProps={{
          onMouseOver: onMouseOverRemoveButton,
          onMouseLeave: onMouseLeaveRemoveButton,
        }}
      />

      <Button
        {...actionButtonsProps}
        variant="success"
        prefixMaterialIcon="add"
        onClick={() => {
          addColumn({ appendTo: 'right' })
        }}
        containerProps={{
          onMouseOver: onMouseOverAddToNextButton,
          onMouseLeave: onMouseLeaveAddButtons,
        }}
      />
    </div>
  )
}
