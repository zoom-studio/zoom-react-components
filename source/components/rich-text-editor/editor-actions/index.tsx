import React, { Dispatch, FC, SetStateAction } from 'react'

import { EditorState, RichUtils } from 'draft-js'

import { Divider, EmojiNS, EmojiPicker, IconNS, Popover, Stack } from '../..'

import { RichTextEditorNS } from '..'
import { UseObjectedStateNS } from '../../../hooks'
import { LinkInserter, LinkInserterNS, onCloseLinkPopover, removeLink } from '../link-inserter'
import { useRichTextEditorI18n } from '../use-i18n'
import { ActionButton } from './action-button'

export namespace EditorActionsNS {
  export interface Action<StyleType, Content> {
    label: string
    style: StyleType
    content: Content
  }

  export interface Props {
    editorState: EditorState
    setEditorState: Dispatch<SetStateAction<EditorState>>
    i18n: ReturnType<typeof useRichTextEditorI18n>
    validateURL: LinkInserterNS.Props['isValidURL']
    updaterKey: number
    linkURL: UseObjectedStateNS.ReturnType<string>
    blankedLink: UseObjectedStateNS.ReturnType<boolean>
    noFollowedLink: UseObjectedStateNS.ReturnType<boolean>
    toggleBlockStyle: (blockType: RichTextEditorNS.BlockTypes) => void
    toggleInlineStyle: (inlineType: RichTextEditorNS.InlineTypes) => void
    handleCreateEmoji: (emojiName: EmojiNS.Emojis.Names) => void
    focusEditor: () => void
  }
}

export const EditorActions: FC<EditorActionsNS.Props> = ({
  editorState,
  setEditorState,
  i18n,
  updaterKey,
  toggleBlockStyle,
  toggleInlineStyle,
  focusEditor,
  validateURL,
  handleCreateEmoji,
  blankedLink,
  linkURL,
  noFollowedLink,
}) => {
  const HEADINGS: EditorActionsNS.Action<RichTextEditorNS.BlockTypes, string>[] = [
    { label: i18n.heading1, style: 'header-one', content: 'H1' },
    { label: i18n.heading2, style: 'header-two', content: 'H2' },
    { label: i18n.heading3, style: 'header-three', content: 'H3' },
    { label: i18n.heading4, style: 'header-four', content: 'H4' },
  ]

  const INLINE_STYLES: EditorActionsNS.Action<RichTextEditorNS.InlineTypes, IconNS.Names>[] = [
    { label: i18n.bold, style: 'BOLD', content: 'format_bold' },
    { label: i18n.italic, style: 'ITALIC', content: 'format_italic' },
    { label: i18n.underline, style: 'UNDERLINE', content: 'format_underlined' },
  ]

  const LISTS: EditorActionsNS.Action<RichTextEditorNS.BlockTypes, IconNS.Names>[] = [
    { label: i18n.ol, style: 'ordered-list-item', content: 'format_list_numbered' },
    { label: i18n.ul, style: 'unordered-list-item', content: 'format_list_bulleted' },
  ]

  const isCursorOverLink = RichUtils.currentBlockContainsLink(editorState)

  const selection = editorState.getSelection()

  const currentInlineStyle = editorState.getCurrentInlineStyle()

  const currentBlockStyle = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType() as RichTextEditorNS.BlockTypes

  return (
    <Stack className="editor-handlers" dividers={<Divider vertical />} spacing={0} broken>
      <>
        {HEADINGS.map((heading, index) => (
          <ActionButton
            key={index}
            onClick={() => toggleBlockStyle(heading.style)}
            title={heading.label}
            content={heading.content}
            isActive={currentBlockStyle === heading.style}
          />
        ))}
      </>

      <>
        {INLINE_STYLES.map((inlineStyle, index) => (
          <ActionButton
            key={index}
            onClick={() => toggleInlineStyle(inlineStyle.style)}
            title={inlineStyle.label}
            icon={inlineStyle.content}
            isActive={currentInlineStyle.has(inlineStyle.style)}
          />
        ))}

        <ActionButton
          onClick={() => toggleBlockStyle('blockquote')}
          title={i18n.blockquote}
          icon="format_quote"
          isActive={currentBlockStyle === 'blockquote'}
        />
      </>

      <>
        <Popover
          trigger="click"
          placement="bottom"
          className="insert-link-popover"
          onClose={onCloseLinkPopover(linkURL, noFollowedLink, blankedLink)}
          content={
            !selection.isCollapsed() && (
              <LinkInserter
                editorState={editorState}
                setEditorState={setEditorState}
                focusEditor={focusEditor}
                linkURL={linkURL}
                linkPlaceholder={i18n.linkURLPlaceholder}
                confirmText={i18n.confirmLinkButton}
                noFollowedLink={noFollowedLink}
                blankedLink={blankedLink}
                isValidURL={validateURL}
              />
            )
          }
        >
          <ActionButton
            title={i18n.link}
            icon="link"
            isActive={isCursorOverLink}
            disabled={selection.isCollapsed()}
          />
        </Popover>

        <ActionButton
          onClick={removeLink(editorState, setEditorState)}
          title="remove link"
          icon="link_off"
          disabled={!isCursorOverLink}
        />
      </>

      <>
        {LISTS.map((list, index) => (
          <ActionButton
            key={index}
            onClick={() => toggleBlockStyle(list.style)}
            title={list.label}
            icon={list.content}
            isActive={currentBlockStyle === list.style}
          />
        ))}
      </>

      <>
        <Popover
          content={<EmojiPicker key={updaterKey} onSelect={handleCreateEmoji} />}
          trigger="click"
          placement="bottom"
          className="emoji-picker-popover"
        >
          <ActionButton title={i18n.emoji} icon="sentiment_satisfied_alt" />
        </Popover>

        <ActionButton title={i18n.image} icon="insert_photo" />

        <ActionButton title={i18n.file} icon="folder" />
      </>
    </Stack>
  )
}
