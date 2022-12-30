import React, { FC, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Emoji, Text, LongTap } from '../..'

// import './styles/_long-tap.scss'

export default {
  title: 'LongTap',
  component: LongTap,
} as ComponentMeta<typeof LongTap>

export const _LongTap: FC = () => {
  const [number, setNumber] = useState(0)

  const handleLongTapCallback = () => {
    setNumber(number => number + 1)
  }

  return (
    <div className="long-tap-story">
      <LongTap callback={handleLongTapCallback} timeout={1000}>
        <Text common normal>
          Long press/tap on me to increase the number
        </Text>

        <Text bold large>
          {number}
        </Text>

        <Emoji name="hand with index finger and thumb crossed" />
      </LongTap>
    </div>
  )
}
