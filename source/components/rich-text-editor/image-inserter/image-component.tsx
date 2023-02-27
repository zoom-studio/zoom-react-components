import React, { FC } from 'react'

import { ContentState } from 'draft-js'

export namespace ImageComponentNS {
  export interface Props {
    entityKey: string
    contentState: ContentState
    children: string
  }
}

export const ImageComponent: FC<ImageComponentNS.Props> = ({
  children,
  contentState,
  entityKey,
}) => {
  return <></>
}
