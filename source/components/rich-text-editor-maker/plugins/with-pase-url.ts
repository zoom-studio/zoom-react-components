import { URLRegEx } from '@zoom-studio/zoom-js-ts-utils'

import { RichTextEditorMakerNS } from '../types'
import { RichUtils } from '../utils'

export const withPasteURL = (editor: RichTextEditorMakerNS.Editor) => {
  const { insertData } = editor

  editor.insertData = data => {
    const plainURL = data.getData('text/plain')
    const richUtils = new RichUtils({ editor })

    if (plainURL && URLRegEx.test(plainURL)) {
      richUtils.insertLink({ url: plainURL })
    }

    insertData(data)
  }

  return editor
}
