import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Menu, type MenuNS } from '../components'
import { enMenuItems, faMenuItems } from '../fixtures'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'
import { useSettings } from './hooks/use-settings'
import { useZoomContext } from '../hooks'

export default {
  title: 'Navigation/Menu',
  component: Menu,
  args: {
    items: enMenuItems,
    children: 'Click me',
  },
} as Meta<typeof Menu>

const useMenuStory = () => {
  const { t } = useI18n('menu')
  const { language } = useSettings()
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
  return { t, simpleItems, children, language }
}

export const Basic: FC = () => {
  const { simpleItems, children } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[{ group: [{ props: { items: simpleItems(), children } }] }]}
    />
  )
}

export const Nested: FC = () => {
  const { children, language } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [{ props: { items: language === 'en' ? enMenuItems : faMenuItems, children } }],
        },
      ]}
    />
  )
}

export const CallbackFunction: FC = () => {
  const { simpleItems, children } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [
            {
              props: {
                items: simpleItems({
                  onClick: () => {
                    alert('Click')
                  },
                }),
                children,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const LinkedItems: FC = () => {
  const { simpleItems, children } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[{ group: [{ props: { items: simpleItems({ link: '/' }), children } }] }]}
    />
  )
}

export const ActiveItems: FC = () => {
  const { simpleItems, children } = useMenuStory()
  return (
    <CommonStory
      component={Menu}
      stories={[
        {
          group: [{ props: { items: simpleItems(undefined, index => index === 2), children } }],
        },
      ]}
    />
  )
}

export const WithSeparator: FC = () => {
  const { simpleItems, children } = useMenuStory()
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
              },
            },
          ],
        },
      ]}
    />
  )
}

export const DisabledItems: FC = () => {
  const { simpleItems, children } = useMenuStory()
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
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Accelerator: FC = () => {
  const { simpleItems, children } = useMenuStory()
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
                onOpen: () => {
                  setIsDarwin(true)
                },
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
                onOpen: () => {
                  setIsDarwin(false)
                },
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<MenuNS.Props> = props => {
  return <StoryPlayground component={Menu} props={props} />
}
