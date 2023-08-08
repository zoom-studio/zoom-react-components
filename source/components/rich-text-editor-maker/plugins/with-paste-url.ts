import { URLRegEx } from '@zoom-studio/js-ts-utils'

import { type RichTextEditorMakerNS } from '../types'
import { RichUtils } from '../utils'

export const withPasteURL = (editor: RichTextEditorMakerNS.Editor) => {
  const { insertData } = editor

  editor.insertData = data => {
    const plainURL = data.getData('text/plain')
    const richUtils = new RichUtils({ editor })

    if (plainURL && URLRegEx.test(plainURL)) {
      if (richUtils.isRangeSelected()) {
        richUtils.insertLink({ url: plainURL })
        return
      }
      richUtils.insertLink({ url: plainURL })
    }

    insertData(data)
  }

  return editor
}
