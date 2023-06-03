import React, { forwardRef, useCallback, useEffect } from 'react'

import { useObjectedState, useVariable } from '@zoom-studio/zoom-js-ts-utils'
import { Editable, useSlate } from 'slate-react'

import { useZoomComponent } from '../../hooks'

import { useRenderElements, useRenderLeaf } from './elements'
import { RichTextEditorMakerProvider } from './provider'
import { type RichTextEditorMakerNS } from './types'
import { LinkUtils, RichUtils, useAccelerators, useEditorContext } from './utils'
import { type NodeEntry, type Range, Text } from 'slate'

type CB = RichTextEditorMakerNS.ChildrenCallback

export const RichTextEditorMaker = forwardRef<HTMLDivElement, RichTextEditorMakerNS.Props>(
  ({
    collapseOnEscape = true,
    searchQuery = '',
    children,
    placeholder,
    renderLinkElement,
    className,
    containerProps,
    onClick,
    style,
  }) => {
    const { createClassName } = useZoomComponent('rich-text-editor-maker')
    const editorContext = useEditorContext()

    const decorate = useCallback(
      ([node, path]: NodeEntry) => {
        const ranges: Range[] = []

        if (searchQuery && Text.isText(node)) {
          const { text } = node
          const parts = text.split(searchQuery)
          let offset = 0

          parts.forEach((part, i) => {
            if (i !== 0) {
              ranges.push({
                anchor: { path, offset: offset - searchQuery.length },
                focus: { path, offset },
                found: true,
              })
            }

            offset = offset + part.length + searchQuery.length
          })
        }

        return ranges
      },
      [searchQuery],
    )

    const editor = useSlate()

    const noFollowedLink = useObjectedState(false)
    const blankedLink = useObjectedState(false)
    const linkURL = useObjectedState('google.com')

    const richUtils = new RichUtils({ editor, editorContext })
    const linkUtils = new LinkUtils({ blankedLink, linkURL, noFollowedLink, richUtils, editor })
    const renderElements = useRenderElements()

    const selectionLink = useVariable<CB['selectionLink']>(() => ({
      url: linkURL.val ?? '',
      noFollow: noFollowedLink.val ?? false,
      openInNewTab: blankedLink.val ?? false,
    }))

    const renderEditor: CB['renderEditor'] = () => {
      return (
        <Editable
          {...containerProps}
          readOnly={editorContext.readonly}
          onClick={onClick}
          style={style}
          id={editorContext.id}
          className={classes}
          placeholder={placeholder}
          renderElement={renderElements}
          decorate={decorate}
          renderLeaf={renderLeaf}
          onKeyDown={evt => {
            editorContext.handleListsOnKeyDown(evt)
            handleAccelerators(evt)
          }}
        />
      )
    }

    const combineHandlers = (): CB => ({
      ...richUtils,
      ...linkUtils,
      renderEditor,
      selectionLink,
      setIsBlankedLink: blankedLink.set,
      setIsNoFollowLink: noFollowedLink.set,
      setLinkURL: linkURL.set,
      undo: editorContext.undo,
      redo: editorContext.redo,
    })

    const handleAccelerators = useAccelerators({
      editor,
      richUtils,
      combineHandlers,
      collapseOnEscape,
    })

    const renderLeaf = useRenderLeaf({ renderLinkElement, handlers: combineHandlers() })

    const classes = createClassName(className, '', {
      'rich-text-editable': true,
    })

    useEffect(() => {
      const linkInfo = richUtils.getLinkInfo()

      if (linkInfo) {
        linkUtils.setLinkInfo(linkInfo)
      } else {
        linkUtils.resetLinkInfo()
      }
    }, [editor.selection])

    return <>{typeof children === 'function' ? children(combineHandlers()) : children}</>
  },
) as RichTextEditorMakerNS.ComponentType

RichTextEditorMaker.provider = RichTextEditorMakerProvider
export { RichTextEditorMakerNS } from './types'
