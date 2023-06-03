import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps } from 'slate-react'

import { Image } from '../..'
import { useEditorContext } from '../utils'

export namespace ImageElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const ImageElement: FC<ImageElementNS.Props> = ({ children, attributes, element }) => {
  const { readonly } = useEditorContext()

  return (
    <div {...attributes} contentEditable={false} className="editor-image-container">
      <Image
        withImageViewer={readonly}
        src={element.imageInfo?.src ?? ''}
        alt={element.imageInfo?.alt}
        width="80%"
      />
      {children}
    </div>
  )
}
