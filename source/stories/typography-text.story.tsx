import React, { FC, ReactNode } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Text, TypographyNS } from '..'
import { CommonStory, CommonStoryNS, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'
import { color } from '../utils'
import { COMMON_SIZES } from '../constants'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'Some text here...',
    style: { color: color({ source: 'text' }) },
  },
} as ComponentMeta<typeof Text>

const { TextNS } = TypographyNS

const generateTexts = (children: ReactNode) => {
  const stories: CommonStoryNS.Story<TypographyNS.TextNS.Props>[] = []
  for (const size of COMMON_SIZES) {
    stories.push({
      title: `Size: ${size}`,
      group: TextNS.Types.map(type => ({
        name: `Type: ${type}`,
        props: {
          children,
          type,
          size,
        },
      })),
    })
  }
  return stories
}

export const TypesAndSizes: FC = () => {
  const { t } = useI18n('text')
  return <CommonStory component={Text} stories={generateTexts(t('sampleText'))} />
}

export const Playground: FC<TypographyNS.TextNS.Props> = props => {
  return <StoryPlayground component={Text} props={props} />
}
