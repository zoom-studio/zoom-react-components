import React, { type FC } from 'react'

import { faker } from '@faker-js/faker'
import { type Meta } from '@storybook/react'
import { Dated, randomNumber } from '@zoom-studio/js-ts-utils'

import { ReactionRate, Timeline, type TimelineNS } from '../components'
import { EMOJI_NAMES } from '../components/emoji/constants'
import { ICON_NAMES } from '../components/icon/constants/icon-names'
import { COMMON_VARIANTS } from '../constants'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

const generateItem = (customSetting?: Partial<TimelineNS.Item>): TimelineNS.Item => {
  const signDice = randomNumber({ min: 0, max: 4 })
  const stateDice = randomNumber({ min: 0, max: 4 })
  const emojiNameDice = randomNumber({ min: 0, max: 100 })
  const iconNameDice = randomNumber({ min: 0, max: 100 })
  const passStateDice = randomNumber({ min: 0, max: 1 })

  return {
    children: <ReactionRate />,
    datetime: new Dated().format(),
    loading: signDice === 4,
    state: passStateDice === 0 ? [COMMON_VARIANTS[stateDice], faker.lorem.sentence()] : undefined,
    sign:
      signDice === 0
        ? { emoji: EMOJI_NAMES[emojiNameDice] }
        : signDice === 1
        ? { icon: ICON_NAMES[iconNameDice] }
        : signDice === 2
        ? 'auto'
        : 'number',
    ...customSetting,
  }
}

const generateItems = (
  length = 10,
  customSetting?: Partial<TimelineNS.Item>,
): TimelineNS.Item[] => {
  return Array.from(Array(length)).map(() => generateItem(customSetting))
}

export default {
  title: 'Data display/Timeline',
  component: Timeline,
  args: {
    items: Array.from(Array(3)).map(() => ({
      children: <ReactionRate />,
      datetime: new Dated().format(),
      loading: false,
      sign: 'auto',
      state: ['neutral', faker.lorem.sentence()],
    })),
    title: 'Some timeline title',
    direction: 'column',
    reverse: false,
    continues: true,
    stickyTitle: true,
    maxHeight: 'unset',
    inProgressIndex: 1,
    scrollViewProps: undefined,
    stateMessageProps: undefined,
    className: 'my-timeline',
    id: 'my-timeline',
    containerProps: undefined,
    onClick: undefined,
    style: {},
  },
} as Meta<typeof Timeline>

export const OrderAndDirection = () => {
  return (
    <CommonStory
      component={Timeline}
      stories={[
        {
          group: [
            { name: 'Column (Default)', props: { items: generateItems(3) } },
            { name: 'Column and reverse', props: { items: generateItems(3), reverse: true } },
            { name: 'Row', props: { items: generateItems(3), direction: 'row' } },
          ],
        },
      ]}
    />
  )
}

export const ContinuesMode = () => {
  return (
    <CommonStory
      component={Timeline}
      stories={[
        {
          group: [
            { name: 'Continues (column)', props: { items: generateItems(3), continues: true } },
            {
              name: 'Continues (column and reverse)',
              props: { items: generateItems(3), continues: true, reverse: true },
            },
            {
              name: 'Continues (row)',
              props: { items: generateItems(3), continues: true, direction: 'row' },
            },
            { name: 'Normal (Default)', props: { items: generateItems(3) } },
          ],
        },
      ]}
    />
  )
}

export const StickyTitle = () => {
  return (
    <CommonStory
      component={Timeline}
      stories={[
        {
          group: [
            {
              name: 'Sticky',
              props: { items: generateItems(3), stickyTitle: true, title: 'Some title' },
            },
            {
              name: 'Normal (Default)',
              props: { items: generateItems(3), stickyTitle: false, title: 'Some title' },
            },
          ],
        },
      ]}
    />
  )
}

export const Scrolled = () => {
  return (
    <CommonStory
      component={Timeline}
      stories={[
        {
          group: [{ props: { items: generateItems(20), maxHeight: '50vh', title: 'Some title' } }],
        },
      ]}
    />
  )
}

export const InProgressIndex = () => {
  return (
    <CommonStory
      component={Timeline}
      stories={[
        {
          group: [
            {
              name: 'Current active index: 2',
              props: {
                items: generateItems(5),
                title: 'Some title',
                inProgressIndex: 2,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomSignContent = () => {
  return (
    <CommonStory
      component={Timeline}
      stories={[
        {
          group: [
            {
              props: {
                items: [
                  generateItem({
                    loading: false,
                    sign: { emoji: 'pineapple' },
                    datetime: 'Emoji sign',
                  }),
                  generateItem({
                    loading: false,
                    sign: { icon: 'favorite_border' },
                    datetime: 'Icon sign',
                  }),
                  generateItem({ loading: true, datetime: 'Loading' }),
                  generateItem({ loading: false, sign: 'number', datetime: 'Number' }),
                  generateItem({ loading: false, sign: 'number', datetime: 'Number' }),
                  generateItem({ loading: false, sign: 'number', datetime: 'Number' }),
                ],
              },
            },
          ],
        },
      ]}
    />
  )
}

export const AutoSignContent = () => {
  return (
    <CommonStory
      component={Timeline}
      stories={[
        {
          group: [
            {
              props: {
                inProgressIndex: 2,
                continues: true,
                items: generateItems(5, { loading: false, sign: 'auto', state: ['neutral'] }),
              },
            },
          ],
        },
      ]}
    />
  )
}

export const ItemVariants = () => {
  const { t } = useI18n('global')

  return (
    <CommonStory
      component={Timeline}
      stories={[
        {
          group: [
            {
              props: {
                inProgressIndex: 5,
                continues: true,
                items: [
                  generateItem({
                    sign: 'auto',
                    loading: false,
                    datetime: 'Success',
                    state: ['success', t('states.success')],
                  }),
                  generateItem({
                    sign: 'auto',
                    loading: false,
                    datetime: 'Info',
                    state: ['info', t('states.info')],
                  }),
                  generateItem({
                    sign: 'auto',
                    loading: false,
                    datetime: 'Warning',
                    state: ['warning', t('states.warning')],
                  }),
                  generateItem({
                    sign: 'auto',
                    loading: false,
                    datetime: 'Error',
                    state: ['error', t('states.error')],
                  }),
                  generateItem({
                    sign: 'auto',
                    loading: false,
                    datetime: 'Neutral',
                    state: ['neutral', t('states.neutral')],
                  }),
                ],
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<TimelineNS.Props> = props => {
  return <StoryPlayground component={Timeline} props={props} />
}
