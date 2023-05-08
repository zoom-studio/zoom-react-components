import React, { useCallback } from 'react'

import { RenderElementProps } from 'slate-react'

import {
  DefaultElement,
  EmojiElement,
  FileElement,
  HeadingElement,
  HorizontalRuleElement,
  ImageElement,
  ListItemElement,
  MentionElement,
  OrderedListElement,
  QuoteElement,
  TableElement,
  UnorderedListElement,
  VideoElement,
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

      case 'rule': {
        return <HorizontalRuleElement {...props} />
      }

      case 'table': {
        return <TableElement {...props} />
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

      default: {
        return <DefaultElement {...props} />
      }
    }
  }, [])

  return renderElements
}
