import React, { Fragment, forwardRef, useRef, useState } from 'react'

import { classNames, useFutureEffect, useVariable } from '@zoom-studio/zoom-js-ts-utils'

import { ScrollView, type ScrollViewNS } from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { type BaseComponent } from '../../types'

import { CellInput } from './cell-input'
import { ColActions } from './col-actions'
import { RowActions } from './row-actions'
import { useTableGeneratorDOM } from './use-dom'
import { pullAt } from 'lodash'

export namespace TableGeneratorNS {
  export type DataType = string | number | boolean
  export type CellsData = DataType[][]

  export const CLASS_NAMES = {
    colActions: 'col-actions-container',
    rowActions: 'row-action-cell',
    inputCell: 'input-cell',
  }

  export interface ColToAppend {
    appendTo: 'right' | 'left'
  }

  export interface RowToAppend {
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
    maxWidth?: string | number
    scrollViewProps?: Omit<ScrollViewNS.Props, 'maxHeight'>
    onWrite?: (params: OnWriteCallbackParams) => void
  }
}

export const TableGenerator = forwardRef<HTMLDivElement, TableGeneratorNS.Props>(
  (
    {
      cellsData: providedCellsData = { cols: 5, rows: 5 },
      maxHeight = '50vh',
      maxWidth = '100%',
      className,
      containerProps,
      onWrite,
      scrollViewProps,
      ...rest
    },
    reference,
  ) => {
    const tableRef = useRef<HTMLTableElement | null>(null)
    const { isRTL } = useZoomContext()

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

    const { createClassName, sendLog } = useZoomComponent('table-generator')

    const tableDOM = useTableGeneratorDOM({ sendLog, tableRef })

    const classes = createClassName(className)

    const handleOnMouseOverInputCells = (cellInfo: TableGeneratorNS.CellInfo) => () => {
      tableDOM.deactiveCurrentActiveColActions()
      tableDOM.deactiveCurrentActiveRowActions()
      tableDOM.activeColActions(cellInfo.colIndex)
      tableDOM.activeRowActions(cellInfo.rowIndex)
    }

    const handleOnMouseLeaveTable = () => {
      tableDOM.deactiveCurrentActiveColActions()
      tableDOM.deactiveCurrentActiveRowActions()
    }

    const rowActionCellClasses = classNames('action-cell', {
      [TableGeneratorNS.CLASS_NAMES.rowActions]: true,
    })

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

    const addColumn = (colIndexToAppend: number) => (colToAppend: TableGeneratorNS.ColToAppend) => {
      let { appendTo } = colToAppend

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

    const removeColumn = (colIndex: number) => () => {
      if (!colIndex && colIndex !== 0) {
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
            pullAt(row, colIndex)
            newCellsData.push(row)
          })
          return newCellsData
        })
      }
    }

    const addRow = (rowIndexToAppend: number) => (rowToAppend: TableGeneratorNS.RowToAppend) => {
      const { appendTo } = rowToAppend

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

    const removeRow = (rowToRemove: number) => () => {
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
      <div
        {...rest}
        {...containerProps}
        className={classes}
        ref={reference}
        style={{ ...rest.style, maxWidth: rest.style?.maxWidth ?? maxWidth }}
      >
        <ScrollView
          autoHide
          {...scrollViewProps}
          maxHeight={maxHeight}
          className={scrollViewClasses}
        >
          <table cellSpacing={0} onMouseLeave={handleOnMouseLeaveTable} ref={tableRef}>
            <thead>
              <tr>
                {Array.from(Array(cellsCount.cols + 1)).map((_, colIndex) => (
                  <td className="action-cell col-action-cell" key={colIndex}>
                    {colIndex > 0 ? (
                      <div
                        className={TableGeneratorNS.CLASS_NAMES.colActions}
                        data-col-index={colIndex - 1}
                      >
                        <ColActions
                          colIndex={colIndex - 1}
                          addColumn={addColumn(colIndex - 1)}
                          removeColumn={removeColumn(colIndex - 1)}
                          sendLog={sendLog}
                          tableRef={tableRef}
                        />
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
                        <td className={rowActionCellClasses} data-row-index={rowIndex}>
                          <div className="row-actions-container">
                            <RowActions
                              rowIndex={rowIndex}
                              addRow={addRow(rowIndex)}
                              removeRow={removeRow(rowIndex)}
                              sendLog={sendLog}
                              tableRef={tableRef}
                            />
                          </div>
                        </td>
                      )}

                      <td
                        className={TableGeneratorNS.CLASS_NAMES.inputCell}
                        data-row-index={rowIndex}
                        data-col-index={colIndex}
                        onMouseOver={handleOnMouseOverInputCells({ colIndex, rowIndex })}
                      >
                        <CellInput
                          isRTL={isRTL}
                          colIndex={colIndex}
                          rowIndex={rowIndex + 1}
                          onWrite={handleOnCellInputChange({ colIndex, rowIndex })}
                          value={getCellData({ colIndex, rowIndex })}
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
  },
)
