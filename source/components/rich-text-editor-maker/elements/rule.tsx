import React, { type FC, type ReactNode } from 'react'

import { type RenderElementProps } from 'slate-react'

export namespace HorizontalRuleElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const HorizontalRuleElement: FC<HorizontalRuleElementNS.Props> = ({
  attributes,
  children,
  element,
}) => {
  return (
    <div {...attributes} contentEditable={false} className="editor-horizontal-row">
      <hr />
      {children}
    </div>
  )
}
