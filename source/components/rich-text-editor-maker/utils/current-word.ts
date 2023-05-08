import { cloneDeep } from 'lodash'

import { BasePoint, Editor, Range as SlateRange } from 'slate'

import { RichTextEditorMakerNS } from '../types'
import { RichUtilsNS } from './rich-utils'

export namespace EditorCurrentWordNS {
  export interface Params {
    editor: RichTextEditorMakerNS.Editor
  }
}

export class EditorCurrentWord {
  editor!: RichTextEditorMakerNS.Editor
  wordRegExp = /(\S+)/g

  constructor({ editor }: EditorCurrentWordNS.Params) {
    this.editor = editor
  }

  private readonly getLeftChar = (point: BasePoint): string => {
    const end = SlateRange.end(this.editor.selection as SlateRange)
    return Editor.string(this.editor, {
      anchor: {
        path: end.path,
        offset: point.offset - 1,
      },
      focus: {
        path: end.path,
        offset: point.offset,
      },
    })
  }

  private readonly getRightChar = (point: BasePoint): string => {
    const end = SlateRange.end(this.editor.selection as SlateRange)
    return Editor.string(this.editor, {
      anchor: {
        path: end.path,
        offset: point.offset,
      },
      focus: {
        path: end.path,
        offset: point.offset + 1,
      },
    })
  }

  readonly getCurrentWord = (): RichUtilsNS.GetCurrentWordReturnType | null => {
    const { selection } = this.editor

    if (!selection) {
      return null
    }

    const end = SlateRange.end(selection)
    let currentWord = ''
    const currentPosition = cloneDeep(end)
    let startOffset = end.offset
    let endOffset = end.offset

    while (
      currentPosition.offset >= 0 &&
      this.getLeftChar(currentPosition).match(this.wordRegExp)
    ) {
      currentWord = this.getLeftChar(currentPosition) + currentWord
      startOffset = currentPosition.offset - 1
      currentPosition.offset--
    }

    currentPosition.offset = end.offset
    while (currentWord.length && this.getRightChar(currentPosition).match(this.wordRegExp)) {
      currentWord += this.getRightChar(currentPosition)
      endOffset = currentPosition.offset + 1
      currentPosition.offset++
    }

    const currentRange: SlateRange = {
      anchor: {
        path: end.path,
        offset: startOffset,
      },
      focus: {
        path: end.path,
        offset: endOffset,
      },
    }

    return {
      currentWord,
      currentRange,
    }
  }
}
