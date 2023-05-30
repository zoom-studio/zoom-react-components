import React, { useCallback } from 'react'

import { type RenderLeafProps } from 'slate-react'

import { LeafElement } from '.'
import { type RichTextEditorMakerNS } from '../../types'

export namespace UseRenderLeafNS {
  export interface Params extends Pick<RichTextEditorMakerNS.Props, 'renderLinkElement'> {
    handlers: RichTextEditorMakerNS.ChildrenCallback
  }
}

export const useRenderLeaf = (params: UseRenderLeafNS.Params) => {
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <LeafElement {...props} {...params} />
  }, [])

  return renderLeaf
}
