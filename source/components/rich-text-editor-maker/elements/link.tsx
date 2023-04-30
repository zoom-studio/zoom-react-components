/* eslint-disable react/jsx-no-target-blank */
import React, { FC, ReactNode } from 'react'

import { RichTextEditorMakerNS } from '../types'

export namespace LinkElementNS {
  export interface Props extends RichTextEditorMakerNS.LinkInfo {
    children: ReactNode
  }
}

export const LinkElement: FC<LinkElementNS.Props> = ({ url, noFollow, openInNewTab, children }) => {
  return (
    <a
      href={url}
      target={openInNewTab ? '_blank' : '_self'}
      rel={noFollow ? 'nofollow' : openInNewTab ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  )
}
