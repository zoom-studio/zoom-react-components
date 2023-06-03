import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps } from 'slate-react'

import { File, type FileNS } from '../..'
import { useEditorContext } from '../utils'

export namespace FileElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const FileElement: FC<FileElementNS.Props> = ({ children, attributes, element }) => {
  const { fileInfo } = element
  const { readonly } = useEditorContext()

  const renderFile = (props?: Partial<FileNS.Props>): JSX.Element => {
    if (!fileInfo) {
      return <></>
    }

    return (
      <File
        url={fileInfo.src}
        fileName={fileInfo.name}
        fileSize={fileInfo.size}
        fileType={fileInfo.type}
        {...props}
      />
    )
  }

  return (
    <div {...attributes} contentEditable={false} className="editor-file-container">
      {fileInfo && <>{readonly ? renderFile({ linked: { openOnNewTab: true } }) : renderFile()}</>}
      {children}
    </div>
  )
}
