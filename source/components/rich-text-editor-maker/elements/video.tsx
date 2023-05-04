import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

export namespace VideoElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const VideoElement: FC<VideoElementNS.Props> = ({ children, attributes, element }) => {
  return (
    <div {...attributes} contentEditable={false} className="editor-video-container">
      <video width="80%" controls className="video-player">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
      </video>

      {children}
    </div>
  )
}
