import React, { forwardRef, useRef } from 'react'

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
import { useRichTextEditorI18n, UseRichTextEditorI18nNS } from './use-i18n'

import { LinkInserterPopover, TableInserterPopover } from './inserters'

type CB = RichTextEditorMakerNS.ChildrenCallback
type Styles = RichTextEditorMakerNS.InlineAndBlockStyles

export namespace RichTextEditorNS {
  export type I18n = UseRichTextEditorI18nNS.I18n

  export interface ImageExplorerProps
    extends Omit<
      ExplorerNS.Props,
      'filterTypes' | 'defaultTypeQuery' | 'multiSelect' | 'isTypeSelectDisabled' | 'onSelectItems'
    > {}

  export interface Props extends Omit<BaseComponent, 'children'> {
    imageExplorerProps?: ImageExplorerProps
    editorProps?: Omit<RichTextEditorMakerNS.Props, 'children'>
    stickyActions?: boolean
    resizable?: boolean
    maxHeight?: string | number
    minHeight?: string | number
    initialHeight?: string | number
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
      // ...rest
    },
    reference,
  ) => {
    const { createClassName, globalI18ns, sendLog } = useZoomComponent('rich-text-editor')
    const i18n = useRichTextEditorI18n(globalI18ns)
    const editorContainerRef = useRef<HTMLDivElement | null>(null)

    const classes = createClassName(className, '', {
      [createClassName('', 'sticky-actions')]: !!stickyActions,
    })

    const toggleStyle = (toggleStyle: CB['toggleStyle'], style: Styles) => () => {
      toggleStyle(style)
    }

    return (
      <div {...containerProps} className={classes} ref={reference}>
        <RichTextEditorMaker {...editorProps}>
          {({
            toggleStyle: ts,
            renderEditor,
            removeLink,
            insertHR,
            undo,
            redo,
            containsStyle,
            resetLinkInfo,
            isRangeSelected,
            setIsBlankedLink,
            setIsNoFollowLink,
            setLinkURL,
            selectionLink,
            isValidURL,
            insertLink,
            isLinkSelected,
            focusEditor,
            insertTable,
          }) => (
            <div className="editor-container">
              <Stack className="editor-actions" broken spacing={0} dividers={<Divider vertical />}>
                <>
                  <EditorAction
                    text="H1"
                    title={i18n.heading1}
                    onClick={toggleStyle(ts, 'header-one')}
                    isActive={containsStyle('header-one')}
                  />
                  <EditorAction
                    text="H2"
                    title={i18n.heading2}
                    onClick={toggleStyle(ts, 'header-two')}
                    isActive={containsStyle('header-two')}
                  />
                  <EditorAction
                    text="H3"
                    title={i18n.heading3}
                    onClick={toggleStyle(ts, 'header-three')}
                    isActive={containsStyle('header-three')}
                  />
                  <EditorAction
                    text="H4"
                    title={i18n.heading4}
                    onClick={toggleStyle(ts, 'header-four')}
                    isActive={containsStyle('header-four')}
                  />
                </>
                <>
                  <EditorAction
                    title={i18n.bold}
                    icon="format_bold"
                    onClick={toggleStyle(ts, 'BOLD')}
                    isActive={containsStyle('BOLD')}
                  />
                  <EditorAction
                    title={i18n.italic}
                    icon="format_italic"
                    onClick={toggleStyle(ts, 'ITALIC')}
                    isActive={containsStyle('ITALIC')}
                  />
                  <EditorAction
                    title={i18n.underline}
                    icon="format_underlined"
                    onClick={toggleStyle(ts, 'UNDERLINE')}
                    isActive={containsStyle('UNDERLINE')}
                  />
                  <EditorAction
                    title={i18n.blockquote}
                    icon="format_quote"
                    onClick={toggleStyle(ts, 'blockquote')}
                    isActive={containsStyle('blockquote')}
                  />
                </>
                <>
                  <EditorAction
                    title={i18n.link}
                    icon="link"
                    disabled={!isRangeSelected}
                    isActive={isLinkSelected}
                    popover={{
                      className: 'insert-link-popover',
                      onClose: resetLinkInfo,
                      disabled: !isRangeSelected,
                      content: ({ closePopover }) => (
                        <LinkInserterPopover
                          selectionLink={selectionLink}
                          i18n={i18n}
                          setIsBlankedLink={setIsBlankedLink}
                          setIsNoFollowLink={setIsNoFollowLink}
                          setLinkURL={setLinkURL}
                          isValidURL={isValidURL}
                          createLink={insertLink}
                          resetLinkInfo={resetLinkInfo}
                          closePopover={closePopover}
                          focusEditor={focusEditor}
                        />
                      ),
                    }}
                  />
                  <EditorAction title={i18n.removeLink} icon="link_off" onClick={removeLink} />
                </>
                <>
                  <EditorAction
                    title={i18n.ol}
                    icon="format_list_numbered"
                    onClick={toggleStyle(ts, 'ordered-list-item')}
                  />
                  <EditorAction
                    title={i18n.ul}
                    icon="format_list_bulleted"
                    onClick={toggleStyle(ts, 'unordered-list-item')}
                  />
                </>
                <>
                  <EditorAction
                    title={i18n.horizontalRule}
                    icon="horizontal_rule"
                    onClick={insertHR}
                  />
                  <EditorAction
                    title={i18n.table}
                    icon="grid_on"
                    popover={{
                      className: 'insert-table-popover',
                      content: ({ closePopover }) => (
                        <TableInserterPopover
                          onSelect={(cols, rows) => insertTable({ cols, rows })}
                          closePopover={closePopover}
                        />
                      ),
                    }}
                  />
                </>
                <>
                  <EditorAction title={i18n.image} icon="insert_photo" />
                  <EditorAction title={i18n.video} icon="smart_display" />
                  <EditorAction title={i18n.file} icon="folder" />
                </>
                <>
                  <EditorAction title={i18n.emoji} icon="sentiment_satisfied_alt" />
                  <EditorAction title={i18n.sticker} icon="waving_hand" />
                </>
                <>
                  <EditorAction title={i18n.undo} icon="undo" onClick={undo} />
                  <EditorAction title={i18n.redo} icon="redo" onClick={redo} />
                </>
              </Stack>

              <div className="editor" ref={editorContainerRef}>
                <ContextMenu items={[]}>
                  <ScrollView
                    maxHeight={maxHeight}
                    minHeight={minHeight}
                    style={{ height: initialHeight }}
                  >
                    {renderEditor()}
                  </ScrollView>
                </ContextMenu>
              </div>

              {resizable && (
                <ResizeEditorHandle sendLog={sendLog} editorContainerRef={editorContainerRef} />
              )}
            </div>
          )}
        </RichTextEditorMaker>
      </div>
    )
  },
)
