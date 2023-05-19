import React, { FC } from 'react'

import { faker } from '@faker-js/faker'
import { ComponentMeta } from '@storybook/react'

import { RichTextEditor, RichTextEditorNS } from '../components'

import { generateExplorerFiles } from '../fixtures'
import { StoryPlayground } from './components'

export default {
  title: 'Data entry/Rich text editor',
  component: RichTextEditor,
  args: {
    id: 'playground-rich-text-editor',
    initialHeight: 700,
    imageExplorerProps: {
      files: generateExplorerFiles(100),
    },
    videoExplorerProps: {
      files: generateExplorerFiles(100),
    },
    fileExplorerProps: {
      files: generateExplorerFiles(100),
    },
    editorProps: {
      placeholder: 'شروع به نوشتن متن جدید...',
      enableMention: {
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
      },
      enableHashtag: {
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
      },
    },
  },
} as ComponentMeta<typeof RichTextEditor>

export const Playground: FC<RichTextEditorNS.Props> = props => {
  return (
    <>
      <StoryPlayground component={RichTextEditor} props={props} />
    </>
  )
}
