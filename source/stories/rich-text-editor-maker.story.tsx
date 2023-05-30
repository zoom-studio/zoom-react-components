import React, { type FC, useState } from 'react'

import { type Meta } from '@storybook/react'
import { randomImage } from '@zoom-studio/zoom-js-ts-utils'

import {
  type ButtonNS,
  RichTextEditorMaker,
  type RichTextEditorMakerNS,
  Stack,
  Text,
} from '../components'
import { type RichTextEditorMakerProviderNS } from '../components/rich-text-editor-maker/provider'
import { FULL_FEATURE_RICH_TEXT } from '../fixtures'
import { color } from '../utils'
import { WithButtonsStory } from './components'
import { faker } from '@faker-js/faker'

export default {
  title: 'Utility/Rich text editor maker',
  component: RichTextEditorMaker,
  args: {
    defaultValue: JSON.parse(FULL_FEATURE_RICH_TEXT),
    collapseOnEscape: true,
    saveDraft: true,
    searchQuery: '',
    placeholder: 'Start writing something special...',
    enableHashtag: {
      hashtags: Array.from(Array(20)).map(faker.color.human),
    },
    enableMention: {
      usernames: Array.from(Array(20)).map(faker.color.human),
    },
    style: {
      border: `1px solid ${color({ source: 'border', tone: 2 })}`,
      color: color({ source: 'text', tone: 2 }),
    },
  },
} as Meta<typeof RichTextEditorMaker>

