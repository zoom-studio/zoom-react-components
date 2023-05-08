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
  const { mention, enableMention } = useEditorContext()
  const handlers = combineHandlers()

  const handleAccelerators = useCallback(
    (evt: KeyboardEvent<HTMLDivElement>) => {
      const { key, ctrlKey } = evt
      const isSwitchingMentionsList =
        !!enableMention && mention.mentionQuery?.length > 0 && mention.foundUsernames.length > 0

      switch (key) {
        case 'b': {
          if (!ctrlKey) break

          evt.preventDefault()
          richUtils.toggleBold()
          break
        }

        case 'ArrowDown': {
          if (isSwitchingMentionsList && enableMention?.onArrowDown) {
            evt.preventDefault()
            enableMention?.onArrowDown({ evt, mention, handlers })
          }
          break
        }

        case 'ArrowUp': {
          if (isSwitchingMentionsList && enableMention?.onArrowUp) {
            evt.preventDefault()
            enableMention?.onArrowUp({ evt, mention, handlers })
          }
          break
        }

        case 'Tab': {
          if (isSwitchingMentionsList && enableMention?.onTab) {
            evt.preventDefault()
            enableMention?.onTab({ evt, mention, handlers })
          }
          break
        }

        case 'Enter': {
          if (isSwitchingMentionsList && enableMention?.onEnter) {
            evt.preventDefault()
            enableMention?.onEnter({ evt, mention, handlers })
          }
          break
        }

        case 'Escape': {
          if (isSwitchingMentionsList && enableMention?.onEscape) {
            evt.preventDefault()
            enableMention?.onEscape({ evt, mention, handlers })
          }
          break
        }
      }
    },
    [mention],
  )

  return handleAccelerators
}
