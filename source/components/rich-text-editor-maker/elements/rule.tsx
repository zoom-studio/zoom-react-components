import React, { FC, ReactNode } from 'react'

import { RenderElementProps } from 'slate-react'

export namespace HorizontalRuleElementNS {
  export interface Props extends RenderElementProps {
    children: ReactNode
  }
}

export const HorizontalRuleElement: FC<HorizontalRuleElementNS.Props> = ({ attributes }) => {
  return <hr {...attributes} />
}
