import React, { FC, useEffect, useState } from 'react'

import { ComponentMeta } from '@storybook/react'
import { faker } from '@faker-js/faker'

import { Mention, MentionNS } from '../components'
import { StoryPlayground } from './components'
import { useSettings } from './hooks/use-settings'

const useUsers = (count = 10): MentionNS.User[] => {
  const { language } = useSettings()
  const [users, setUsers] = useState<MentionNS.User[]>([])
  useEffect(() => {
    faker.locale = language
    setUsers(
      Array.from(Array(count)).map(() => ({
        name: faker.name.fullName(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
      })),
    )
  }, [language])
  return users
}

export default {
  title: 'Data Entry/Mention',
  component: Mention,
  args: {
    as: 'textarea',
    maxHeight: 200,
    containerProps: {},
    inputProps: {},
    textareaProps: {},
    users: [],
    // onMention: console.log,
    symbol: '@',
  },
} as ComponentMeta<typeof Mention>

export const Playground: FC<MentionNS.Props> = props => {
  const users = useUsers(100)

  return (
    <StoryPlayground
      containerProps={{ style: { marginTop: 260 } }}
      component={Mention}
      props={{ ...props, users }}
    />
  )
}
