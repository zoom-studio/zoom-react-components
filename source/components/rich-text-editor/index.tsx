import React, { forwardRef, useRef, useState } from 'react'

import { isValidURL, useObjectedState } from '@zoom-studio/zoom-js-ts-utils'

import {
  ContextMenu,
  Divider,
  ExplorerNS,
  RichTextEditorMaker,
  RichTextEditorMakerNS,
  ScrollView,
  Stack,
} from '..'
import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'
import { EditorAction } from './editor-action'
import { ResizeEditorHandle } from './resize-editor-handle'
import { UseRichTextEditorI18nNS, useRichTextEditorI18n } from './use-i18n'

import {
  LinkInserterPopover,
  TableInserterPopover,
  LinkElement,
  ImageExplorer,
  VideoExplorer,
  FileExplorer,
  EmojiInserterPopover,
} from './inserters'
import { faker } from '@faker-js/faker'

export namespace RichTextEditorNS {
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

  export interface Props extends Omit<BaseComponent, 'children'> {
    imageExplorerProps?: ImageExplorerProps
    videoExplorerProps?: VideoExplorerProps
    fileExplorerProps?: FileExplorerProps
    editorProps?: Omit<RichTextEditorMakerNS.Props, 'children'>
    stickyActions?: boolean
    resizable?: boolean
    maxHeight?: string | number
    minHeight?: string | number
    initialHeight?: string | number
    enableAdvancedLinkInserter?: boolean
  }
}

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorNS.Props>(
  (
    {
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
      // ...rest
    },
    reference,
  ) => {
    const { createClassName, globalI18ns, sendLog } = useZoomComponent('rich-text-editor')
    const i18n = useRichTextEditorI18n(globalI18ns)
    const editorContainerRef = useRef<HTMLDivElement | null>(null)

    const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
    const isImageDialogOpen = useObjectedState(false)
    const isVideoDialogOpen = useObjectedState(false)
    const isFileDialogOpen = useObjectedState(false)

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

    return (
      <div {...containerProps} className={classes} ref={reference}>
        <RichTextEditorMaker.provider
          mentionify
          enableHashtag={{
            onEnter: ({ handlers, hashtag }) =>
              handlers.insertHashtag({ displayName: hashtag.hashtagQuery }),
            hashtags: [
              ...Array.from(Array(100)).map(() =>
                '#'.concat(faker.internet.userName().toLowerCase().replace(/ /g, '')),
              ),
              ...[
                'hr.cycle',
                'hr_cycle',
                'hr-cycle',
                'hr/cycle',
                'hr1234',
                'hr.1234',
                'hr_1234',
                '_hr_1234_',
                '_hr.1234_',
              ].map(hashtag => '#'.concat(hashtag)),
            ],
          }}
          enableMention={{
            onEnter: ({ handlers, mention }) =>
              handlers.insertMention({ displayName: mention.mentionQuery }),
            usernames: [
              ...Array.from(Array(100)).map(() => faker.internet.userName()),
              'hr.cycle',
              'hr_cycle',
              'hr-cycle',
              'hr/cycle',
              'hr1234',
              'hr.1234',
              'hr_1234',
              '_hr_1234_',
              '_hr.1234_',
            ],
          }}
        >
          {({ providerEditor, mention, hashtag }) => (
            <RichTextEditorMaker
              editor={providerEditor}
              renderLinkElement={props => (
                <LinkElement {...props} openLinkPopover={handleOpenLinkPopover} />
              )}
              {...editorProps}
            >
              {handlers => (
                <div className="editor-container">
                  {mention.shouldRenderList && (
                    <ul
                      style={{
                        color: 'gray',
                        position: 'fixed',
                        right: 0,
                        bottom: 0,
                        background: 'black',
                        zIndex: 5,
                      }}
                    >
                      {mention.foundUsernames.map((username, index) => (
                        <li key={index}>{username}</li>
                      ))}
                    </ul>
                  )}

                  {hashtag.shouldRenderList && (
                    <ul
                      style={{
                        color: 'gray',
                        position: 'fixed',
                        right: 0,
                        bottom: 0,
                        background: 'black',
                        zIndex: 5,
                      }}
                    >
                      {hashtag.foundHashtags.map((hashtag, index) => (
                        <li key={index}>{hashtag}</li>
                      ))}
                    </ul>
                  )}

                  <ImageExplorer
                    i18n={i18n}
                    imageExplorerProps={imageExplorerProps}
                    handleCreateImage={handlers.insertImage}
                    isImageDialogOpen={isImageDialogOpen}
                  />

                  <VideoExplorer
                    i18n={i18n}
                    videoExplorerProps={videoExplorerProps}
                    handleCreateVideo={handlers.insertVideo}
                    isVideoDialogOpen={isVideoDialogOpen}
                  />

                  <FileExplorer
                    i18n={i18n}
                    fileExplorerProps={fileExplorerProps}
                    handleCreateFile={handlers.insertFile}
                    isFileDialogOpen={isFileDialogOpen}
                  />

                  <Stack
                    className="editor-actions"
                    broken
                    spacing={0}
                    dividers={<Divider vertical />}
                  >
                    <>
                      <EditorAction
                        text="H1"
                        title={i18n.heading1}
                        isActive={handlers.isActive('h1')}
                        onClick={handlers.toggleHeading(1)}
                      />
                      <EditorAction
                        text="H2"
                        title={i18n.heading2}
                        isActive={handlers.isActive('h2')}
                        onClick={handlers.toggleHeading(2)}
                      />
                      <EditorAction
                        text="H3"
                        title={i18n.heading3}
                        isActive={handlers.isActive('h3')}
                        onClick={handlers.toggleHeading(3)}
                      />
                      <EditorAction
                        text="H4"
                        title={i18n.heading4}
                        isActive={handlers.isActive('h4')}
                        onClick={handlers.toggleHeading(4)}
                      />
                    </>
                    <>
                      <EditorAction
                        title={i18n.bold}
                        icon="format_bold"
                        onClick={handlers.toggleBold}
                        isActive={handlers.isActive('bold')}
                      />
                      <EditorAction
                        title={i18n.italic}
                        icon="format_italic"
                        onClick={handlers.toggleItalic}
                        isActive={handlers.isActive('italic')}
                      />
                      <EditorAction
                        title={i18n.underline}
                        icon="format_underlined"
                        onClick={handlers.toggleUnderline}
                        isActive={handlers.isActive('underline')}
                      />
                      <EditorAction
                        title={i18n.strikethrough}
                        icon="format_strikethrough"
                        onClick={handlers.toggleStrikethrough}
                        isActive={handlers.isActive('strikethrough')}
                      />
                      <EditorAction
                        title={i18n.blockquote}
                        icon="format_quote"
                        onClick={handlers.toggleQuote}
                        isActive={handlers.isActive('quote')}
                      />
                    </>
                    <>
                      <EditorAction
                        title={i18n.highlight}
                        icon="drive_file_rename_outline"
                        onClick={handlers.toggleHighlight}
                        isActive={handlers.isActive('highlight')}
                      />
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
                      <EditorAction
                        title={i18n.removeLink}
                        icon="link_off"
                        onClick={handlers.removeLink}
                        disabled={!handlers.isActive('link')}
                      />
                    </>
                    <>
                      <EditorAction
                        title={i18n.ol}
                        icon="format_list_numbered"
                        onClick={handlers.toggleList('ordered-list')}
                        isActive={handlers.isActive('ordered-list')}
                      />
                      <EditorAction
                        title={i18n.ul}
                        icon="format_list_bulleted"
                        onClick={handlers.toggleList('unordered-list')}
                        isActive={handlers.isActive('unordered-list')}
                      />
                    </>
                    <>
                      <EditorAction
                        title={i18n.horizontalRule}
                        icon="horizontal_rule"
                        onClick={handlers.insertRule}
                      />
                      <EditorAction
                        title={i18n.table}
                        icon="grid_on"
                        popover={{
                          className: 'insert-table-popover',
                          content: ({ closePopover }) => (
                            <TableInserterPopover
                              onSelect={(cols, rows) => handlers.insertTable({ cols, rows })}
                              closePopover={closePopover}
                            />
                          ),
                        }}
                      />
                    </>
                    <>
                      <EditorAction
                        title={i18n.image}
                        icon="insert_photo"
                        onClick={openImageDialog}
                      />
                      <EditorAction
                        title={i18n.video}
                        icon="smart_display"
                        onClick={openVideoDialog}
                      />
                      <EditorAction title={i18n.file} icon="folder" onClick={openFileDialog} />
                      <EditorAction
                        title={i18n.emoji}
                        icon="sentiment_satisfied_alt"
                        popover={{
                          className: 'insert-emoji-popover',
                          content: <EmojiInserterPopover onSelect={handlers.insertEmoji} />,
                        }}
                      />
                    </>
                    <>
                      <EditorAction title={i18n.undo} icon="undo" />
                      <EditorAction title={i18n.redo} icon="redo" />
                    </>
                  </Stack>

                  <div className="editor" ref={editorContainerRef}>
                    <ContextMenu items={[]}>
                      <ScrollView
                        maxHeight={maxHeight}
                        minHeight={minHeight}
                        style={{ height: initialHeight }}
                      >
                        {handlers.renderEditor()}
                      </ScrollView>
                    </ContextMenu>
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
