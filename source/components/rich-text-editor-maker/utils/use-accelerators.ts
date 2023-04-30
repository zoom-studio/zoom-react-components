import { KeyboardEvent, useCallback } from 'react'

import { RichTextEditorMakerNS } from '../types'
import { RichUtils } from './rich-utils'

export namespace UseAcceleratorsNS {
  export interface Params {
    editor: RichTextEditorMakerNS.Editor
    richUtils: RichUtils
  }
}

export const useAccelerators = ({ editor, richUtils }: UseAcceleratorsNS.Params) => {
  const handleAccelerators = useCallback((evt: KeyboardEvent<HTMLDivElement>) => {
    const { key, ctrlKey } = evt

    if (!ctrlKey) {
      return
    }

    switch (key) {
      case 'b': {
        evt.preventDefault()
        richUtils.toggleBold()
        break
      }
    }
  }, [])

  return handleAccelerators
}
