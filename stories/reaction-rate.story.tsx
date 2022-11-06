import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'
import { sleep } from 'motils'

import {
  ReactionRate as ReactionRateComponent,
  ReactionRateNS,
  Title,
} from '../source'
import './styles/_reaction-rate.scss'

export default {
  title: 'Reaction Rate',
  component: ReactionRateComponent,
  args: {
    type: 'quintuple',
  },
} as ComponentMeta<typeof ReactionRateComponent>

const Template: FC<ReactionRateNS.Props> = props => {
  const [loading, setLoading] = useState(false)
  const [failToDispatch, setFailToDispatch] = useState(false)
  const [rate, setRate] =
    useState<ReactionRateNS.SelectedRange | undefined>(undefined)

  const dispatchRate = async (
    rate: ReactionRateNS.SelectedRange,
  ): Promise<void> => {
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
    <div className="sb-reaction-rate-component">
      <Title>پلی گروند ({rate || 'هنوز انتخاب نشده'}):</Title>

      <label>
        <input
          type="checkbox"
          checked={failToDispatch}
          onChange={evt => setFailToDispatch(evt.currentTarget.checked)}
        />
        <span>Fail to dispatch</span>
      </label>

      <br />

      <ReactionRateComponent
        {...props}
        onSelect={dispatchRate}
        selectedReaction={rate}
        loading={loading}
      />

      <br />
      <br />
      <br />

      <Title>پنج‌تایی:</Title>
      <ReactionRateComponent {...props} type="quintuple" />

      <br />

      <Title>پنج‌تایی با ری‌اکشن‌های کاستوم:</Title>
      <ReactionRateComponent
        {...props}
        type="quintuple"
        emojis={[
          'face with peeking eye',
          'waving hand',
          'baby',
          'dotted line face',
          'man: white hair',
        ]}
      />

      <br />

      <Title>دوتایی:</Title>
      <ReactionRateComponent {...props} type="couple" />

      <br />

      <Title>دوتایی با ری‌اکشن‌های کاستوم:</Title>
      <ReactionRateComponent
        {...props}
        type="couple"
        emojis={['rock', 'ghost']}
      />

      <br />

      <Title>دارای دیفالت و غیر فعال:</Title>
      <ReactionRateComponent
        {...props}
        type="quintuple"
        selectedReaction={3}
        disabled
      />

      <br />

      <Title>لودینگ (درحال ثبت ری‌اکشن):</Title>
      <ReactionRateComponent
        {...props}
        type="quintuple"
        selectedReaction={3}
        disabled
        loading
      />
    </div>
  )
}
export const ReactionRate = Template.bind({})
