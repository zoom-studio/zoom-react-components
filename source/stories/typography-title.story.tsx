import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Title, type TypographyNS } from '../components'
import { color } from '../utils'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Typography/Title',
  component: Title,
  args: {
    children: 'Some text here...',
    style: { color: color({ source: 'text' }) },
  },
} as Meta<typeof Title>

export const HeadingVariants: FC = () => {
  const { t } = useI18n('title')
  return (
    <CommonStory
      component={Title}
      stories={[
        {
          group: [
            { name: 'Heading 1', props: { h1: true, children: t('sampleText') } },
            { name: 'Heading 2', props: { h2: true, children: t('sampleText') } },
            { name: 'Heading 3', props: { h3: true, children: t('sampleText') } },
            { name: 'Heading 4', props: { h4: true, children: t('sampleText') } },
            { name: 'Heading 5', props: { h5: true, children: t('sampleText') } },
            { name: 'Heading 6', props: { h6: true, children: t('sampleText') } },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<TypographyNS.TitleNS.Props> = props => {
  return <StoryPlayground component={Title} props={props} />
}
