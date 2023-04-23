import React, { Dispatch, FC, SetStateAction } from 'react'

import { Button, ButtonNS, TableGeneratorNS } from '..'

export namespace RowActionsNS {
  export interface Props {
    rowIndex: number
    setRowToRemove: Dispatch<SetStateAction<number | null>>
    setRowToAppend: Dispatch<SetStateAction<TableGeneratorNS.RowToAppend | null>>
    addRow: () => void
    removeRow: () => void
  }
}

export const RowActions: FC<RowActionsNS.Props> = ({
  rowIndex,
  setRowToRemove,
  setRowToAppend,
  addRow,
  removeRow,
}) => {
  const actionButtonsProps: ButtonNS.Props = {
    shape: 'circle',
    type: 'bordered',
  }

  const onMouseOverRemoveButton = () => {
    setRowToRemove(rowIndex)
  }

  const onMouseLeaveRemoveButton = () => {
    setRowToRemove(null)
  }

  const onMouseOverAddToTopButton = () => {
    setRowToAppend({ rowIndex, appendTo: 'top' })
  }

  const onMouseOverAddToBottomButton = () => {
    setRowToAppend({ rowIndex, appendTo: 'bottom' })
  }

  const onMouseLeaveAddButtons = () => {
    setRowToAppend(null)
  }

  return (
    <div className="row-actions">
      <Button
        {...actionButtonsProps}
        variant="success"
        prefixMaterialIcon="add"
        onClick={addRow}
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
        onClick={addRow}
        containerProps={{
          onMouseOver: onMouseOverAddToBottomButton,
          onMouseLeave: onMouseLeaveAddButtons,
        }}
      />
    </div>
  )
}
