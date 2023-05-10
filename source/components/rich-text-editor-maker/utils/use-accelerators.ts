import { KeyboardEvent, useCallback } from 'react'

import { RichTextEditorMakerNS } from '../types'

import { RichUtils, useEditorContext } from '.'

export namespace UseAcceleratorsNS {
  export interface Params {
    editor: RichTextEditorMakerNS.Editor
    richUtils: RichUtils
    combineHandlers: () => RichTextEditorMakerNS.ChildrenCallback
  }
}

export const useAccelerators = ({
  editor,
  richUtils,
  combineHandlers,
}: UseAcceleratorsNS.Params) => {
  const { mention, enableMention, enableHashtag, hashtag } = useEditorContext()
  const handlers = combineHandlers()

  const handleAccelerators = useCallback(
    (evt: KeyboardEvent<HTMLDivElement>) => {
      const { key, ctrlKey, altKey } = evt

      const isSwitchingMentionsList =
        !!enableMention && mention.mentionQuery?.length > 0 && mention.foundUsernames.length > 0

      const isSwitchingHashtagsList =
        !!enableHashtag && hashtag.hashtagQuery?.length > 0 && hashtag.foundHashtags.length > 0

      switch (key) {
        case '1': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHeading(1)()
          break
        }

        case '2': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHeading(2)()
          break
        }

        case '3': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHeading(3)()
          break
        }

        case '4': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHeading(4)()
          break
        }

        case 'b': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleBold()
          break
        }

        case 'i': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleItalic()
          break
        }

        case 'u': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleUnderline()
          break
        }

        case 's': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleStrikethrough()
          break
        }

        case 'q': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleQuote()
          break
        }

        case 'h': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleHighlight()
          break
        }

        case 'l': {
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

        case 'Enter': {
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
          break
        }
      }
    },
    [mention, hashtag],
  )

  return handleAccelerators
}
