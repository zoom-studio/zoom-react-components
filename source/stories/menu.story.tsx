import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Menu, MenuNS } from '../components'
import { enMenuItems, faMenuItems } from '../fixtures'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'
import { useSettings } from './hooks/use-settings'
import { useZoomContext } from '../hooks'

export default {
  title: 'Menu/Menu',
  component: Menu,
  args: {
    items: enMenuItems,
    children: 'Click me',
  },
} as ComponentMeta<typeof Menu>

const useMenuStory = () => {
  const { t } = useI18n('menu')
  const { language, isRTL } = useSettings()
  const children = t('buttonTitle')
  const simpleItems = (
    props?: MenuNS.Item,
    active?: (index: number) => boolean,
    disabled?: (index: number) => boolean,
  ): MenuNS.Item[] => {
    return Array.from(Array(5)).map((_, index) => ({
      title: t(`menu${index + 1}`),
      isActive: !!active?.(index),
      isDisabled: !!disabled?.(index),
      ...props,
    }))
  }
  return { t, simpleItems, children, language, isRTL }
}

export const Playground: FC<MenuNS.Props> = props => {
  return <StoryPlayground component={Menu} props={props} />
}

export const Basic: FC = () => {
  const { simpleItems, children, isRTL } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[{ group: [{ props: { items: simpleItems(), children, isRTL } }] }]}
    />
  )
}

export const Nested: FC = () => {
  const { children, language, isRTL } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [
            { props: { items: language === 'en' ? enMenuItems : faMenuItems, children, isRTL } },
          ],
        },
      ]}
    />
  )
}

export const CallbackFunction: FC = () => {
  const { simpleItems, children, isRTL } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [
            { props: { items: simpleItems({ onClick: () => alert('Click') }), children, isRTL } },
          ],
        },
      ]}
    />
  )
}

export const LinkedItems: FC = () => {
  const { simpleItems, children, isRTL } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[{ group: [{ props: { items: simpleItems({ link: '/' }), children, isRTL } }] }]}
    />
  )
}

export const ActiveItems: FC = () => {
  const { simpleItems, children, isRTL } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [
            { props: { items: simpleItems(undefined, index => index === 2), children, isRTL } },
          ],
        },
      ]}
    />
  )
}

export const WithSeparator: FC = () => {
  const { simpleItems, children, isRTL } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [
            {
              props: {
                items: [...simpleItems(), { isSeparator: true }, ...simpleItems()],
                children,
                isRTL,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const DisabledItems: FC = () => {
  const { simpleItems, children, isRTL } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [
            {
              props: {
                items: simpleItems(
                  undefined,
                  index => index === 4,
                  index => index === 2 || index === 4,
                ),
                children,
                isRTL,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Accelerator: FC = () => {
  const { simpleItems, children, isRTL } = useMenuStory()
  const { setIsDarwin } = useZoomContext()

  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [
            {
              name: 'With command on MacOS',
              props: {
                items: simpleItems(
                  { accelerator: { ctrlOrCmd: true, otherKeys: ['X', 'Y', 'Z'] } },
                  index => index === 4,
                  index => index === 2 || index === 4,
                ),
                children,
                isRTL,
                onOpen: () => setIsDarwin(true),
              },
            },
            {
              name: 'With control on Windows',
              props: {
                items: simpleItems(
                  { accelerator: { ctrlOrCmd: true, otherKeys: ['X', 'Y', 'Z'] } },
                  index => index === 4,
                  index => index === 2 || index === 4,
                ),
                children,
                onOpen: () => setIsDarwin(false),
              },
            },
          ],
        },
      ]}
    />
  )
}
