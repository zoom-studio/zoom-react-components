import React, { forwardRef, useRef, useState } from 'react'

import { isValidURL, useObjectedState } from '@zoom-studio/js-ts-utils'

import {
  Divider,
  type ExplorerNS,
  RichTextEditorMaker,
  type RichTextEditorMakerNS,
  ScrollView,
  Stack,
} from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'
import { EditorAction } from './editor-action'
import { ResizeEditorHandle } from './resize-editor-handle'
import { type UseRichTextEditorI18nNS, useRichTextEditorI18n } from './use-i18n'

import { type RichTextEditorMakerProviderNS } from '../rich-text-editor-maker/provider'
import {
  EmojiInserterPopover,
  FileExplorer,
  ImageExplorer,
  LinkElement,
  LinkInserterPopover,
  TableInserterPopover,
  VideoExplorer,
} from './inserters'

export namespace RichTextEditorNS {
  export type Actions = (typeof Actions)[number]
  export const Actions = [
    'h1',
    'h2',
    'h3',
    'h4',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'quote',
    'highlight',
    'link',
    'removeLink',
    'orderedList',
    'unorderedList',
    'rule',
    'table',
    'image',
    'video',
    'file',
    'emoji',
    'undo',
    'redo',
  ] as const

  export type I18n = UseRichTextEditorI18nNS.I18n

  export interface ImageExplorerProps
    extends Omit<
      ExplorerNS.Props,
      'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'
    > {}

  export interface VideoExplorerProps
    extends Omit<
      ExplorerNS.Props,
      'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'
    > {}

  export interface FileExplorerProps
    extends Omit<
      ExplorerNS.Props,
      'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'
    > {}

  export type EditorMakerProps = Omit<
    RichTextEditorMakerNS.Props,
    'children' | 'editor' | 'id' | 'renderLinkElement'
  >

  export type EditorMakerProviderProps = Omit<
    RichTextEditorMakerProviderNS.Props,
    'children' | 'id' | 'enableMention' | 'enableHashtag'
  >

