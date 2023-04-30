import React, { Dispatch, FC, FormEvent, SetStateAction } from 'react'

import { RichTextEditorNS } from '../..'
import { Button, Checkbox, Input, Stack } from '../../..'
import { RichTextEditorMakerNS } from '../../../rich-text-editor-maker.1'

export namespace LinkInserterPopoverNS {
  export interface Props {
    isValidURL: (URL: string | undefined) => boolean
    i18n: Required<RichTextEditorNS.I18n>
    setIsBlankedLink: Dispatch<SetStateAction<boolean | undefined>>
    setIsNoFollowLink: Dispatch<SetStateAction<boolean | undefined>>
    setLinkURL: Dispatch<SetStateAction<string | undefined>>
    selectionLink: Required<RichTextEditorMakerNS.LinkInfo>
    createLink: RichTextEditorMakerNS.ChildrenCallback['insertLink']
    resetLinkInfo: () => void
    closePopover: () => void
    focusEditor: () => void
  }
}

export const LinkInserterPopover: FC<LinkInserterPopoverNS.Props> = ({
  isValidURL,
  i18n,
  selectionLink,
  setIsBlankedLink,
  setIsNoFollowLink,
  setLinkURL,
  createLink,
  resetLinkInfo,
  closePopover,
  focusEditor,
}) => {
  const { linkURLPlaceholder, linkNoFollowLabel, linkTargetLabel } = i18n

  const handleCreateLink = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    createLink({
      url: selectionLink.url,
      noFollow: selectionLink.noFollow,
      openInNewTab: selectionLink.openInNewTab,
    })
    resetLinkInfo()
    closePopover()
    focusEditor()
  }

  return (
    <Stack spacing={10} direction="column" align="stretch">
      <form onSubmit={handleCreateLink} className="get-link-form">
        <Input value={selectionLink.url} onWrite={setLinkURL} placeholder={linkURLPlaceholder} />
        <Button
          suffixMaterialIcon="done"
          shape="square"
          size="large"
          className="confirm-link-button"
          disabled={!isValidURL(selectionLink.url)}
          htmlType="submit"
        />
      </form>

      <Stack direction="column" align="flex-start">
        <Checkbox
          label={linkTargetLabel}
          onWrite={setIsBlankedLink}
          checked={selectionLink.openInNewTab}
        />
        <Checkbox
          label={linkNoFollowLabel}
          onWrite={setIsNoFollowLink}
          checked={selectionLink.noFollow}
        />
      </Stack>
    </Stack>
  )
}