export const Playground: FC<RichTextEditorMakerNS.Props & RichTextEditorMakerProviderNS.Props> = ({
  defaultValue,
  enableHashtag,
  enableMention,
  saveDraft,
  ...props
}) => {
  const VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4'
  const buttonProps: ButtonNS.Props = { type: 'dashed', size: 'small' }

  const hashtags = enableHashtag?.hashtags ?? []
  const usernames = enableMention?.usernames ?? []

  const [hashtagIndex, setHashtagIndex] = useState(0)
  const [mentionIndex, setMentionIndex] = useState(0)

  const hashtagOptions: RichTextEditorMakerProviderNS.HashtagSettings = {
    hashtags,
    onArrowDown: ({ hashtag }) => {
      setHashtagIndex(index => (index === hashtag.foundHashtags.length - 1 ? 0 : index + 1))
    },
    onArrowUp: ({ hashtag }) => {
      setHashtagIndex(index => (index === 0 ? hashtag.foundHashtags.length - 1 : index - 1))
    },
    onEnter: ({ handlers, hashtag }) => {
      handlers.insertHashtag({ displayName: hashtag.foundHashtags[hashtagIndex] })
    },
  }

  const mentionOptions: RichTextEditorMakerProviderNS.MentionSettings = {
    usernames,
    onArrowDown: ({ mention }) => {
      setMentionIndex(index => (index === mention.foundUsernames.length - 1 ? 0 : index + 1))
    },
    onArrowUp: ({ mention }) => {
      setMentionIndex(index => (index === 0 ? mention.foundUsernames.length - 1 : index - 1))
    },
    onEnter: ({ handlers, mention }) => {
      handlers.insertMention({ displayName: mention.foundUsernames[mentionIndex] })
    },
  }

  const renderList = (items: string[], activeIndex: number) => (
    <ul
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: 'fit-content',
        margin: 'auto',
        background: '#000000a8',
        zIndex: 3,
        listStyle: 'none',
        padding: '10px 16px',
        borderRadius: '10px 10px 0 0',
      }}
    >
      {items.map((item, index) => (
        <li
          key={index}
          style={{
            color: color({ source: 'text' }),
            background: index === activeIndex ? color({ source: 'layer', tone: 2 }) : 'transparent',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <RichTextEditorMaker.provider
        id="playground-rich-text-editor-maker"
        defaultValue={defaultValue}
        enableHashtag={hashtagOptions}
        enableMention={mentionOptions}
        saveDraft={saveDraft}
      >
        {({ hashtag, mention, providerEditor }) => (
          <RichTextEditorMaker {...props} editor={providerEditor}>
            {handlers => {
              return (
                <>
                  <WithButtonsStory
                    groupedButtons={false}
                    secondaryChild={
                      <Stack
                        direction="column"
                        align="flex-start"
                        style={{ color: color({ source: 'text' }), margin: '20px 0' }}
                      >
                        <Text style={{ margin: 0 }}>
                          Is blank URL: {`${handlers.selectionLink.openInNewTab}`}
                        </Text>
                        <Text style={{ margin: 0 }}>
                          Is no-follow URL: {`${handlers.selectionLink.noFollow}`}
                        </Text>
                        <Text style={{ margin: 0 }}>
                          Current URL: {handlers.selectionLink.url || 'NO-LINK'}
                        </Text>
                      </Stack>
                    }
                    buttons={[
                      {
                        ...buttonProps,
                        active: handlers.isActive('h1'),
                        children: 'Heading 1',
                        onClick: handlers.toggleHeading(1),
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('h2'),
                        children: 'Heading 2',
                        onClick: handlers.toggleHeading(2),
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('h3'),
                        children: 'Heading 3',
                        onClick: handlers.toggleHeading(3),
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('h4'),
                        children: 'Heading 4',
                        onClick: handlers.toggleHeading(4),
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('bold'),
                        children: 'Bold',
                        onClick: handlers.toggleBold,
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('italic'),
                        children: 'Italic',
                        onClick: handlers.toggleItalic,
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('underline'),
                        children: 'Underline',
                        onClick: handlers.toggleUnderline,
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('strikethrough'),
                        children: 'Strikethrough',
                        onClick: handlers.toggleStrikethrough,
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('quote'),
                        children: 'Quote',
                        onClick: handlers.toggleQuote,
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('link'),
                        children: 'Link',
                        onClick: () => {
                          handlers.insertLink({ url: 'example.com' })
                        },
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('highlight'),
                        children: 'Highlight',
                        onClick: handlers.toggleHighlight,
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('ordered-list'),
                        children: 'Ordered list',
                        onClick: handlers.toggleList('ordered-list'),
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('unordered-list'),
                        children: 'Unordered list',
                        onClick: handlers.toggleList('unordered-list'),
                      },
                      {
                        ...buttonProps,
                        children: 'rule',
                        onClick: handlers.insertRule,
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('table'),
                        children: 'Table',
                        onClick: () => {
                          handlers.insertTable({ cols: 5, rows: 5 })
                        },
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('emoji'),
                        children: 'Emoji',
                        onClick: () => {
                          handlers.insertEmoji('smiling face')
                        },
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('mention'),
                        children: 'Mention',
                        onClick: () => {
                          handlers.insertMention({ displayName: 'mention' })
                        },
                      },
                      {
                        ...buttonProps,
                        active: handlers.isActive('hashtag'),
                        children: 'Hashtag',
                        onClick: () => {
                          handlers.insertHashtag({ displayName: 'hashtag' })
                        },
                      },
                      {
                        ...buttonProps,
                        children: 'Video',
                        onClick: () => {
                          handlers.insertVideo({ src: VIDEO })
                        },
                      },
                      {
                        ...buttonProps,
                        children: 'Focus editor',
                        onClick: handlers.focusEditor,
                      },
                      {
                        ...buttonProps,
                        children: 'Remove link',
                        onClick: handlers.removeLink,
                      },
                      {
                        ...buttonProps,
                        children: 'Undo',
                        onClick: handlers.undo,
                      },
                      {
                        ...buttonProps,
                        children: 'Redo',
                        onClick: handlers.redo,
                      },
                      {
                        ...buttonProps,
                        children: 'Image',
                        onClick: () => {
                          handlers.insertImage({ src: randomImage(undefined, undefined, 'cats') })
                        },
                      },
                      {
                        ...buttonProps,
                        children: 'File',
                        onClick: () => {
                          handlers.insertFile({
                            name: 'some-file-name.pdf',
                            size: 12365842,
                            src: VIDEO,
                            type: 'pdf',
                          })
                        },
                      },
                    ]}
                  >
                    {hashtag.shouldRenderList && (
                      <>{renderList(hashtag.foundHashtags, hashtagIndex)}</>
                    )}

                    {mention.shouldRenderList && (
                      <>{renderList(mention.foundUsernames, mentionIndex)}</>
                    )}

                    {handlers.renderEditor()}
                  </WithButtonsStory>
                </>
              )
            }}
          </RichTextEditorMaker>
        )}
      </RichTextEditorMaker.provider>
    </>
  )
}
