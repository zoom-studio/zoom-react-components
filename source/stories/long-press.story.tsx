import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Emoji, LongPress, Text } from '..'

import './styles/_long-press.scss'

export default {
  title: 'LongPress',
  component: LongPress,
} as ComponentMeta<typeof LongPress>

export const _LongPress: FC = () => {
  const [number, setNumber] = useState(0)

  const handleLongPressCallback = () => {
    setNumber(number => number + 1)
  }

  return (
    <div className="long-press-story">
      <LongPress callback={handleLongPressCallback}>
        <Text common normal>
          Long click/touch on me to increase the number
        </Text>

        <Text bold large>
          {number}
        </Text>

        <Emoji name="thumbs up" />
      </LongPress>
    </div>
  )
}
