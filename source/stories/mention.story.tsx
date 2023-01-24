import React, { FC, useEffect, useState } from 'react'

import { ComponentMeta } from '@storybook/react'
import { faker } from '@faker-js/faker'

import { Mention, MentionNS } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { useSettings } from './hooks/use-settings'
import { useI18n } from './hooks/use-i18n'

const useUsers = (count = 10): MentionNS.User[] => {
  const { language } = useSettings()
  const [users, setUsers] = useState<MentionNS.User[]>([])

  useEffect(() => {
    faker.locale = language
    const users: Partial<MentionNS.User>[] = Array.from(Array(count)).map(() => ({
      name: faker.name.fullName(),
      avatar: faker.image.avatar(),
    }))
    faker.locale = 'en'
    users.forEach(user => (user.username = faker.internet.userName().toLowerCase()))
    setUsers(users as MentionNS.User[])
  }, [language])
  return users
}

export default {
  title: 'Data Entry/Mention',
  component: Mention,
  args: {
    maxHeight: 200,
    closeUsersListOnBlur: true,
    symbol: '@',
    size: 'normal',
    users: [],
    placeholder: 'Type something or @mention people',
    label: 'Broadcast',
    mentionContainerProps: {},
  },
} as ComponentMeta<typeof Mention>

export const Basic: FC = () => {
  const users = useUsers()
  const { t } = useI18n('mention')
  const placeholder = t('placeholder')
  return (
    <CommonStory
      containerStyles={{ marginTop: 260 }}
      component={Mention}
      stories={[{ group: [{ name: 'Basic', props: { users, placeholder } }] }]}
    />
  )
}

export const CustomSymbol: FC = () => {
  const users = useUsers()
  const { t } = useI18n('mention')
  const placeholder = t('placeholder')
  return (
    <CommonStory
      containerStyles={{ marginTop: 260 }}
      component={Mention}
      stories={[
        {
          group: [
            { name: '@ (Default)', props: { users, placeholder } },
            { name: '#', props: { users, placeholder, symbol: '#' } },
            { name: '%', props: { users, placeholder, symbol: '%' } },
          ],
        },
      ]}
    />
  )
}

export const CustomListHeight: FC = () => {
  const users = useUsers()
  const { t } = useI18n('mention')
  const placeholder = t('placeholder')
  return (
    <CommonStory
      containerStyles={{ marginTop: 260 }}
      component={Mention}
      stories={[
        {
          group: [
            { name: '200px (Default)', props: { users, placeholder } },
            { name: '600px', props: { users, placeholder, maxHeight: '600px' } },
            { name: '100px', props: { users, placeholder, maxHeight: 100 } },
            { name: 'Half of the page', props: { users, placeholder, maxHeight: '50vh' } },
          ],
        },
      ]}
    />
  )
}

export const Sizes: FC = () => {
  const users = useUsers()
  const { t } = useI18n('mention')
  const placeholder = t('placeholder')
  return (
    <CommonStory
      containerStyles={{ marginTop: 260 }}
      component={Mention}
      stories={[
        {
          group: [
            { name: 'Small', props: { users, placeholder, size: 'small' } },
            { name: 'Normal (Default)', props: { users, placeholder, size: 'normal' } },
            { name: 'Large', props: { users, placeholder, size: 'large' } },
          ],
        },
      ]}
    />
  )
}

export const CloseListOnBlur: FC = () => {
  const users = useUsers()
  const { t } = useI18n('mention')
  const placeholder = t('placeholder')
  return (
    <CommonStory
      containerStyles={{ marginTop: 260 }}
      component={Mention}
      stories={[
        {
          group: [
            { name: 'Close on blur (Default)', props: { users, placeholder } },
            { name: 'Stay on blur', props: { users, placeholder, closeUsersListOnBlur: false } },
          ],
        },
      ]}
    />
  )
}

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
