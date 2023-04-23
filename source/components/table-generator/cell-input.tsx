import React, { ChangeEvent, FC, KeyboardEvent } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { TableGeneratorNS } from '.'
import { findInput } from './utils'

export namespace CellInputNS {
  export interface Props {
    rowIndex: number
    colIndex: number
    value: TableGeneratorNS.DataType
    removal?: boolean
    appendToRight?: boolean
    appendToLeft?: boolean
    appendToTop?: boolean
    appendToBottom?: boolean
    onWrite?: (value: string) => void
    isRTL: boolean
  }
}

export const CellInput: FC<CellInputNS.Props> = ({
  colIndex,
  rowIndex,
  value,
  removal,
  appendToLeft,
  appendToRight,
  appendToBottom,
  appendToTop,
  onWrite,
  isRTL,
}) => {
  const handleOnInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onWrite?.(evt.target.value)
  }

  const classes = classNames('cell-input-container', {
    'removal': !!removal,
    'append-to-left': !!appendToLeft,
    'append-to-right': !!appendToRight,
    'append-to-top': !!appendToTop,
    'append-to-bottom': !!appendToBottom,
  })

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
    <div className={classes}>
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