  export interface Props extends Omit<BaseComponent, 'children' | 'id'> {
    imageExplorerProps?: ImageExplorerProps
    videoExplorerProps?: VideoExplorerProps
    fileExplorerProps?: FileExplorerProps
    editorProps?: EditorMakerProps & EditorMakerProviderProps
    stickyActions?: boolean
    resizable?: boolean
    maxHeight?: string | number
    minHeight?: string | number
    initialHeight?: string | number
    enableAdvancedLinkInserter?: boolean
    id: string
    i18n?: I18n
    actions?: {
      [action in Actions]?: boolean
    }
  }
}

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorNS.Props>(
  (
    {
      i18n: componentI18n,
      stickyActions = true,
      resizable = true,
      maxHeight = 'unset',
      minHeight = 200,
      initialHeight = 200,
      className,
      editorProps,
      containerProps,
      imageExplorerProps,
      videoExplorerProps,
      enableAdvancedLinkInserter,
      fileExplorerProps,
      id,
      actions,
      ...rest
    },
    reference,
  ) => {
    const { createClassName, globalI18ns, sendLog } = useZoomComponent('rich-text-editor')
    const i18n = useRichTextEditorI18n(globalI18ns, componentI18n)
    const editorContainerRef = useRef<HTMLDivElement | null>(null)

    const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
    const isImageDialogOpen = useObjectedState(false)
    const isVideoDialogOpen = useObjectedState(false)
    const isFileDialogOpen = useObjectedState(false)

    const containerRef = reference ?? useRef<HTMLDivElement | null>(null)

    const handleOpenLinkPopover = () => {
      setIsLinkPopoverOpen(true)
    }

    const classes = createClassName(className, '', {
      [createClassName('', 'sticky-actions')]: !!stickyActions,
    })

    const openImageDialog = () => {
      isImageDialogOpen.set(true)
    }

    const openVideoDialog = () => {
      isVideoDialogOpen.set(true)
    }

    const openFileDialog = () => {
      isFileDialogOpen.set(true)
    }

    const isEnabled = (_actions: RichTextEditorNS.Actions[]) => {
      return _actions.some(action => actions?.[action] ?? true)
    }

    return (
      <div {...rest} {...containerProps} className={classes} ref={containerRef}>
        <RichTextEditorMaker.provider
          id={id}
          defaultValue={editorProps?.defaultValue}
          saveDraft={editorProps?.saveDraft}
        >
          {({ providerEditor }) => (
            <RichTextEditorMaker
              editor={providerEditor}
              className={editorProps?.className}
              collapseOnEscape={editorProps?.collapseOnEscape}
              containerProps={editorProps?.containerProps}
              onClick={editorProps?.onClick}
              placeholder={editorProps?.placeholder}
              searchQuery={editorProps?.searchQuery}
              style={editorProps?.style}
              renderLinkElement={props => (
                <LinkElement {...props} openLinkPopover={handleOpenLinkPopover} />
              )}
            >
              {handlers => (
                <div className="editor-container">
                  {isEnabled(['image']) && (
                    <ImageExplorer
                      defaultTypeQuery={i18n.images}
                      imageExplorerProps={imageExplorerProps}
                      handleCreateImage={handlers.insertImage}
                      isImageDialogOpen={isImageDialogOpen}
                    />
                  )}

                  {isEnabled(['video']) && (
                    <VideoExplorer
                      defaultTypeQuery={i18n.videos}
                      videoExplorerProps={videoExplorerProps}
                      handleCreateVideo={handlers.insertVideo}
                      isVideoDialogOpen={isVideoDialogOpen}
                    />
                  )}

                  {isEnabled(['file']) && (
                    <FileExplorer
                      fileExplorerProps={fileExplorerProps}
                      handleCreateFile={handlers.insertFile}
                      isFileDialogOpen={isFileDialogOpen}
                    />
                  )}

                  {isEnabled([...RichTextEditorNS.Actions]) && (
                    <Stack
                      className="editor-actions"
                      broken
                      spacing={0}
                      dividers={<Divider vertical />}
                    >
                      {isEnabled(['h1', 'h2', 'h3', 'h4']) && (
                        <>
                          {isEnabled(['h1']) && (
                            <EditorAction
                              text="H1"
                              title={i18n.heading1}
                              isActive={handlers.isActive('h1')}
                              onClick={handlers.toggleHeading(1)}
                            />
                          )}
                          {isEnabled(['h2']) && (
                            <EditorAction
                              text="H2"
                              title={i18n.heading2}
                              isActive={handlers.isActive('h2')}
                              onClick={handlers.toggleHeading(2)}
                            />
                          )}
                          {isEnabled(['h3']) && (
                            <EditorAction
                              text="H3"
                              title={i18n.heading3}
                              isActive={handlers.isActive('h3')}
                              onClick={handlers.toggleHeading(3)}
                            />
                          )}
                          {isEnabled(['h4']) && (
                            <EditorAction
                              text="H4"
                              title={i18n.heading4}
                              isActive={handlers.isActive('h4')}
                              onClick={handlers.toggleHeading(4)}
                            />
                          )}
                        </>
                      )}

                      {isEnabled(['bold', 'italic', 'underline', 'strikethrough']) && (
                        <>
                          {isEnabled(['bold']) && (
                            <EditorAction
                              title={i18n.bold}
                              icon="format_bold"
                              onClick={handlers.toggleBold}
                              isActive={handlers.isActive('bold')}
                            />
                          )}
                          {isEnabled(['italic']) && (
                            <EditorAction
                              title={i18n.italic}
                              icon="format_italic"
                              onClick={handlers.toggleItalic}
                              isActive={handlers.isActive('italic')}
                            />
                          )}
                          {isEnabled(['underline']) && (
                            <EditorAction
                              title={i18n.underline}
                              icon="format_underlined"
                              onClick={handlers.toggleUnderline}
                              isActive={handlers.isActive('underline')}
                            />
                          )}
                          {isEnabled(['strikethrough']) && (
                            <EditorAction
                              title={i18n.strikethrough}
                              icon="format_strikethrough"
                              onClick={handlers.toggleStrikethrough}
                              isActive={handlers.isActive('strikethrough')}
                            />
                          )}
                        </>
                      )}

                      {isEnabled(['quote', 'highlight']) && (
                        <>
                          {isEnabled(['quote']) && (
                            <EditorAction
                              title={i18n.blockquote}
                              icon="format_quote"
                              onClick={handlers.toggleQuote}
                              isActive={handlers.isActive('quote')}
                            />
                          )}
                          {isEnabled(['highlight']) && (
                            <EditorAction
                              title={i18n.highlight}
                              icon="drive_file_rename_outline"
                              onClick={handlers.toggleHighlight}
                              isActive={handlers.isActive('highlight')}
                            />
                          )}
                        </>
                      )}

                      {isEnabled(['link', 'removeLink']) && (
                        <>
                          {isEnabled(['link']) && (
                            <EditorAction
                              title={i18n.link}
                              icon="link"
                              isActive={handlers.isActive('link')}
                              popover={{
                                isOpen: isLinkPopoverOpen,
                                onOpenChange: setIsLinkPopoverOpen,
                                className: 'insert-link-popover',
                                content: ({ closePopover }) => (
                                  <LinkInserterPopover
                                    selectionLink={handlers.selectionLink}
                                    i18n={i18n}
                                    setIsBlankedLink={handlers.setIsBlankedLink}
                                    setIsNoFollowLink={handlers.setIsNoFollowLink}
                                    setLinkURL={handlers.setLinkURL}
                                    isValidURL={isValidURL}
                                    createLink={handlers.insertLink}
                                    resetLinkInfo={handlers.resetLinkInfo}
                                    closePopover={closePopover}
                                    focusEditor={handlers.focusEditor}
                                    enableAdvancedLinkInserter={enableAdvancedLinkInserter}
                                  />
                                ),
                              }}
                            />
                          )}
                          {isEnabled(['removeLink']) && (
                            <EditorAction
                              title={i18n.removeLink}
                              icon="link_off"
                              onClick={handlers.removeLink}
                              disabled={!handlers.isActive('link')}
                            />
                          )}
                        </>
                      )}

                      {isEnabled(['orderedList', 'unorderedList']) && (
                        <>
                          {isEnabled(['orderedList']) && (
                            <EditorAction
                              title={i18n.ol}
                              icon="format_list_numbered"
                              onClick={handlers.toggleList('ordered-list')}
                              isActive={handlers.isActive('ordered-list')}
                            />
                          )}
                          {isEnabled(['unorderedList']) && (
                            <EditorAction
                              title={i18n.ul}
                              icon="format_list_bulleted"
                              onClick={handlers.toggleList('unordered-list')}
                              isActive={handlers.isActive('unordered-list')}
                            />
                          )}
                        </>
                      )}

                      {isEnabled(['rule', 'table']) && (
                        <>
                          {isEnabled(['rule']) && (
                            <EditorAction
                              title={i18n.horizontalRule}
                              icon="horizontal_rule"
                              onClick={handlers.insertRule}
                            />
                          )}
                          {isEnabled(['table']) && (
                            <EditorAction
                              title={i18n.table}
                              icon="grid_on"
                              popover={{
                                className: 'insert-table-popover',
                                content: ({ closePopover }) => (
                                  <TableInserterPopover
                                    onSelect={(cols, rows) => {
                                      handlers.insertTable({ cols, rows })
                                    }}
                                    closePopover={closePopover}
                                    i18n={i18n}
                                  />
                                ),
                              }}
                            />
                          )}
                        </>
                      )}

                      {isEnabled(['image', 'video', 'file', 'emoji']) && (
                        <>
                          {isEnabled(['image']) && (
                            <EditorAction
                              title={i18n.image}
                              icon="insert_photo"
                              onClick={openImageDialog}
                            />
                          )}
                          {isEnabled(['video']) && (
                            <EditorAction
                              title={i18n.video}
                              icon="smart_display"
                              onClick={openVideoDialog}
                            />
                          )}
                          {isEnabled(['file']) && (
                            <EditorAction
                              title={i18n.file}
                              icon="folder"
                              onClick={openFileDialog}
                            />
                          )}
                          {isEnabled(['emoji']) && (
                            <EditorAction
                              title={i18n.emoji}
                              icon="sentiment_satisfied_alt"
                              popover={{
                                className: 'insert-emoji-popover',
                                content: <EmojiInserterPopover onSelect={handlers.insertEmoji} />,
                              }}
                            />
                          )}
                        </>
                      )}

                      {isEnabled(['undo', 'redo']) && (
                        <Stack.item className="time-shifts-container">
                          {isEnabled(['undo']) && (
                            <EditorAction title={i18n.undo} icon="undo" onClick={handlers.undo} />
                          )}
                          {isEnabled(['redo']) && (
                            <EditorAction title={i18n.redo} icon="redo" onClick={handlers.redo} />
                          )}
                        </Stack.item>
                      )}
                    </Stack>
                  )}

                  <div className="editor" ref={editorContainerRef}>
                    <ScrollView
                      maxHeight={maxHeight}
                      minHeight={minHeight}
                      style={{ height: initialHeight }}
                    >
                      {handlers.renderEditor()}
                    </ScrollView>
                  </div>

                  {resizable && (
                    <ResizeEditorHandle sendLog={sendLog} editorContainerRef={editorContainerRef} />
                  )}
                </div>
              )}
            </RichTextEditorMaker>
          )}
        </RichTextEditorMaker.provider>
      </div>
    )
  },
)
