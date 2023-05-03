import React, { ChangeEvent, FC, KeyboardEvent } from 'react'

import { TableGeneratorNS } from '.'
import { findInput } from './utils'

export namespace CellInputNS {
  export interface Props {
    rowIndex: number
    colIndex: number
    value: TableGeneratorNS.DataType

    onWrite?: (value: string) => void
    isRTL: boolean
  }
}

export const CellInput: FC<CellInputNS.Props> = ({ colIndex, rowIndex, value, onWrite, isRTL }) => {
  const handleOnInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onWrite?.(evt.target.value)
  }

  const handleOnInputKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    enum reservedKeys {
      up = 'ArrowUp',
      right = 'ArrowRight',
      down = 'ArrowDown',
      left = 'ArrowLeft',
    }
    const { down, left, right, up } = reservedKeys
    const isKeyFromReservedKeys = Object.values(reservedKeys).includes(evt.key as reservedKeys)

    if (!isKeyFromReservedKeys) {
      return null
    }

    const shouldNavigateVertically = [up, down].includes(evt.key as reservedKeys)

    const shouldNavigateHorizontally =
      (!value || evt.altKey) && [right, left].includes(evt.key as reservedKeys)

    if (!shouldNavigateHorizontally && !shouldNavigateVertically) {
      return null
    }

    evt.preventDefault()

    switch (evt.key) {
      case up: {
        findInput(rowIndex - 1, colIndex)?.focus()
        break
      }
      case right: {
        findInput(rowIndex, isRTL ? colIndex - 1 : colIndex + 1)?.focus()
        break
      }
      case down: {
        findInput(rowIndex + 1, colIndex)?.focus()
        break
      }
      case left: {
        findInput(rowIndex, isRTL ? colIndex + 1 : colIndex - 1)?.focus()
        break
      }
    }
  }

  return (
    <div className="cell-input-container">
      <span className="width-calibration">{value}</span>
      <input
        className="cell-input"
        data-row-index={rowIndex}
        data-col-index={colIndex}
        value={value.toString()}
        onChange={handleOnInputChange}
        onKeyDown={handleOnInputKeyDown}
      />
    </div>
  )
}
