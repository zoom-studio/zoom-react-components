import React, { forwardRef, useEffect } from 'react'

import { useObjectedState, useVariable } from '@zoom-studio/zoom-js-ts-utils'
import { Editable, useSlate } from 'slate-react'

import { useZoomComponent } from '../../hooks'

import { useRenderElements, useRenderLeaf } from './elements'
import { RichTextEditorMakerProvider } from './provider'
import { RichTextEditorMakerNS } from './types'
import { RichUtils, useAccelerators, useEditorContext } from './utils'

type CB = RichTextEditorMakerNS.ChildrenCallback

export const RichTextEditorMaker = forwardRef<HTMLDivElement, RichTextEditorMakerNS.Props>(
  ({ children, placeholder, renderLinkElement, className, id }, reference) => {
    const { createClassName } = useZoomComponent('rich-text-editor-maker')
    const editorContext = useEditorContext()

    const editor = useSlate()

    const noFollowedLink = useObjectedState(false)
    const blankedLink = useObjectedState(false)
    const linkURL = useObjectedState('google.com')

    const richUtils = new RichUtils({ editor, blankedLink, linkURL, noFollowedLink, editorContext })
    const renderElements = useRenderElements()

    const selectionLink = useVariable<CB['selectionLink']>(() => ({
      url: linkURL.val ?? '',
      noFollow: noFollowedLink.val ?? false,
      openInNewTab: blankedLink.val ?? false,
    }))

    const combineHandlers = (): CB => ({
      ...richUtils,
      renderEditor,
      selectionLink,
      setIsBlankedLink: blankedLink.set,
      setIsNoFollowLink: noFollowedLink.set,
      setLinkURL: linkURL.set,
    })

    const handleAccelerators = useAccelerators({ editor, richUtils, combineHandlers })

    const renderLeaf = useRenderLeaf({ renderLinkElement, handlers: combineHandlers() })

    const classes = createClassName(className, '', {
      'rich-text-editable': true,
    })

    useEffect(() => {
      const linkInfo = richUtils.getLinkInfo()

      if (linkInfo) {
        richUtils.setLinkInfo(linkInfo)
      } else {
        richUtils.resetLinkInfo()
      }
    }, [editor.selection])

    const renderEditor: CB['renderEditor'] = () => {
      return (
        <Editable
          id={id}
          className={classes}
          placeholder={placeholder}
          renderElement={renderElements}
          onKeyDown={evt => {
            editorContext.handleListsOnKeyDown(evt)
            handleAccelerators(evt)
          }}
          renderLeaf={renderLeaf}
        />
      )
    }

    return <>{typeof children === 'function' ? children(combineHandlers()) : children}</>
  },
) as RichTextEditorMakerNS.ComponentType

RichTextEditorMaker.provider = RichTextEditorMakerProvider
export { RichTextEditorMakerNS } from './types'
