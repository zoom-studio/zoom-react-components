import { useState } from 'react'

import {
  useVariable,
  usernameRegEx as usernameRegularExpression,
} from '@zoom-studio/zoom-js-ts-utils'
import { type BaseRange, Range } from 'slate'

import { type RichTextEditorMakerProviderNS } from '../provider'
import { type RichTextEditorMakerNS } from '../types'
import { EditorCurrentWord } from '.'

export namespace UseMentionNS {
  export interface Params extends Pick<RichTextEditorMakerProviderNS.Props, 'enableMention'> {
    editor: RichTextEditorMakerNS.Editor
  }
}

export const useMention = ({ editor, enableMention }: UseMentionNS.Params) => {
  const [mentionTarget, setMentionTarget] = useState<BaseRange>()
  const [mentionQuery, setMentionQuery] = useState('')
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0)
  const currentWord = new EditorCurrentWord({ editor })

  const usernameRegEx = enableMention?.usernameRegex ?? usernameRegularExpression

  const manageMentionOnChange = () => {
    if (!enableMention) {
      return null
    }

    const { selection } = editor
    if (!selection || !Range.isCollapsed(selection)) {
      return null
    }

    const beforeCursor = currentWord.getCurrentWord()
    const beforeText = beforeCursor?.currentWord
    const beforeRange = beforeCursor?.currentRange
    const mention = beforeText?.[0] === '@' ? beforeText?.slice(1) : ''
    const beforeMatch = usernameRegEx.test(mention)

    if (beforeMatch) {
      setMentionTarget(beforeRange)
      setMentionQuery(mention)
      setSelectedMentionIndex(0)
    } else {
      setMentionTarget(undefined)
      setMentionQuery('')
    }
  }

  const foundUsernames = useVariable<string[]>(() => {
    if (!enableMention || !mentionQuery) {
      return []
    }
    const usernames = enableMention.usernames.filter(username =>
      username.toLowerCase().includes(mentionQuery.toLowerCase()),
    )
    if (enableMention.restrictResult) {
      return usernames.slice(0, enableMention.restrictResult)
    }
    return usernames
  })

  const shouldRenderList = !!enableMention && !!mentionTarget && foundUsernames.length > 0

  return {
    manageMentionOnChange,
    setMentionTarget,
    mentionQuery,
    selectedMentionIndex,
    foundUsernames,
    shouldRenderList,
    mentionTarget,
  }
}
