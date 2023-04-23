import React, { Dispatch, FC, SetStateAction } from 'react'

import { Button, ButtonNS, TableGeneratorNS } from '..'

export namespace ColActionsNS {
  export interface Props {
    colIndex: number
    setColumnToRemove: Dispatch<SetStateAction<number | null>>
    setColToAppend: Dispatch<SetStateAction<TableGeneratorNS.ColToAppend | null>>
    addColumn: () => void
    removeColumn: () => void
  }
}

export const ColActions: FC<ColActionsNS.Props> = ({
  colIndex,
  setColumnToRemove,
  setColToAppend,
  addColumn,
  removeColumn,
}) => {
  const actionButtonsProps: ButtonNS.Props = {
    shape: 'circle',
    type: 'bordered',
  }

  const onMouseOverRemoveButton = () => {
    setColumnToRemove(colIndex)
  }

  const onMouseLeaveRemoveButton = () => {
    setColumnToRemove(null)
  }

  const onMouseOverAddToPrevButton = () => {
    setColToAppend({ colIndex, appendTo: 'left' })
  }

  const onMouseOverAddToNextButton = () => {
    setColToAppend({ colIndex, appendTo: 'right' })
  }

  const onMouseLeaveAddButtons = () => {
    setColToAppend(null)
  }

  return (
    <div className="col-actions">
      <Button
        {...actionButtonsProps}
        variant="success"
        prefixMaterialIcon="add"
        onClick={addColumn}
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
        onClick={addColumn}
        containerProps={{
          onMouseOver: onMouseOverAddToNextButton,
          onMouseLeave: onMouseLeaveAddButtons,
        }}
      />
    </div>
  )
}
