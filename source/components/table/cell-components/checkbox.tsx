import React, { type FC, type MutableRefObject, useEffect } from 'react'

import { type Row } from '@tanstack/react-table'
import { useDragWithoutGhost } from '@zoom-studio/zoom-js-ts-utils'

import { Checkbox, type CheckboxNS } from '../..'

export namespace CellCheckboxNS {
  export interface Props extends CheckboxNS.Props {
    indeterminate: boolean
    dragToSelect: boolean
    row?: Row<object>
    isStartedToSelectViaDragRef?: MutableRefObject<boolean>
    isClickedCheckboxCheckedRef?: MutableRefObject<boolean>
  }
}

export const CellCheckbox: FC<CellCheckboxNS.Props> = ({
  checked,
  dragToSelect,
  children,
  isStartedToSelectViaDragRef,
  isClickedCheckboxCheckedRef,
  row,
  ...rest
}) => {
  const isDragToSelectEnabled = () => {
    return dragToSelect && isStartedToSelectViaDragRef && row && isClickedCheckboxCheckedRef
  }

  const handleOnDragStart = useDragWithoutGhost<HTMLDivElement>(evt => {
    if (!isDragToSelectEnabled()) {
      return null
    }
    evt.preventDefault()
    evt.stopPropagation()

    const isCheckboxChecked = row!.getIsSelected()

    isStartedToSelectViaDragRef!.current = true
    isClickedCheckboxCheckedRef!.current = isCheckboxChecked
    row!.toggleSelected(!isCheckboxChecked)
  })

  const handleOnMouseEnter = () => {
    if (!isDragToSelectEnabled()) {
      return null
    }
    if (isStartedToSelectViaDragRef!.current) {
      row!.toggleSelected(!isClickedCheckboxCheckedRef!.current)
    }
  }

  const handleOnDocumentMouseUp = () => {
    if (!isDragToSelectEnabled()) {
      return null
    }
    isStartedToSelectViaDragRef!.current = false
    isClickedCheckboxCheckedRef!.current = false
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleOnDocumentMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleOnDocumentMouseUp)
    }
  }, [])

  return (
    <div
      draggable={!!isDragToSelectEnabled()}
      className="table-cell-checkbox"
      onDragStart={handleOnDragStart}
      onMouseEnter={handleOnMouseEnter}
    >
      <Checkbox checked={checked} size="small" {...rest} />
      {children}
    </div>
  )
}
