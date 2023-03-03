import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'
import { pullAt } from 'lodash'

import { ReactionRate, Tab, TabNS, Text } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

const getTabs = (
  everythingTogether: string,
  withoutChild: string,
  noneClosable: string,
  disabled: string,
  loading: string,
  emoji: string,
  icon: string,
  iconOnly: string,
  emojiOnly: string,
  withoutLink: string,
): TabNS.Tab[] => {
  return [
    {
      title: everythingTogether,
      children: (
        <>
          <ReactionRate /> <Text>{everythingTogether}</Text>
        </>
      ),
      closable: true,
      disabled: true,
      emoji: 'smiling face',
      icon: 'emoji_emotions',
      loading: true,
      link: '/',
    },
    {
      title: withoutLink,
      children: (
        <>
          <ReactionRate /> <Text>{withoutLink}</Text>
        </>
      ),
      closable: true,
      disabled: true,
      emoji: 'smiling face',
      icon: 'emoji_emotions',
      loading: true,
    },
    {
      title: withoutChild,
      closable: true,
    },
    {
      title: noneClosable,
      children: (
        <>
          <ReactionRate /> <Text>{noneClosable}</Text>
        </>
      ),
      closable: false,
    },
    {
      title: disabled,
      children: (
        <>
          <ReactionRate /> <Text>{disabled}</Text>
        </>
      ),
      closable: true,
      disabled: true,
    },
    {
      title: loading,
      children: (
        <>
          <ReactionRate /> <Text>{loading}</Text>
        </>
      ),
      closable: true,
      loading: true,
    },
    {
      title: emoji,
      children: (
        <>
          <ReactionRate /> <Text>{emoji}</Text>
        </>
      ),
      closable: true,
      emoji: 'smiling face',
    },
    {
      title: icon,
      children: (
        <>
          <ReactionRate /> <Text>{icon}</Text>
        </>
      ),
      closable: true,
      icon: 'emoji_emotions',
    },
    {
      children: (
        <>
          <ReactionRate /> <Text>{iconOnly}</Text>
        </>
      ),
      icon: 'emoji_emotions',
    },
    {
      children: (
        <>
          <ReactionRate /> <Text>{emojiOnly}</Text>
        </>
      ),
      emoji: 'smiling face',
    },
  ]
}

export default {
  title: 'Navigation/Tab',
  component: Tab,
  args: {
    activeTab: 0,
    tabsWidth: { min: 200 },
    tabs: getTabs(
      'Everything together',
      'Without child',
      'None closable',
      'Disabled',
      'Loading',
      'Emoji',
      'Icon',
      'Icon only',
      'Emoji only',
      'Without link',
    ),
  },
} as ComponentMeta<typeof Tab>

const useTabStory = (defaultActiveTab = 0) => {
  const { t } = useI18n('tab')
  const [activeTab, setActiveTab] = useState(defaultActiveTab)
  const [tabs, setTabs] = useState(
    getTabs(
      t('everythingTogether'),
      t('withoutChild'),
      t('noneClosable'),
      t('disabled'),
      t('loading'),
      t('emoji'),
      t('icon'),
      t('iconOnly'),
      t('emojiOnly'),
      t('withoutLink'),
    ),
  )

  const onChange = (newTabIndex: number) => {
    setActiveTab(newTabIndex)
  }

  const onClose = (tabIndex: number) => {
    const newTabs = [...tabs]
    pullAt(newTabs, [tabIndex])
    setTabs(newTabs)
  }

  const commonProps: TabNS.Props = {
    tabs,
    onChange,
    activeTab,
    onClose,
  }

  return { tabs, onChange, activeTab, onClose, commonProps }
}

export const TabsWidth: FC = () => {
  const { commonProps } = useTabStory()
  return (
    <CommonStory
      component={Tab}
      stories={[
        {
          group: [
            { name: 'Auto width (Default)', props: { ...commonProps, tabsWidth: 'auto' } },
            {
              name: 'With maximum allowed width',
              props: { ...commonProps, tabsWidth: { max: 100 } },
            },
            {
              name: 'With minimum allowed width',
              props: { ...commonProps, tabsWidth: { min: 200 } },
            },
            {
              name: 'With maximum & minimum allowed width',
              props: { ...commonProps, tabsWidth: { min: 200, max: 100 } },
            },
          ],
        },
      ]}
    />
  )
}

export const TabsBackground: FC = () => {
  const { commonProps } = useTabStory()
  return (
    <CommonStory
      component={Tab}
      stories={[
        {
          group: [
            { name: 'layer-1 (Default)', props: commonProps },
            {
              name: 'Custom background',
              props: { ...commonProps, background: color => color({ source: 'layer', tone: 2 }) },
            },
          ],
        },
      ]}
    />
  )
}

export const DefaultActiveTab: FC = () => {
  const { commonProps } = useTabStory(3)
  return <CommonStory component={Tab} stories={[{ group: [{ props: commonProps }] }]} />
}

export const CustomScrollViewProps: FC = () => {
  const { commonProps } = useTabStory()
  return (
    <CommonStory
      component={Tab}
      stories={[{ group: [{ props: { ...commonProps, scrollViewProps: { autoHide: false } } }] }]}
    />
  )
}

export const Playground: FC<TabNS.Props> = props => {
  return <StoryPlayground component={Tab} props={props} />
}
