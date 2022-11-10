import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Emoji as EmojiComponent, EmojiNS, Text } from '../components'
import './styles/_emoji.scss'

export default {
  title: 'Emoji',
  component: EmojiComponent,
  args: {
    name: 'ZZZ',
  },
} as ComponentMeta<typeof EmojiComponent>

const Template: FC<EmojiNS.Props> = props => (
  <table className="emoji-table">
    <thead>
      <th>
        <Text bold large>
          آزمایشی
        </Text>
      </th>
      <th>
        <Text bold large>
          ایران بزرگ
        </Text>
      </th>
      <th>
        <Text bold large>
          گوزن
        </Text>
      </th>
    </thead>
    <tbody>
      <tr>
        <td>
          <EmojiComponent {...props} />
        </td>
        <td>
          <EmojiComponent name="flag: Iran" />
        </td>
        <td>
          <EmojiComponent name="goat" />
        </td>
      </tr>
    </tbody>
  </table>
)

export const Emoji = Template.bind({})
