/* eslint-disable react/jsx-no-target-blank */
import React, { type FC, useState } from 'react'

import { type RichTextEditorMakerNS } from '../../../rich-text-editor-maker/types'
import { Button, Popover, Stack } from '../../../..'

export namespace LinkElementNS {
  export interface Props extends RichTextEditorMakerNS.RenderLinkInfoCallbackParams {
    openLinkPopover: () => void
  }
}

export const LinkElement: FC<LinkElementNS.Props> = ({
  children,
  url,
  noFollow,
  openInNewTab,
  handlers,
  openLinkPopover,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleOnEdit = () => {
    setIsPopoverOpen(false)
    openLinkPopover()
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      trigger="click"
      className="link-element-popover"
      onClick={evt => {
        evt.stopPropagation()
      }}
      content={
        <Stack className="link-element-popover-content">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={evt => {
              evt.stopPropagation()
            }}
            onContextMenu={evt => {
              evt.stopPropagation()
            }}
            className="link-url"
          >
            {url}
          </a>

          <Button
            className="action-button"
            prefixMaterialIcon="edit"
            shape="square"
            type="secondary"
            variant="warning"
            onClick={handleOnEdit}
          />

          <Button
            className="action-button"
            prefixMaterialIcon="link_off"
            shape="square"
            type="secondary"
            variant="error"
            onClick={handlers.removeLink}
          />
        </Stack>
      }
    >
      <a
        href={url}
        target={openInNewTab ? '_blank' : '_self'}
        rel={noFollow ? 'nofollow' : openInNewTab ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    </Popover>
  )
}
