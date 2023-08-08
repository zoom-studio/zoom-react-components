import { useState } from 'react'

import { hashtagRegEx as hashtagRegularExpression, useVariable } from '@zoom-studio/js-ts-utils'
import { type BaseRange, Range } from 'slate'

import { type RichTextEditorMakerProviderNS } from '../provider'
import { type RichTextEditorMakerNS } from '../types'
import { EditorCurrentWord } from '.'

export namespace UseHashtagNS {
  export interface Params extends Pick<RichTextEditorMakerProviderNS.Props, 'enableHashtag'> {
    editor: RichTextEditorMakerNS.Editor
  }
}

export const useHashtag = ({ editor, enableHashtag }: UseHashtagNS.Params) => {
  const [hashtagTarget, setHashtagTarget] = useState<BaseRange>()
  const [hashtagQuery, setHashtagQuery] = useState('')
  const [selectedHashtagIndex, setSelectedHashtagIndex] = useState(0)
  const currentWord = new EditorCurrentWord({ editor })

  const hashtagRegEx = enableHashtag?.hashtagRegex ?? hashtagRegularExpression

  const manageHashtagOnChange = () => {
    if (!enableHashtag) {
      return null
    }

    const { selection } = editor
    if (!selection || !Range.isCollapsed(selection)) {
      return null
    }

    const beforeCursor = currentWord.getCurrentWord()
    const beforeText = beforeCursor?.currentWord
    const beforeRange = beforeCursor?.currentRange
    const hashtag = beforeText?.[0] === '#' ? beforeText?.slice(1) : ''
    const beforeMatch = hashtagRegEx.test('#'.concat(hashtag))

    if (beforeMatch) {
      setHashtagTarget(beforeRange)
      setHashtagQuery(hashtag)
      setSelectedHashtagIndex(0)
    } else {
      setHashtagTarget(undefined)
      setHashtagQuery('')
    }
  }

  const foundHashtags = useVariable<string[]>(() => {
    if (!enableHashtag || !hashtagQuery) {
      return []
    }
    const hashtags = enableHashtag.hashtags.filter(hashtag =>
      hashtag.toLowerCase().includes(hashtagQuery.toLowerCase()),
    )
    if (enableHashtag.restrictResult) {
      return hashtags.slice(0, enableHashtag.restrictResult)
    }
    return hashtags
  })

  const shouldRenderList = !!enableHashtag && !!hashtagTarget && foundHashtags.length > 0

  return {
    manageHashtagOnChange,
    setHashtagTarget,
    hashtagQuery,
    selectedHashtagIndex,
    foundHashtags,
    shouldRenderList,
    hashtagTarget,
  }
}
