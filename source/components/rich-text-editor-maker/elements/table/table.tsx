import React, { FC } from 'react'

import { Button, ScrollView } from '../../..'

import { RichUtils, useEditorContext } from '../../utils'
import { ColActions } from './col-actions'
import { TableElementNS } from './types'
import { useTableDOM } from './use-dom'
import { classNames } from '@zoom-studio/zoom-js-ts-utils'

export const TableElement: FC<TableElementNS.Props> = ({ children, attributes, element }) => {
  const { editor } = useEditorContext()

  const richUtils = new RichUtils({ editor })
  const { tableInfo, id, tableStyle } = element

  const tableDOM = useTableDOM(id!)

  const addColumn = (colIndexToAppend: number) => (side: TableElementNS.HorizontalSide) => {
    richUtils.insertTableColumn(colIndexToAppend, side, id!)
  }

  const removeColumn = (colIndex: number) => () => {
    richUtils.removeTableColumn(colIndex, id!)
  }

  const handleOnMouseLeaveTable = () => {
    tableDOM.deactiveCurrentActiveColActions()
    tableDOM.deactiveCurrentActiveRowActions()
  }

  const classes = classNames('editor-table-container', {
    [tableStyle ?? 'normal']: true,
  })

  return (
    <div {...attributes} className={classes}>
      <Button
        containerProps={{ contentEditable: false }}
        type="bordered"
        prefixMaterialIcon="palette"
        shape="circle"
        size="large"
        className="change-style-button"
        onClick={richUtils.changeTableStyle(id!)}
      />

      <Button
        containerProps={{ contentEditable: false }}
        variant="error"
        type="bordered"
        prefixMaterialIcon="delete"
        shape="circle"
        size="large"
        className="delete-table-button"
        onClick={richUtils.deleteTable(id!)}
      />

      <ScrollView maxHeight="unset" maxWidth="70vw" minWidth="90%" className="table-scroll-view">
        <table cellSpacing={0} id={id} onMouseLeave={handleOnMouseLeaveTable}>
          <thead contentEditable={false}>
            <tr>
              {Array.from(Array(tableInfo!.cols + 1)).map((_, colIndex) => (
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
                        tableID={id!}
                        tableInfo={tableInfo!}
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
