import React, { FC, ReactNode } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, ButtonNS } from '..'
import { CommonStory, CommonStoryNS, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'
import { COMMON_VARIANTS } from '../constants/common-variants'

export default {
  title: 'Call To Action/Button',
  component: Button,
  args: {
    disabled: false,
    loading: false,
    full: false,
    active: false,
    type: 'primary',
    variant: 'neutral',
    size: 'normal',
    htmlType: 'button',
    target: '_blank',
    innerClassName: 'class-for-inner-child',
    children: 'Sample button',
  },
} as ComponentMeta<typeof Button>

const generateVariantsAndTypes = (
  children: ReactNode,
  disabled?: boolean,
): CommonStoryNS.Story<ButtonNS.Props>[] => {
  const stories: CommonStoryNS.Story<ButtonNS.Props>[] = []
  for (const variant of COMMON_VARIANTS) {
    stories.push({
      title: `Variant: ${variant}`,
      group: ButtonNS.Types.map(type => ({
        name: `Type: ${type}`,
        props: {
          children,
          type,
          variant,
          disabled,
        },
      })),
    })
  }
  return stories
}

export const Playground: FC<ButtonNS.Props> = props => (
  <StoryPlayground props={props} component={Button} />
)

export const Sizes: FC<ButtonNS.Props> = () => {
  const { t } = useI18n('button')
  return (
    <CommonStory
      component={Button}
      stories={[
        {
          group: [
            { props: { size: 'small', children: t('sizingTitle') }, name: 'Small' },
            { props: { size: 'normal', children: t('sizingTitle') }, name: 'Normal' },
            { props: { size: 'large', children: t('sizingTitle') }, name: 'Large' },
          ],
        },
      ]}
    />
  )
}

export const VariantsAndTypes: FC<ButtonNS.Props> = () => {
  const { t } = useI18n('button')
  return (
    <CommonStory component={Button} stories={generateVariantsAndTypes(t('disabledTitle'), false)} />
  )
}

export const Disabled: FC<ButtonNS.Props> = () => {
  const { t } = useI18n('button')
  return (
    <CommonStory component={Button} stories={generateVariantsAndTypes(t('disabledTitle'), true)} />
  )
}

export const Loading: FC<ButtonNS.Props> = () => {
  const { t } = useI18n('button')
  return (
    <CommonStory
      component={Button}
      stories={[
        {
          group: [
            {
              props: { size: 'small', children: t('loadingTitle'), loading: true },
              name: 'Loading / Small',
            },
            {
              props: { size: 'normal', children: t('loadingTitle'), loading: true },
              name: 'Loading / Normal',
            },
            {
              props: { size: 'large', children: t('loadingTitle'), loading: true },
              name: 'Loading / Large',
            },
          ],
        },
      ]}
    />
  )
}

export const IconAndEmoji: FC<ButtonNS.Props> = () => {
  const { t } = useI18n('button')
  const children = t('sampleTitle')

  return (
    <CommonStory
      component={Button}
      stories={[
        {
          title: 'Material icon',
          group: [
            { props: { children, prefixMaterialIcon: 'add_box' }, name: 'Prefix' },
            { props: { children, suffixMaterialIcon: 'add_box' }, name: 'Suffix' },
          ],
        },
        {
          title: 'Emoji',
          group: [
            { props: { children, prefixEmojiIcon: 'automobile' }, name: 'Prefix' },
            { props: { children, suffixEmojiIcon: 'heart hands' }, name: 'Suffix' },
          ],
        },
      ]}
    />
  )
}
