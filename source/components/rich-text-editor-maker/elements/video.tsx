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
        <source src={element.videoInfo?.src} />
      </video>

      {children}
    </div>
  )
}
