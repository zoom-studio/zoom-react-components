import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { FilterButton, type FilterButtonNS, useMessage } from '..'
import { CommonStory, StoryPlayground, ToggleStory } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Call To Action/Filter button',
  component: FilterButton,
  args: {
    color: 'yellow',
    size: 'normal',
    disabled: false,
    target: '_self',
    loading: false,
    active: false,
    disabledOnLoading: true,
    suffixEmojiIcon: undefined,
    suffixMaterialIcon: undefined,
    children: 'A sample of filter button',
    className: '',
    href: '',
    useSpan: false,
  },
} as Meta<typeof FilterButton>

const useFilterButtonStory = () => {
  const { t } = useI18n('filterButton')
  const title1 = t('title1')
  const title2 = t('title2')
  const title3 = t('title3')
  return { title1, title2, title3 }
}

export const Active: FC = () => {
  const { title1, title2 } = useFilterButtonStory()
  return (
    <CommonStory
      component={FilterButton}
      stories={[
        {
          group: [
            {
              name: 'Active',
              props: {
                active: true,
                children: title1,
                color: color => color({ source: 'accent' }),
              },
            },
            {
              name: 'Inactive',
              props: {
                active: false,
                children: title2,
                color: color => color({ source: 'accent' }),
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Sizes: FC = () => {
  const { title1, title2, title3 } = useFilterButtonStory()
  return (
    <ToggleStory>
      {(status, toggleStatus) => (
        <CommonStory
          component={FilterButton}
          stories={[
            {
              group: [
                {
                  name: 'Small',
                  props: {
                    size: 'small',
                    active: status,
                    onClick: toggleStatus,
                    children: title1,
                    color: color => color({ source: 'accent' }),
                  },
                },
                {
                  name: 'Normal',
                  props: {
                    size: 'normal',
                    active: status,
                    onClick: toggleStatus,
                    children: title2,
                    color: color => color({ source: 'accent' }),
                  },
                },
                {
                  name: 'Large',
                  props: {
                    size: 'large',
                    active: status,
                    onClick: toggleStatus,
                    children: title3,
                    color: color => color({ source: 'accent' }),
                  },
                },
              ],
            },
          ]}
        />
      )}
    </ToggleStory>
  )
}

export const Color: FC = () => {
  const { title1, title2, title3 } = useFilterButtonStory()
  return (
    <ToggleStory>
      {(status, toggleStatus) => (
        <CommonStory
          component={FilterButton}
          stories={[
            {
              group: [
                {
                  name: 'Warning (From vars)',
                  props: {
                    active: status,
                    onClick: toggleStatus,
                    children: title1,
                    color: color => color({ source: 'warning' }),
                  },
                },
                {
                  name: 'Error (From vars)',
                  props: {
                    active: status,
                    onClick: toggleStatus,
                    children: title2,
                    color: color => color({ source: 'error' }),
                  },
                },
                {
                  name: 'Purple (Custom)',
                  props: {
                    active: status,
                    onClick: toggleStatus,
                    children: title3,
                    color: 'purple',
                  },
                },
              ],
            },
          ]}
        />
      )}
    </ToggleStory>
  )
}

export const Linked: FC = () => {
  const { title1 } = useFilterButtonStory()
  const { toast } = useMessage()

  return (
    <ToggleStory>
      {(status, toggleStatus) => (
        <CommonStory
          component={FilterButton}
          stories={[
            {
              group: [
                {
                  name: 'With link',
                  props: {
                    active: status,
                    onClick: () => {
                      toggleStatus()
                      toast.info("You've clicked on a linked filter button")
                    },
                    children: title1,
                    color: color => color({ source: 'accent' }),
                    href: '/',
                  },
                },
                {
                  name: 'Without link',
                  props: {
                    active: status,
                    onClick: () => {
                      toggleStatus()
                      toast.info("You've clicked on a none-linked filter button")
                    },
                    children: title1,
                    color: color => color({ source: 'accent' }),
                  },
                },
              ],
            },
          ]}
        />
      )}
    </ToggleStory>
  )
}

export const Disabled: FC = () => {
  const { title1, title2 } = useFilterButtonStory()
  return (
    <CommonStory
      component={FilterButton}
      stories={[
        {
          group: [
            {
              name: 'Inactive disabled',
              props: {
                disabled: true,
                active: false,
                children: title1,
                color: color => color({ source: 'accent' }),
              },
            },
            {
              name: 'Active disabled',
              props: {
                disabled: true,
                active: true,
                children: title2,
                color: color => color({ source: 'accent' }),
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Loading: FC = () => {
  const { title1, title2, title3 } = useFilterButtonStory()
  return (
    <ToggleStory>
      {(status, toggleStatus) => (
        <CommonStory
          component={FilterButton}
          stories={[
            {
              group: [
                {
                  name: 'Loading',
                  props: {
                    loading: true,
                    active: status,
                    onClick: toggleStatus,
                    children: title1,
                    color: color => color({ source: 'accent' }),
                  },
                },
                {
                  name: 'Loading but not disabled',
                  props: {
                    loading: true,
                    disabledOnLoading: false,
                    active: status,
                    onClick: toggleStatus,
                    children: title2,
                    color: color => color({ source: 'accent' }),
                  },
                },
                {
                  name: 'Normal',
                  props: {
                    active: status,
                    onClick: toggleStatus,
                    children: title3,
                    color: color => color({ source: 'accent' }),
                  },
                },
              ],
            },
          ]}
        />
      )}
    </ToggleStory>
  )
}

export const Prefix: FC = () => {
  const { title1 } = useFilterButtonStory()
  return (
    <ToggleStory>
      {(status, toggleStatus) => (
        <CommonStory
          component={FilterButton}
          stories={[
            {
              group: [
                {
                  name: 'Material icon',
                  props: {
                    active: status,
                    onClick: toggleStatus,
                    children: title1,
                    color: color => color({ source: 'accent' }),
                    prefixMaterialIcon: 'launch',
                  },
                },
                {
                  name: 'Emoji',
                  props: {
                    active: status,
                    onClick: toggleStatus,
                    children: title1,
                    color: color => color({ source: 'accent' }),
                    prefixEmojiIcon: 'honey pot',
                  },
                },
              ],
            },
          ]}
        />
      )}
    </ToggleStory>
  )
}

export const Playground: FC<FilterButtonNS.Props> = props => (
  <ToggleStory>
    {(status, toggleStatus) => (
      <StoryPlayground
        props={{ ...props, onClick: toggleStatus, active: status }}
        component={FilterButton}
      />
    )}
  </ToggleStory>
)
