import React, { FC, Fragment, useState } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import { pullAt } from 'lodash'

import { ScrollView, ScrollViewNS } from '..'
import { useFutureEffect, useVariable, useZoomComponent, useZoomContext } from '../../hooks'
import { BaseComponent } from '../../types'

import { CellInput } from './cell-input'
import { ColActions } from './col-actions'
import { RowActions } from './row-actions'

export namespace TableGeneratorNS {
  export type DataType = string | number | boolean
  export type CellsData = DataType[][]

  export interface ColToAppend {
    colIndex: number
    appendTo: 'right' | 'left'
  }

  export interface RowToAppend {
    rowIndex: number
    appendTo: 'top' | 'bottom'
  }

  export interface CellInfo {
    rowIndex: number
    colIndex: number
  }

  export interface CellsCount {
    rows: number
    cols: number
  }

  export interface OnWriteCallbackParams {
    cellsData: CellsData
    cellsCount: CellsCount
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    cellsData?: CellsData | CellsCount
    maxHeight?: string | number
    scrollViewProps?: Omit<ScrollViewNS.Props, 'maxHeight'>
    onWrite?: (params: OnWriteCallbackParams) => void
  }
}

export const TableGenerator: FC<TableGeneratorNS.Props> = ({
  cellsData: providedCellsData = { cols: 5, rows: 5 },
  maxHeight = '50vh',
  className,
  containerProps,
  onWrite,
  scrollViewProps,
  ...rest
}) => {
  const { isRTL } = useZoomContext()

  const [hoveredCell, setHoveredCell] = useState<TableGeneratorNS.CellInfo | null>(null)
  const [columnToRemove, setColumnToRemove] = useState<number | null>(null)
  const [rowToRemove, setRowToRemove] = useState<number | null>(null)
  const [colToAppend, setColToAppend] = useState<TableGeneratorNS.ColToAppend | null>(null)
  const [rowToAppend, setRowToAppend] = useState<TableGeneratorNS.RowToAppend | null>(null)

  const cellsCountToCellsData = (
    cellsCount: TableGeneratorNS.CellsCount,
  ): TableGeneratorNS.CellsData => {
    const { cols, rows } = cellsCount
    const cellsData: TableGeneratorNS.CellsData = []

    Array.from(Array(rows)).forEach(() => {
      const row: TableGeneratorNS.DataType[] = []
      Array.from(Array(cols)).forEach(() => row.push(''))
      cellsData.push(row)
    })

    return cellsData
  }

  const [cellsData, setCellsData] = useState<TableGeneratorNS.CellsData>(() => {
    if ('rows' in providedCellsData) {
      return cellsCountToCellsData(providedCellsData)
    }
    return providedCellsData
  })

  const cellsCount = useVariable<TableGeneratorNS.CellsCount>(() => {
    const rows = cellsData.length
    const cols = Math.max(...cellsData.map((_, rowIndex) => cellsData[rowIndex].length))
    return { cols, rows }
  })

  const { createClassName } = useZoomComponent('table-generator')

  const classes = createClassName(className)

  const handleOnMouseOverInputCells = (cellInfo: TableGeneratorNS.CellInfo) => () => {
    setHoveredCell(cellInfo)
  }

  const handleOnMouseLeaveTable = () => {
    setHoveredCell(null)
  }

  const getRowActionCell = ({ rowIndex }: TableGeneratorNS.CellInfo) => {
    return classNames('action-cell row-action-cell', {
      active: hoveredCell?.rowIndex === rowIndex,
    })
  }

  const getCellData = ({
    colIndex,
    rowIndex,
  }: TableGeneratorNS.CellInfo): TableGeneratorNS.DataType => {
    if ('rows' in cellsData) {
      return ''
    }
    return cellsData?.[rowIndex]?.[colIndex] ?? ''
  }

  const handleOnCellInputChange = (cellInfo: TableGeneratorNS.CellInfo) => (newValue: string) => {
    const { colIndex, rowIndex } = cellInfo

    setCellsData(cellsData => {
      const newCellsData = [...cellsData]
      newCellsData[rowIndex][colIndex] = newValue
      return newCellsData
    })
  }

  const addColumn = () => {
    if (!colToAppend) {
      return null
    }

    let { appendTo, colIndex: colIndexToAppend } = colToAppend

    if (isRTL) {
      appendTo = appendTo === 'left' ? 'right' : 'left'
    }

    if (appendTo === 'right') {
      colIndexToAppend++
    }

    setCellsData(cellsData => {
      const newCellsData: TableGeneratorNS.CellsData = []
      cellsData.forEach(row => {
        const newRow: TableGeneratorNS.DataType[] = []
        if (colIndexToAppend === cellsCount.cols && appendTo === 'right') {
          newRow.push(...row, '')
        } else {
          row.forEach((col, colIndex) => {
            if (colIndex === colIndexToAppend) {
              newRow.push('')
            }
            newRow.push(col)
          })
        }
        newCellsData.push(newRow)
      })
      return newCellsData
    })
  }

  const removeColumn = () => {
    if (!columnToRemove && columnToRemove !== 0) {
      return null
    }

    if (cellsCount.cols === 1) {
      setCellsData(cellsData => {
        const newCellsData: TableGeneratorNS.CellsData = []
        cellsData.forEach(row => {
          const newRow: TableGeneratorNS.DataType[] = []
          row.forEach(() => newRow.push(''))
          newCellsData.push(newRow)
        })
        return newCellsData
      })
    } else {
      setCellsData(cellsData => {
        const newCellsData: TableGeneratorNS.CellsData = []
        cellsData.forEach(row => {
          pullAt(row, columnToRemove)
          newCellsData.push(row)
        })
        return newCellsData
      })
    }
  }

  const addRow = () => {
    if (!rowToAppend) {
      return null
    }

    let { appendTo, rowIndex: rowIndexToAppend } = rowToAppend

    if (appendTo === 'bottom') {
      rowIndexToAppend++
    }

    setCellsData(cellsData => {
      const newCellsData: TableGeneratorNS.CellsData = []

      if (appendTo === 'bottom' && rowIndexToAppend === cellsCount.rows) {
        newCellsData.push(
          ...cellsData,
          Array.from(Array(cellsCount.cols)).map(() => ''),
        )
      } else {
        cellsData.forEach((_, rowIndex) => {
          if (rowIndex === rowIndexToAppend) {
            newCellsData.push(Array.from(Array(cellsCount.cols)).map(() => ''))
          }
          newCellsData.push(cellsData[rowIndex])
        })
      }

      return newCellsData
    })
  }

  const removeRow = () => {
    if (!rowToRemove && rowToRemove !== 0) {
      return null
    }

    if (cellsCount.rows === 1) {
      setCellsData(() => {
        const newRow: TableGeneratorNS.DataType[] = []
        Array.from(Array(cellsCount.cols)).forEach(() => newRow.push(''))
        return [newRow]
      })
    } else {
      setCellsData(cellsData => {
        const newCellsData = [...cellsData]
        pullAt(newCellsData, rowToRemove)
        return newCellsData
      })
    }
  }

  const scrollViewClasses = classNames('table-scroll-view', {
    [scrollViewProps?.className ?? '']: true,
  })

  useFutureEffect(() => {
    onWrite?.({ cellsCount, cellsData })
  }, [cellsData])

  return (
    <div {...rest} {...containerProps} className={classes}>
      <ScrollView autoHide {...scrollViewProps} maxHeight={maxHeight} className={scrollViewClasses}>
        <table cellSpacing={0} onMouseLeave={handleOnMouseLeaveTable}>
          <thead>
            <tr>
              {Array.from(Array(cellsCount.cols + 1)).map((_, colIndex) => (
                <td className="action-cell col-action-cell" key={colIndex}>
                  {colIndex > 0 ? (
                    <div className="col-actions-container">
                      {hoveredCell?.colIndex === colIndex - 1 && (
                        <ColActions
                          colIndex={colIndex - 1}
                          setColumnToRemove={setColumnToRemove}
                          setColToAppend={setColToAppend}
                          addColumn={addColumn}
                          removeColumn={removeColumn}
                        />
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from(Array(cellsCount.rows)).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from(Array(cellsCount.cols)).map((_, colIndex) => (
                  <Fragment key={colIndex}>
                    {colIndex === 0 && (
                      <td className={getRowActionCell({ colIndex, rowIndex })}>
                        <div className="row-actions-container">
                          {hoveredCell?.rowIndex === rowIndex && (
                            <RowActions
                              rowIndex={rowIndex}
                              setRowToRemove={setRowToRemove}
                              setRowToAppend={setRowToAppend}
                              addRow={addRow}
                              removeRow={removeRow}
                            />
                          )}
                        </div>
                      </td>
                    )}

                    <td
                      className="input-cell"
                      onMouseOver={handleOnMouseOverInputCells({ colIndex, rowIndex })}
                    >
                      <CellInput
                        isRTL={isRTL}
                        removal={columnToRemove === colIndex || rowToRemove === rowIndex}
                        colIndex={colIndex}
                        rowIndex={rowIndex + 1}
                        onWrite={handleOnCellInputChange({ colIndex, rowIndex })}
                        value={getCellData({ colIndex, rowIndex })}
                        appendToLeft={
                          colToAppend?.colIndex === colIndex && colToAppend.appendTo === 'left'
                        }
                        appendToRight={
                          colToAppend?.colIndex === colIndex && colToAppend.appendTo === 'right'
                        }
                        appendToTop={
                          rowToAppend?.rowIndex === rowIndex && rowToAppend.appendTo === 'top'
                        }
                        appendToBottom={
                          rowToAppend?.rowIndex === rowIndex && rowToAppend.appendTo === 'bottom'
                        }
                      />
                    </td>
                  </Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollView>
    </div>
  )
}
