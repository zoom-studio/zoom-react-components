import React, {
  Dispatch,
  forwardRef,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import Editor, { composeDecorators, EditorPlugin } from '@draft-js-plugins/editor'
import createFocusPlugin from '@draft-js-plugins/focus'
import createImagePlugin from '@draft-js-plugins/image'
import createResizeablePlugin from '@draft-js-plugins/resizeable'
import { convertFromRaw, EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js'
import { useObjectedState, UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'

import { ContextMenu, EmojiNS, ExplorerNS, ScrollView } from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { BaseComponent } from '../../types'

import { FULL_FEATURE_RICH_TEXT } from '../../fixtures'
import { EditorActions } from './editor-actions'
import { createEmoji, EmojiComponent, findEmojiEntities } from './emoji-inserter'
import { RichTextEditorImageExplorer } from './image-inserter'
import {
  createLink,
  findLinkEntities,
  isValidURL,
  LinkComponent,
  LinkInserterNS,
  manageLinkOnEditorStateUpdates,
  removeLink,
} from './link-inserter'
import { useExportData } from './use-export-data'
import { useRichTextEditorI18n, UseRichTextEditorI18nNS } from './use-i18n'

export namespace RichTextEditorNS {
  export type TextSize = typeof TextSize[number]
  export const TextSize = ['normal', 'h1', 'h2', 'h3', 'h4'] as const

  export type BlockTypes = typeof BlockTypes[number]
  export const BlockTypes = [
    'header-one',
    'header-two',
    'header-three',
    'header-four',
    'unordered-list-item',
    'ordered-list-item',
    'blockquote',
    'unstyled',
  ] as const

  export type InlineTypes = typeof InlineTypes[number]
  export const InlineTypes = ['BOLD', 'ITALIC', 'UNDERLINE'] as const

  export type InlineAndBlockTypes = BlockTypes | InlineTypes
  export type I18n = UseRichTextEditorI18nNS.I18n

  export type ExportData = ReturnType<typeof useExportData>

  export interface Handlers {
    selectionLink: {
      isNoFollowed: UseObjectedStateNS.ReturnType<boolean>
      isBlanked: UseObjectedStateNS.ReturnType<boolean>
      URL: UseObjectedStateNS.ReturnType<string>
      containsLink: boolean
    }
    editorState: EditorState
    updaterKey: number
    rangeSelected: boolean
    exportData: ExportData
    toggleStyle: (style: InlineAndBlockTypes) => void
    insertEmoji: (emojiName: EmojiNS.Emojis.Names) => void
    insertLink: (linkURL: string, openInNewTab?: boolean, noFollowed?: boolean) => void
    removeLink: () => void
    insertImage: (imageSource: string, alt?: string) => void
    insertFile: (file: File | string) => void
    focusEditor: () => void
    containsStyle: (style: InlineAndBlockTypes) => boolean
  }

  export interface ImageExplorerProps
    extends Omit<
      ExplorerNS.Props,
      'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'
    > {}

  export interface Props extends Omit<BaseComponent, 'children'> {
    placeholder?: string
    minHeight?: string | number
    maxHeight?: string | number
    autoFocus?: boolean
    stripPastedStyles?: boolean
    spellCheck?: boolean
    validateURL?: LinkInserterNS.Props['isValidURL']
    headlessEditor?: boolean
    setEditorHandlers?: ((handlers: Handlers) => void) | Dispatch<SetStateAction<Handlers>>
    imageExplorerProps?: ImageExplorerProps
  }
}

const resizeablePlugin = createResizeablePlugin()
const focusPlugin = createFocusPlugin()
const decorator = composeDecorators(resizeablePlugin.decorator, focusPlugin.decorator)
const imagePlugin = createImagePlugin({ decorator })
const plugins: EditorPlugin[] = [focusPlugin, resizeablePlugin, imagePlugin]

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorNS.Props>(
  (
    {
      maxHeight = 400,
      minHeight = 400,
      stripPastedStyles = false,
      spellCheck = false,
      validateURL = isValidURL,
      headlessEditor,
      className,
      containerProps,
      placeholder,
      autoFocus,
      setEditorHandlers,
      imageExplorerProps,
      ...rest
    },
    reference,
  ) => {
    const { createClassName, globalI18ns } = useZoomComponent('rich-text-editor')
    const { isRTL } = useZoomContext()
    const i18n = useRichTextEditorI18n(globalI18ns)

    const noFollowedLink = useObjectedState(false)
    const blankedLink = useObjectedState(false)
    const linkURL = useObjectedState('')
    const isImageDialogOpen = useObjectedState(false)

    const classes = createClassName(className)
    const editorRef = useRef<Editor | null>(null)

    const [updaterKey, setUpdaterKey] = useState(0)
    const [editorState, setEditorState] = useState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(FULL_FEATURE_RICH_TEXT))),
    )

    const selection = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const isCursorOverLink = RichUtils.currentBlockContainsLink(editorState)

    const handleExportData = useExportData(contentState)

    const handleKeyCommand = useCallback(
      (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
          setEditorState(newState)
          return 'handled'
        }
        return 'not-handled'
      },
      [editorState, setEditorState],
    )

    const mapKeyToEditorCommand = useCallback(
      (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Tab': {
            const newEditorState = RichUtils.onTab(e, editorState, 4)
            if (newEditorState !== editorState) {
              setEditorState(newEditorState)
            }
            return null
          }
        }
        return getDefaultKeyBinding(e)
      },
      [editorState, setEditorState],
    )

    const toggleBlockStyle = (blockType: RichTextEditorNS.BlockTypes) => {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType))
      handleFocusEditor()
    }

    const toggleInlineStyle = (inlineType: RichTextEditorNS.InlineTypes) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineType))
      handleFocusEditor()
    }

    const handleFocusEditor = () => {
      setTimeout(() => {
        editorRef.current?.focus()
      }, 0)
    }

    const handleCreateEmoji = (emojiName: EmojiNS.Emojis.Names) => {
      return createEmoji(editorState, setEditorState, emojiName, handleFocusEditor)
    }

    const handleCreateImage = (imageSource: string, alt?: string) => {
      return setEditorState(currentEditorState =>
        imagePlugin.addImage(currentEditorState, imageSource, { alt }),
      )
    }

    const isInlineStyle = (style: RichTextEditorNS.InlineAndBlockTypes): boolean => {
      switch (style) {
        case 'BOLD':
        case 'ITALIC':
        case 'UNDERLINE':
          return true
        default:
          return false
      }
    }

    const handleToggleStyle = (style: RichTextEditorNS.InlineAndBlockTypes) => {
      if (isInlineStyle(style)) {
        return toggleInlineStyle(style as RichTextEditorNS.InlineTypes)
      }
      return toggleBlockStyle(style as RichTextEditorNS.BlockTypes)
    }

    const isSelectionContainsStyle = (style: RichTextEditorNS.InlineAndBlockTypes): boolean => {
      if (isInlineStyle(style)) {
        return editorState.getCurrentInlineStyle().has(style)
      }

      return (
        editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType() === style
      )
    }

    const handleInsertLink: RichTextEditorNS.Handlers['insertLink'] = (
      URL,
      openInNewTab,
      noFollowed,
    ) => {
      createLink(editorState, setEditorState, URL, !!noFollowed, !!openInNewTab, handleFocusEditor)
      linkURL.set('')
    }

    const handleRemoveLink = () => {
      return removeLink(editorState, setEditorState)()
    }

    useEffect(() => {
      setUpdaterKey(key => key + 1)
    }, [selection.getFocusOffset()])

    useEffect(() => {
      setEditorHandlers?.({
        editorState,
        updaterKey,
        focusEditor: handleFocusEditor,
        insertEmoji: handleCreateEmoji,
        toggleStyle: handleToggleStyle,
        insertLink: handleInsertLink,
        removeLink: handleRemoveLink,
        insertImage: handleCreateImage,
        insertFile: () => {},
        containsStyle: isSelectionContainsStyle,
        exportData: handleExportData,
        rangeSelected: !selection.isCollapsed(),
        selectionLink: {
          containsLink: isCursorOverLink,
          isBlanked: blankedLink,
          isNoFollowed: noFollowedLink,
          URL: linkURL,
        },
      })
    }, [
      editorState,
      updaterKey,
      isCursorOverLink,
      blankedLink.val,
      noFollowedLink.val,
      linkURL.val,
    ])

    useEffect(() => {
      manageLinkOnEditorStateUpdates(editorState, linkURL, noFollowedLink, blankedLink)
    }, [editorState])

    useEffect(() => {
      if (autoFocus) {
        handleFocusEditor()
      }
    }, [])

    return (
      <div {...rest} {...containerProps} ref={reference} className={classes}>
        <RichTextEditorImageExplorer
          i18n={i18n}
          imageExplorerProps={imageExplorerProps}
          handleCreateImage={handleCreateImage}
          isImageDialogOpen={isImageDialogOpen}
        />

        {!headlessEditor && (
          <EditorActions
            editorState={editorState}
            setEditorState={setEditorState}
            i18n={i18n}
            updaterKey={updaterKey}
            validateURL={validateURL}
            toggleBlockStyle={toggleBlockStyle}
            toggleInlineStyle={toggleInlineStyle}
            handleCreateEmoji={handleCreateEmoji}
            focusEditor={handleFocusEditor}
            blankedLink={blankedLink}
            linkURL={linkURL}
            noFollowedLink={noFollowedLink}
            isImageDialogOpen={isImageDialogOpen}
          />
        )}

        <div className="rich-text-editor">
          <ContextMenu items={[{ title: 'hey' }]}>
            <ScrollView maxHeight={maxHeight} minHeight={minHeight} className="editor-scroll-view">
              <Editor
                decorators={[
                  { strategy: findLinkEntities, component: LinkComponent },
                  { strategy: findEmojiEntities, component: EmojiComponent },
                ]}
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
                  contentState.getBlockMap().first().getType() === 'unstyled'
                    ? placeholder
                    : undefined
                }
              />
            </ScrollView>
          </ContextMenu>
        </div>
      </div>
    )
  },
)
