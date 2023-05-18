import React, { FC } from 'react'

import { ScrollView } from '../../..'
import { useZoomComponent } from '../../../../hooks'

import { ColActions } from './col-actions'
import { TableElementNS } from './types'
import { RichUtils, useEditorContext } from '../../utils'

export const TableElement: FC<TableElementNS.Props> = ({ children, attributes, element }) => {
  const { sendLog } = useZoomComponent('rich-text-editor-table-element')
  const { editor } = useEditorContext()

  const richUtils = new RichUtils({ editor })

  const { tableInfo, id } = element

  const addColumn = (colIndexToAppend: number) => (side: TableElementNS.HorizontalSide) => {
    richUtils.insertTableColumn(colIndexToAppend, side, id!)
  }

  const removeColumn = (colIndex: number) => () => {}

  return (
    <div {...attributes} className="editor-table-container">
      <ScrollView maxHeight="unset" maxWidth="90%" minWidth="90%">
        <table cellSpacing={0} id={id}>
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
