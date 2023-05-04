import { Dispatch, SetStateAction } from 'react'

import { DraftDecorator, EditorState, RichUtils } from 'draft-js'
import { UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'

export const findLinkEntities: DraftDecorator['strategy'] = (
  contentBlock,
  callback,
  contentState,
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
  }, callback)
}

export const manageLinkOnEditorStateUpdates = (
  editorState: EditorState,
  linkURL: UseObjectedStateNS.ReturnType<string>,
  noFollowedLink: UseObjectedStateNS.ReturnType<boolean>,
  blankedLink: UseObjectedStateNS.ReturnType<boolean>,
) => {
  const contentState = editorState.getCurrentContent()
  const startKey = editorState.getSelection().getStartKey()
  const startOffset = editorState.getSelection().getStartOffset()
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
  const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
  if (linkKey) {
    const linkInstance = contentState.getEntity(linkKey)
    const { url, target, rel } = linkInstance.getData()

    setTimeout(() => {
      linkURL.set(url)
      noFollowedLink.set(rel === 'nofollow')
      blankedLink.set(target === '_blank')
    }, 0)
  }
}

export const createLink = (
  editorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>,
  linkURL: string,
  noFollowedLink: boolean,
  blankedLink: boolean,
  focusEditor: () => void,
) => {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
    url: linkURL,
    rel: noFollowedLink ? 'nofollow' : undefined,
    target: blankedLink ? '_blank' : undefined,
  })
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  let nextEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

  nextEditorState = RichUtils.toggleLink(nextEditorState, nextEditorState.getSelection(), entityKey)

  setEditorState(nextEditorState)
  focusEditor()
}

export const removeLink =
  (editorState: EditorState, setEditorState: Dispatch<SetStateAction<EditorState>>) => () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null))
    }
  }

export const onCloseLinkPopover =
  (
    linkURL: UseObjectedStateNS.ReturnType<string>,
    noFollowedLink: UseObjectedStateNS.ReturnType<boolean>,
    blankedLink: UseObjectedStateNS.ReturnType<boolean>,
  ) =>
  () => {
    linkURL.set('')
    noFollowedLink.set(false)
    blankedLink.set(false)
  }

export const URLRegEx = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i',
)

export const isValidURL = (linkURL: string | undefined): boolean => {
  return URLRegEx.test(linkURL || '')
}
