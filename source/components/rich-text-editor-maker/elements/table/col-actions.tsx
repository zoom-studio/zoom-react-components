import React, { type FC } from 'react'

import { Button, type ButtonNS, type RichTextEditorMakerNS } from '../../..'

import { useTableDOM } from './use-dom'
import { type TableElementNS } from './types'
import { useZoomContext } from '../../../../hooks'

export namespace ColActionsNS {
  export interface Props {
    colIndex: number
    addColumn: (side: TableElementNS.HorizontalSide) => void
    removeColumn: () => void
    tableID: string
    tableInfo: RichTextEditorMakerNS.TableCells
  }
}

export const ColActions: FC<ColActionsNS.Props> = ({
  colIndex,
  addColumn,
  removeColumn,
  tableID,
  tableInfo,
}) => {
  const tableDOM = useTableDOM(tableID)
  const { isRTL } = useZoomContext()

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
          addColumn(isRTL ? 'right' : 'left')
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
        disabled={tableInfo.cols === 1}
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
          addColumn(isRTL ? 'left' : 'right')
        }}
        containerProps={{
          onMouseOver: onMouseOverAddToNextButton,
          onMouseLeave: onMouseLeaveAddButtons,
        }}
      />
    </div>
  )
}
