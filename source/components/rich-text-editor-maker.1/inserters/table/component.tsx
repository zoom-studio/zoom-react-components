import React, { FC, useState } from 'react'

import { ContentState } from 'draft-js'

import { Dialog } from '../../../dialog'
import { RichTextEditorMakerNS } from '../../types'

export namespace TableComponentNS {
  export interface Props {
    entityKey: string
    contentState: ContentState
    children: string
  }
}

export const TableComponent: FC<TableComponentNS.Props> = ({
  entityKey,
  contentState,
  children,
}) => {
  const tableInfo = contentState.getEntity(entityKey).getData() as RichTextEditorMakerNS.TableInfo

  const [rows] = useState(tableInfo.rows)
  const [cols] = useState(tableInfo.cols)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const previewCols = cols >= 10 ? 10 : cols
  const previewRows = rows >= 6 ? 6 : rows

  const openDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}></Dialog>

      <div
        className="zoomrc-rich-text-editor-table-container"
        contentEditable={false}
        onClick={openDialog}
      >
        <table cellSpacing={0}>
          <thead>
            <tr>
              {Array.from(Array(previewCols)).map((_, colIndex) => (
                <th key={colIndex}>title {colIndex + 1}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from(Array(previewRows)).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from(Array(previewCols)).map((_, colIndex) => (
                  <td key={colIndex}>
                    {rowIndex + 1}:{colIndex + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <span>{children}</span>
      </div>
    </>
  )
}
