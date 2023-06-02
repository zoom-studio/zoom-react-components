import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Badge, type BadgeNS, Button } from '../components'
import { color } from '../utils'
import { CommonStory, StoryPlayground, WithNumberStory } from './components'
import { useI18n } from './hooks/use-i18n'

const children = (
  <span
    style={{
      width: 60,
      height: 60,
      display: 'block',
      borderRadius: 10,
      background: color({ source: 'text', tone: 3 }),
    }}
  />
)

export default {
  title: 'Data display/Badge',
  component: Badge,
  args: {
    count: 10000,
    children: <Button>Some badge over this button</Button>,
    size: 'normal',
    dot: false,
    onClick: () => {
      alert("You've clicked on the badge")
    },
    overflowCount: 999,
    showZero: false,
    text: undefined,
    icon: undefined,
    offset: undefined,
    emoji: undefined,
    containerProps: undefined,
    color: undefined,
  },
} as Meta<typeof Badge>

export const Direction = () => {
  return (
    <WithNumberStory steps={100} max={10000} min={-10000} defaultValue={100}>
      {count => (
        <CommonStory
          component={Badge}
          stories={[
            {
              group: [
                { props: { children, count, direction: 'row' }, name: 'Row' },
                { props: { children, count, direction: 'row-reverse' }, name: 'Row reverse' },
                { props: { children, count, direction: 'column' }, name: 'Column' },
                { props: { children, count, direction: 'column-reverse' }, name: 'Column reverse' },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const showZero = () => {
  return (
    <CommonStory
      component={Badge}
      stories={[
        {
          group: [
            { props: { children, count: 0, showZero: false }, name: 'Do not show zero (Default)' },
            { props: { children, count: 0, showZero: true }, name: 'show zero' },
          ],
        },
      ]}
    />
  )
}

export const Icon = () => {
  return (
    <CommonStory
      component={Badge}
      stories={[
        {
          group: [
            {
              props: {
                children,
                icon: 'numbers',
                direction: 'row',
                color: color({ source: 'text' }),
              },
              name: 'Row',
            },
            {
              props: {
                children,
                icon: 'numbers',
                direction: 'row-reverse',
                color: color({ source: 'text' }),
              },
              name: 'Row reverse',
            },
            {
              props: {
                children,
                icon: 'numbers',
                direction: 'column',
                color: color({ source: 'text' }),
              },
              name: 'Column',
            },
            {
              props: {
                children,
                icon: 'numbers',
                direction: 'column-reverse',
                color: color({ source: 'text' }),
              },
              name: 'Column reverse',
            },
          ],
        },
      ]}
    />
  )
}

export const Emoji = () => {
  return (
    <CommonStory
      component={Badge}
      stories={[
        {
          group: [
            { props: { children, emoji: 'flag: Iran', direction: 'row' }, name: 'Row' },
            {
              props: { children, emoji: 'flag: Iran', direction: 'row-reverse' },
              name: 'Row reverse',
            },
            { props: { children, emoji: 'flag: Iran', direction: 'column' }, name: 'Column' },
            {
              props: { children, emoji: 'flag: Iran', direction: 'column-reverse' },
              name: 'Column reverse',
            },
          ],
        },
      ]}
    />
  )
}

export const OverflowCount = () => {
  return (
    <WithNumberStory steps={1} max={15} min={0} defaultValue={11}>
      {count => (
        <CommonStory
          component={Badge}
          stories={[
            { group: [{ props: { children, count, overflowCount: 10 }, name: 'No more than 10' }] },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const Offset = () => {
  return (
    <WithNumberStory steps={100} max={10000} min={-10000} defaultValue={100}>
      {count => (
        <CommonStory
          component={Badge}
          stories={[
            {
              title: 'X:-30% / Y:-30% (Default)',
              group: [
                { props: { children, count, direction: 'row' }, name: 'Row' },
                { props: { children, count, direction: 'row-reverse' }, name: 'Row reverse' },
                { props: { children, count, direction: 'column' }, name: 'Column' },
                { props: { children, count, direction: 'column-reverse' }, name: 'Column reverse' },
              ],
            },
            {
              title: 'X:20% / Y:20% (Custom)',
              group: [
                { props: { children, count, offset: 20, direction: 'row' }, name: 'Row' },
                {
                  props: { children, count, offset: 20, direction: 'row-reverse' },
                  name: 'Row reverse',
                },
                { props: { children, count, offset: 20, direction: 'column' }, name: 'Column' },
                {
                  props: { children, count, offset: 20, direction: 'column-reverse' },
                  name: 'Column reverse',
                },
              ],
            },
            {
              title: 'X:-50% / Y:-60% (Custom)',
              group: [
                { props: { children, count, offset: [-50, -60], direction: 'row' }, name: 'Row' },
                {
                  props: { children, count, offset: [-50, -60], direction: 'row-reverse' },
                  name: 'Row reverse',
                },
                {
                  props: { children, count, offset: [-50, -60], direction: 'column' },
                  name: 'Column',
                },
                {
                  props: { children, count, offset: [-50, -60], direction: 'column-reverse' },
                  name: 'Column reverse',
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const Colorizing = () => {
  return (
    <WithNumberStory steps={100} max={10000} min={-10000} defaultValue={100}>
      {count => (
        <CommonStory
          component={Badge}
          stories={[
            {
              group: [
                {
                  props: {
                    children,
                    count,
                    background: color => color({ source: 'warning' }),
                    color: 'black',
                  },
                  name: 'Number',
                },
                {
                  props: {
                    children,
                    icon: '16mp',
                    color: color => color({ source: 'text', tone: 1 }),
                  },
                  name: 'Icon',
                },
              ],
            },
          ]}
        />
      )}
    </WithNumberStory>
  )
}

export const Sizes = () => {
  return (
    <CommonStory
      component={Badge}
      stories={[
        {
          title: 'Numeral',
          group: [
            { props: { children, count: 20, size: 'small' }, name: 'Small' },
            { props: { children, count: 20, size: 'normal' }, name: 'Normal' },
            { props: { children, count: 20, size: 'large' }, name: 'Large' },
          ],
        },
        {
          title: 'Icon',
          group: [
            { props: { children, count: 20, icon: 'no_backpack', size: 'small' }, name: 'Small' },
            { props: { children, count: 20, icon: 'no_backpack', size: 'normal' }, name: 'Normal' },
            { props: { children, count: 20, icon: 'no_backpack', size: 'large' }, name: 'Large' },
          ],
        },
        {
          title: 'Emoji',
          group: [
            {
              props: { children, count: 20, emoji: 'right arrow curving down', size: 'small' },
              name: 'Small',
            },
            {
              props: { children, count: 20, emoji: 'right arrow curving down', size: 'normal' },
              name: 'Normal',
            },
            {
              props: { children, count: 20, emoji: 'right arrow curving down', size: 'large' },
              name: 'Large',
            },
          ],
        },
      ]}
    />
  )
}

export const DotStyle = () => {
  return (
    <CommonStory
      component={Badge}
      stories={[
        {
          group: [
            { props: { children, dot: true, size: 'small' }, name: 'Small' },
            { props: { children, dot: true, size: 'normal' }, name: 'Normal' },
            { props: { children, dot: true, size: 'large' }, name: 'Large' },
          ],
        },
      ]}
    />
  )
}

export const TextMode = () => {
  const { t } = useI18n('badge')
  const text = t('text')

  return (
    <CommonStory
      component={Badge}
      stories={[
        {
          title: 'Dot style',
          group: [
            { props: { text, size: 'small', dot: true, background: 'green' }, name: 'Small' },
            { props: { text, size: 'normal', dot: true, background: 'green' }, name: 'Normal' },
            { props: { text, size: 'large', dot: true, background: 'green' }, name: 'Large' },
          ],
        },
        {
          title: 'Numeral',
          group: [
            {
              props: { text, size: 'small', count: 515, background: 'green', color: 'white' },
              name: 'Small',
            },
            {
              props: { text, size: 'normal', count: 515, background: 'green', color: 'white' },
              name: 'Normal',
            },
            {
              props: { text, size: 'large', count: 515, background: 'green', color: 'white' },
              name: 'Large',
            },
          ],
        },
        {
          title: 'Icon',
          group: [
            { props: { text, size: 'small', color: 'green', icon: 'no_meals' }, name: 'Small' },
            { props: { text, size: 'normal', color: 'green', icon: 'no_meals' }, name: 'Normal' },
            { props: { text, size: 'large', color: 'green', icon: 'no_meals' }, name: 'Large' },
          ],
        },
        {
          title: 'Emoji',
          group: [
            { props: { text, size: 'small', color: 'green', emoji: 'panda' }, name: 'Small' },
            { props: { text, size: 'normal', color: 'green', emoji: 'panda' }, name: 'Normal' },
            { props: { text, size: 'large', color: 'green', emoji: 'panda' }, name: 'Large' },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<BadgeNS.Props> = props => {
  return <StoryPlayground component={Badge} props={props} />
}
