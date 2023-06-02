import React, { type FC, type ReactNode } from 'react'

import { type RenderLeafProps } from 'slate-react'

import { LinkElement, type UseRenderLeafNS } from '..'

export namespace LeafElementNS {
  export interface Props extends RenderLeafProps, UseRenderLeafNS.Params {
    children: ReactNode
  }
}

export const LeafElement: FC<LeafElementNS.Props> = ({
  attributes,
  children,
  leaf,
  text,
  renderLinkElement,
  handlers,
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  if (leaf.highlight) {
    children = <mark>{children}</mark>
  }

  if (leaf.link && leaf.linkInfo) {
    children = renderLinkElement ? (
      renderLinkElement({ children, ...leaf.linkInfo, handlers })
    ) : (
      <LinkElement {...leaf.linkInfo}>{children}</LinkElement>
    )
  }

  if (leaf.found) {
    children = <address>{children}</address>
  }

  return <span {...attributes}>{children}</span>
}
