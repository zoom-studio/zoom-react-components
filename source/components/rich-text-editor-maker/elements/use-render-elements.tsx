import React, { useCallback } from 'react'

import { type RenderElementProps } from 'slate-react'

import {
  DefaultElement,
  EmojiElement,
  FileElement,
  HashtagElement,
  HeadingElement,
  HorizontalRuleElement,
  ImageElement,
  ListItemElement,
  MentionElement,
  OrderedListElement,
  QuoteElement,
  UnorderedListElement,
  VideoElement,
  TableElement,
  TableRowElement,
  TableCellElement,
} from '.'

export const useRenderElements = () => {
  const renderElements = useCallback((props: RenderElementProps) => {
    const type = props.element.type

    switch (type) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4': {
        return <HeadingElement {...props} />
      }

      case 'quote': {
        return <QuoteElement {...props} />
      }

      case 'ordered-list': {
        return <OrderedListElement {...props} />
      }
      case 'unordered-list': {
        return <UnorderedListElement {...props} />
      }
      case 'list-item': {
        return <ListItemElement {...props} />
      }
      case 'list-item-text': {
        return <div {...props.attributes}>{props.children}</div>
      }

      case 'rule': {
        return <HorizontalRuleElement {...props} />
      }

      case 'table': {
        return <TableElement {...props} />
      }
      case 'table-row': {
        return <TableRowElement {...props} />
      }
      case 'table-cell': {
        return <TableCellElement {...props} />
      }

      case 'image': {
        return <ImageElement {...props} />
      }

      case 'video': {
        return <VideoElement {...props} />
      }

      case 'file': {
        return <FileElement {...props} />
      }

      case 'emoji': {
        return <EmojiElement {...props} />
      }

      case 'mention': {
        return <MentionElement {...props} />
      }

      case 'hashtag': {
        return <HashtagElement {...props} />
      }

      default: {
        return <DefaultElement {...props} />
      }
    }
  }, [])

  return renderElements
}
