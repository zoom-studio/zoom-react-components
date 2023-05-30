import { type KeyboardEvent, useCallback } from 'react'

import { type RichTextEditorMakerNS } from '../types'

import { Element, Node, Path } from 'slate'
import { type RichUtils, useEditorContext } from '.'

export namespace UseAcceleratorsNS {
  export interface Params extends Pick<RichTextEditorMakerNS.Props, 'collapseOnEscape'> {
    editor: RichTextEditorMakerNS.Editor
    richUtils: RichUtils
    combineHandlers: () => RichTextEditorMakerNS.ChildrenCallback
  }
}

export const useAccelerators = ({
  editor,
  richUtils,
  combineHandlers,
  collapseOnEscape,
}: UseAcceleratorsNS.Params) => {
  const { mention, enableMention, enableHashtag, hashtag } = useEditorContext()
  const handlers = combineHandlers()

  const handleAccelerators = useCallback(
    (evt: KeyboardEvent<HTMLDivElement>) => {
      const { ctrlKey, altKey, code } = evt

      const isSwitchingMentionsList =
        !!enableMention && mention.mentionQuery?.length > 0 && mention.foundUsernames.length > 0

      const isSwitchingHashtagsList =
        !!enableHashtag && hashtag.hashtagQuery?.length > 0 && hashtag.foundHashtags.length > 0

      switch (code) {
        case 'Digit1':
        case 'Numpad1': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHeading(1)()
          break
        }

        case 'Digit2':
        case 'Numpad2': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHeading(2)()
          break
        }

        case 'Digit3':
        case 'Numpad3': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHeading(3)()
          break
        }

        case 'Digit4':
        case 'Numpad4': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHeading(4)()
          break
        }

        case 'KeyB': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleBold()
          break
        }

        case 'KeyI': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleItalic()
          break
        }

        case 'KeyU': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleUnderline()
          break
        }

        case 'KeyS': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleStrikethrough()
          break
        }

        case 'KeyQ': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleQuote()
          break
        }

        case 'KeyH': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHighlight()
          break
        }

        case 'KeyL': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleList(altKey ? 'unordered-list' : 'ordered-list')()
          break
        }

        case 'ArrowDown': {
          if (isSwitchingMentionsList && enableMention?.onArrowDown) {
            evt.preventDefault()
            enableMention?.onArrowDown({ evt, mention, handlers })
          }

          if (isSwitchingHashtagsList && enableHashtag?.onArrowDown) {
            evt.preventDefault()
            enableHashtag?.onArrowDown({ evt, hashtag, handlers })
          }
          break
        }

        case 'ArrowUp': {
          if (isSwitchingMentionsList && enableMention?.onArrowUp) {
            evt.preventDefault()
            enableMention?.onArrowUp({ evt, mention, handlers })
          }

          if (isSwitchingHashtagsList && enableHashtag?.onArrowUp) {
            evt.preventDefault()
            enableHashtag?.onArrowUp({ evt, hashtag, handlers })
          }
          break
        }

        case 'Tab': {
          if (isSwitchingMentionsList && enableMention?.onTab) {
            evt.preventDefault()
            enableMention?.onTab({ evt, mention, handlers })
          }

          if (isSwitchingHashtagsList && enableHashtag?.onTab) {
            evt.preventDefault()
            enableHashtag?.onTab({ evt, hashtag, handlers })
          }
          break
        }

        case 'Enter':
        case 'NumpadEnter': {
          const { selection } = editor
          if (selection) {
            const selectedParentNode = Node.get(editor, Path.parent(selection.anchor.path))

            if (Element.isElement(selectedParentNode) && selectedParentNode.type === 'emoji') {
              evt.preventDefault()
              richUtils.insertParagraph()
              editor.deleteForward('line')
              editor.setNodes({ type: 'paragraph' })
            }
          }

          if (isSwitchingMentionsList && enableMention?.onEnter) {
            evt.preventDefault()
            enableMention?.onEnter({ evt, mention, handlers })
          }

          if (isSwitchingHashtagsList && enableHashtag?.onEnter) {
            evt.preventDefault()
            enableHashtag?.onEnter({ evt, hashtag, handlers })
          }
          break
        }

        case 'Escape': {
          if (isSwitchingMentionsList && enableMention?.onEscape) {
            evt.preventDefault()
            enableMention?.onEscape({ evt, mention, handlers })
          }

          if (isSwitchingHashtagsList && enableHashtag?.onEscape) {
            evt.preventDefault()
            enableHashtag?.onEscape({ evt, hashtag, handlers })
          }

          if (collapseOnEscape) {
            evt.preventDefault()
            richUtils.collapseSelection()
          }
          break
        }
      }
    },
    [mention, hashtag],
  )

  return handleAccelerators
}
