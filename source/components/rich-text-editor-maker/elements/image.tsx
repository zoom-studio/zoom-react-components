import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

import { Image } from '../..'

export namespace ImageElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const ImageElement: FC<ImageElementNS.Props> = ({ children, attributes, element }) => {
  return (
    <div {...attributes} contentEditable={false} className="editor-image-container">
      <Image src={element.imageInfo?.src ?? ''} alt={element.imageInfo?.alt} width="80%" />
      {children}
    </div>
  )
}
