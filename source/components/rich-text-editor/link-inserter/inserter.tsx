import React, { Dispatch, FC, FormEvent, SetStateAction } from 'react'

import { EditorState } from 'draft-js'

import { Button, Checkbox, Input, Stack } from '../..'
import { UseObjectedStateNS } from '../../../hooks'
import { createLink } from '../link-inserter'

export namespace LinkInserterNS {
  export interface Props {
    editorState: EditorState
    setEditorState: Dispatch<SetStateAction<EditorState>>
    focusEditor: () => void
    linkPlaceholder: string
    confirmText: string
    noFollowedLink: UseObjectedStateNS.ReturnType<boolean>
    blankedLink: UseObjectedStateNS.ReturnType<boolean>
    linkURL: UseObjectedStateNS.ReturnType<string>
    isValidURL: (URL: string | undefined) => boolean
  }
}

export const LinkInserter: FC<LinkInserterNS.Props> = ({
  editorState,
  setEditorState,
  focusEditor,
  linkURL,
  linkPlaceholder,
  confirmText,
  noFollowedLink,
  blankedLink,
  isValidURL,
}) => {
  const handleCreateLink = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    createLink(
      editorState,
      setEditorState,
      linkURL.val || '',
      !!noFollowedLink.val,
      !!blankedLink.val,
      focusEditor,
    )
    linkURL.set('')
  }

  return (
    <Stack spacing={10} direction="column" align="stretch">
      <form onSubmit={handleCreateLink} className="get-link-form">
        <Input value={linkURL.val} onWrite={linkURL.set} placeholder={linkPlaceholder} />
        <Button
          suffixMaterialIcon="done"
          shape="square"
          size="large"
          className="confirm-link-button"
          disabled={!isValidURL(linkURL.val)}
          htmlType="submit"
        />
      </form>

      <Stack direction="column" align="flex-start">
        <Checkbox
          label="Open link in new tab"
          onWrite={blankedLink.set}
          checked={blankedLink.val}
        />
        <Checkbox label="No follow" onWrite={noFollowedLink.set} checked={noFollowedLink.val} />
      </Stack>
    </Stack>
  )
}
