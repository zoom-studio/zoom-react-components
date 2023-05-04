import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

import { File } from '../..'

export namespace FileElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const FileElement: FC<FileElementNS.Props> = ({ children, attributes, element }) => {
  const { fileInfo } = element

  return (
    <div {...attributes} contentEditable={false} className="editor-file-container">
      {fileInfo && (
        <File
          url={fileInfo.src}
          fileName={fileInfo.name}
          fileSize={fileInfo.size}
          fileType={fileInfo.type}
        />
      )}

      {children}
    </div>
  )
}
