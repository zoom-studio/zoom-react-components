import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'
import { sleep } from '@zoom-studio/zoom-js-ts-utils'

import { Checkbox, ReactionRate, ReactionRateNS } from '..'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Feedback/Reaction rate',
  component: ReactionRate,
  args: {
    type: 'quintuple',
  },
} as ComponentMeta<typeof ReactionRate>

export const Types: FC = () => {
  return (
    <CommonStory
      component={ReactionRate}
      stories={[
        {
          group: [
            { name: 'Quintuple', props: { type: 'quintuple' } },
            { name: 'Couple', props: { type: 'couple' } },
          ],
        },
      ]}
    />
  )
}

export const Size: FC = () => {
  return (
    <CommonStory
      component={ReactionRate}
      stories={[
        {
          group: [
            { name: 'Small', props: { size: 'small' } },
            { name: 'Normal', props: { size: 'normal' } },
            { name: 'Large', props: { size: 'large' } },
          ],
        },
      ]}
    />
  )
}

export const CustomEmojis: FC = () => {
  return (
    <CommonStory
      component={ReactionRate}
      stories={[
        {
          group: [
            {
              name: 'Quintuple',
              props: {
                type: 'quintuple',
                emojis: ['red heart', 'orange heart', 'yellow heart', 'green heart', 'blue heart'],
              },
            },
            { name: 'Couple', props: { type: 'couple', emojis: ['thumbs up', 'thumbs down'] } },
          ],
        },
      ]}
    />
  )
}

export const DefaultValue: FC = () => {
  return (
    <CommonStory
      component={ReactionRate}
      stories={[
        {
          group: [
            { name: 'Quintuple', props: { type: 'quintuple', selectedReaction: 4 } },
            { name: 'Couple', props: { type: 'couple', selectedReaction: 2 } },
          ],
        },
      ]}
    />
  )
}

export const Loading: FC = () => {
  return (
    <CommonStory
      component={ReactionRate}
      stories={[
        {
          group: [
            { name: 'Quintuple', props: { type: 'quintuple', loading: true, selectedReaction: 2 } },
            { name: 'Couple', props: { type: 'couple', loading: true, selectedReaction: 1 } },
          ],
        },
      ]}
    />
  )
}

export const Disabled: FC = () => {
  return (
    <CommonStory
      component={ReactionRate}
      stories={[
        {
          group: [
            {
              name: 'With selected value',
              props: { type: 'quintuple', disabled: true, selectedReaction: 5 },
            },
            { name: 'Without selected value', props: { type: 'quintuple', disabled: true } },
          ],
        },
      ]}
    />
  )
}

export const RealWorldExample: FC = () => {
  const { t } = useI18n('reactionRate')
  const [loading, setLoading] = useState(false)
  const [failToDispatch, setFailToDispatch] = useState(false)
  const [rate, setRate] = useState<ReactionRateNS.SelectedRange | undefined>(undefined)

  const dispatchRate = async (rate: ReactionRateNS.SelectedRange): Promise<void> => {
    let currentValue: ReactionRateNS.SelectedRange | undefined
    setLoading(true)
    setRate(currentRate => {
      currentValue = currentRate
      return rate
    })
    await sleep(500)
    if (failToDispatch) {
      setRate(currentValue)
    }
    setLoading(false)
  }

  return (
    <CommonStory
      component={ReactionRate}
      stories={[
        {
          group: [
            {
              name: (
                <Checkbox
                  label={t('dispatch')}
                  checked={failToDispatch}
                  size="large"
                  onChange={evt => setFailToDispatch(evt.currentTarget.checked)}
                  containerProps={{ style: { marginBottom: 10 } }}
                />
              ),
              props: { onSelect: dispatchRate, selectedReaction: rate, loading },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<ReactionRateNS.Props> = props => {
  return <StoryPlayground component={ReactionRate} props={props} />
}
