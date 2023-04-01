import React, { forwardRef, useEffect, useRef, useState } from 'react'

import Editor from '@draft-js-plugins/editor'
import { EditorState, RichUtils } from 'draft-js'

import { useObjectedState, useVariable, useZoomComponent, useZoomContext } from '../../hooks'

import { logs } from '../../constants'
import { RichTextEditorMakerNS } from './types'
import { createEditorDecorators, createEditorPlugins, useEditorKeys, useExportData } from './utils'

import {
  createLink,
  isValidURL,
  manageLinkOnEditorStateUpdates,
  removeLink as handleRemoveLink,
  createTable,
} from './inserters'

type CB = RichTextEditorMakerNS.ChildrenCallback

const editorDecorators = createEditorDecorators()
const { plugins, addDivider } = createEditorPlugins()

export const RichTextEditorMaker = forwardRef<Editor, RichTextEditorMakerNS.Props>(
  (
    {
      stripPastedStyles = false,
      spellCheck = true,
      hashtagify = true,
      linkify = true,
      children,
      placeholder,
      autoFocus,
    },
    reference,
  ) => {
    const { isRTL } = useZoomContext()
    const { sendLog } = useZoomComponent('rich-text-editor-maker')
    const editorRef = reference ?? useRef<Editor | null>(null)
    const [editorState, setEditorState] = useState<EditorState>(
      // EditorState.createWithContent(convertFromRaw(JSON.parse(FULL_FEATURE_RICH_TEXT))),
      EditorState.createEmpty(),
    )
    const { handleKeyCommand, mapKeyToEditorCommand } = useEditorKeys({
      editorState,
      setEditorState,
    })

    const noFollowedLink = useObjectedState(false)
    const blankedLink = useObjectedState(false)
    const linkURL = useObjectedState('')

    const contentState = editorState.getCurrentContent()
    const selection = editorState.getSelection()
    const isRangeSelected = !selection.isCollapsed()
    const isLinkSelected = RichUtils.currentBlockContainsLink(editorState)

    const exportData = useExportData(contentState)

    const dataInfo = useVariable<CB['dataInfo']>(() => ({
      characters: 0,
      lines: 0,
      words: 0,
    }))

    const selectionLink = useVariable<CB['selectionLink']>(() => ({
      url: linkURL.val ?? '',
      noFollow: noFollowedLink.val ?? false,
      openInNewTab: blankedLink.val ?? false,
    }))

    const getEditorRef = (targetFunctionName: string): Editor | null => {
      if (typeof editorRef === 'function') {
        sendLog(
          logs.richTextEditorMakerEditorRefIsFunction,
          `getEditorRef used in ${targetFunctionName} fn`,
        )
        return null
      }

      const { current: editor } = editorRef
      if (!editor) {
        sendLog(
          logs.richTextEditorMakerEditorRefNotFound,
          `getEditorRef used in ${targetFunctionName} fn`,
        )
        return null
      }

      return editor
    }

    const toggleBlockStyle = (blockType: RichTextEditorMakerNS.BlockStyles) => {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType))
      focusEditor()
    }

    const toggleInlineStyle = (inlineType: RichTextEditorMakerNS.InlineStyles) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineType))
      focusEditor()
    }

    const isInlineStyle = (style: RichTextEditorMakerNS.InlineAndBlockStyles): boolean => {
      switch (style) {
        case 'BOLD':
        case 'ITALIC':
        case 'UNDERLINE':
          return true
        default:
          return false
      }
    }

    const undo: CB['undo'] = () => {}

    const redo: CB['redo'] = () => {}

    const toggleStyle: CB['toggleStyle'] = style => {
      if (isInlineStyle(style)) {
        return toggleInlineStyle(style as RichTextEditorMakerNS.InlineStyles)
      }
      return toggleBlockStyle(style as RichTextEditorMakerNS.BlockStyles)
    }

    const insertEmoji: CB['insertEmoji'] = emojiName => {}

    const insertTable: CB['insertTable'] = ({ cols, rows }) => {
      createTable(editorState, setEditorState, cols, rows, focusEditor)
    }

    const insertSticker: CB['insertSticker'] = stickerInfo => {}

    const insertVideo: CB['insertVideo'] = videoInfo => {}

    const insertHR: CB['insertHR'] = () => {
      setEditorState(addDivider(editorState))
      focusEditor()
    }

    const insertLink: CB['insertLink'] = ({ url, noFollow, openInNewTab }) => {
      return createLink(editorState, setEditorState, url, !!noFollow, !!openInNewTab, focusEditor)
    }

    const removeLink: CB['removeLink'] = () => {
      handleRemoveLink(editorState, setEditorState)()
      focusEditor()
    }

    const insertImage: CB['insertImage'] = imageInfo => {}

    const insertFile: CB['insertFile'] = fileInfo => {}

    const focusEditor: CB['focusEditor'] = () => {
      setTimeout(() => {
        const editor = getEditorRef('focusEditor')
        if (!editor) {
          sendLog(logs.richTextEditorMakerEditorRefNotFound, 'focusEditor fn')
        } else {
          editor.focus()
        }
      }, 0)
    }

    const containsStyle: CB['containsStyle'] = style => {
      if (isInlineStyle(style)) {
        return editorState.getCurrentInlineStyle().has(style)
      }
      return (
        editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType() === style
      )
    }

    const resetLinkInfo: CB['resetLinkInfo'] = () => {
      linkURL.set('')
      noFollowedLink.set(false)
      blankedLink.set(false)
    }

    const combineHandlers = (): CB => ({
      setIsBlankedLink: blankedLink.set,
      setIsNoFollowLink: noFollowedLink.set,
      setLinkURL: linkURL.set,
      selectionLink,
      dataInfo,
      containsStyle,
      isValidURL,
      editorState,
      exportData,
      focusEditor,
      insertEmoji,
      insertFile,
      insertHR,
      resetLinkInfo,
      insertImage,
      insertSticker,
      insertTable,
      insertVideo,
      isLinkSelected,
      isRangeSelected,
      redo,
      removeLink,
      renderEditor,
      setEditorState,
      toggleStyle,
      insertLink,
      undo,
    })

    useEffect(() => {
      manageLinkOnEditorStateUpdates(editorState, linkURL, noFollowedLink, blankedLink)
    }, [editorState])

    const renderEditor: CB['renderEditor'] = () => {
      return (
        <Editor
          decorators={editorDecorators}
          plugins={plugins}
          spellCheck={spellCheck}
          stripPastedStyles={stripPastedStyles}
          editorState={editorState}
          onChange={setEditorState}
          textAlignment={isRTL ? 'right' : 'left'}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          textDirectionality={isRTL ? 'RTL' : 'LTR'}
          ref={editorRef}
          placeholder={
            contentState.getBlockMap().first().getType() === 'unstyled' ? placeholder : undefined
          }
        />
      )
    }

    return <>{typeof children === 'function' ? children(combineHandlers()) : children}</>
  },
)

export { RichTextEditorMakerNS } from './types'
