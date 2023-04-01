import React, { FC } from 'react'

import { ContentState } from 'draft-js'

export namespace LinkComponentNS {
  export interface Props {
    entityKey: string
    contentState: ContentState
    children: string
  }
}

export const LinkComponent: FC<LinkComponentNS.Props> = ({ entityKey, contentState, children }) => {
  const { url, target, rel } = contentState.getEntity(entityKey).getData()

  return (
    <a href={url} target={target} rel={rel}>
      {children}
    </a>
  )
}
