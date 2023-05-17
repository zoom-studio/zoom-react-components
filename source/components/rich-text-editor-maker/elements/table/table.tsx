import React, { FC } from 'react'

import { useVariable } from '@zoom-studio/zoom-js-ts-utils'

import { ScrollView } from '../../..'
import { useZoomComponent } from '../../../../hooks'

import { ColActions } from './col-actions'
import { TableElementNS } from './types'

export const TableElement: FC<TableElementNS.Props> = ({ children, attributes, element }) => {
  const { sendLog } = useZoomComponent('rich-text-editor-table-element')

  const { tableInfo, id } = element

  const { cols } = useVariable(() => {
    if (!tableInfo) {
      return { cols: 10, rows: 10 }
    }

    if ('rows' in tableInfo) {
      return tableInfo
    }

    return {
      rows: tableInfo.length,
      cols: Math.max(...tableInfo.map((_, rowIndex) => tableInfo[rowIndex].length)),
    }
  })

  const addColumn = (colIndexToAppend: number) => (side: TableElementNS.HorizontalSide) => {
    // let { appendTo } = colToAppend
    // if (isRTL) {
    //   appendTo = appendTo === 'left' ? 'right' : 'left'
    // }
    // if (appendTo === 'right') {
    //   colIndexToAppend++
    // }
    // setCellsData(cellsData => {
    //   const newCellsData: TableGeneratorNS.CellsData = []
    //   cellsData.forEach(row => {
    //     const newRow: TableGeneratorNS.DataType[] = []
    //     if (colIndexToAppend === cellsCount.cols && appendTo === 'right') {
    //       newRow.push(...row, '')
    //     } else {
    //       row.forEach((col, colIndex) => {
    //         if (colIndex === colIndexToAppend) {
    //           newRow.push('')
    //         }
    //         newRow.push(col)
    //       })
    //     }
    //     newCellsData.push(newRow)
    //   })
    //   return newCellsData
    // })
  }

  const removeColumn = (colIndex: number) => () => {}

  return (
    <div {...attributes} className="editor-table-container">
      <ScrollView maxHeight="unset" maxWidth="90%" minWidth="90%">
        <table cellSpacing={0} id={id}>
          <thead contentEditable={false}>
            <tr>
              {Array.from(Array(cols + 1)).map((_, colIndex) => (
                <td className="action-cell col-action-cell" key={colIndex}>
                  {colIndex > 0 ? (
                    <div
                      className={TableElementNS.CLASS_NAMES.colActions}
                      data-col-index={colIndex - 1}
                    >
                      <ColActions
                        colIndex={colIndex - 1}
                        addColumn={addColumn(colIndex - 1)}
                        removeColumn={removeColumn(colIndex - 1)}
                        sendLog={sendLog}
                        tableID={id!}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </ScrollView>
    </div>
  )
}
