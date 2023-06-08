import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { ChatBubble, type ChatBubbleNS } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { MESSAGE } from '../fixtures'
import { faker } from '@faker-js/faker'
import { randomNumber } from '@zoom-studio/zoom-js-ts-utils'

export default {
  title: 'Chat/Bubble',
  component: ChatBubble,
  args: {
    message: JSON.parse(MESSAGE[0]),
    avatar: faker.image.avatar(),
    time: '18:55',
    userId: 1,
    isMe: false,
    seen: true,
    isImportant: true,
    showArrow: true,
    showAvatar: true,
    isSending: false,
    className: 'my-chat-bubble',
    id: 'my-chat-bubble',
    i18n: undefined,
    containerProps: undefined,
    onClick: undefined,
    style: undefined,
  },
} as Meta<typeof ChatBubble>

const useChatBubbleStory = () => {
  const time = '18:55'
  const avatar = () => faker.image.avatarGitHub()
  const userId = () => randomNumber({ min: 1, decimals: 0 })
  const message = () =>
    JSON.parse(MESSAGE[randomNumber({ min: 0, max: MESSAGE.length - 1, decimals: 0 })])

  const commonProps: ChatBubbleNS.Props = {
    avatar: avatar(),
    time,
    message: message(),
    userId: userId(),
    datetime: '2023-06-04T14:51:51.960Z',
  }

  return { avatar, time, userId, message, commonProps }
}

export const Author: FC = () => {
  const { commonProps } = useChatBubbleStory()
  return (
    <CommonStory
      component={ChatBubble}
      stories={[
        {
          group: [
            { name: 'Me', props: { ...commonProps, isMe: true } },
            { name: 'Them', props: { ...commonProps, isMe: false } },
          ],
        },
      ]}
    />
  )
}

export const Avatar: FC = () => {
  const { commonProps } = useChatBubbleStory()
  return (
    <CommonStory
      component={ChatBubble}
      stories={[
        {
          title: 'With avatar (Default)',
          group: [
            { name: 'Me', props: { ...commonProps, isMe: true, showAvatar: true } },
            { name: 'Them', props: { ...commonProps, isMe: false, showAvatar: true } },
          ],
        },
        {
          title: 'Without avatar',
          group: [
            { name: 'Me', props: { ...commonProps, isMe: true, showAvatar: false } },
            { name: 'Them', props: { ...commonProps, isMe: false, showAvatar: false } },
          ],
        },
      ]}
    />
  )
}

export const Arrow: FC = () => {
  const { commonProps } = useChatBubbleStory()
  return (
    <CommonStory
      component={ChatBubble}
      stories={[
        {
          title: 'With arrow (Default)',
          group: [
            { name: 'Me', props: { ...commonProps, isMe: true, showArrow: true } },
            { name: 'Them', props: { ...commonProps, isMe: false, showArrow: true } },
          ],
        },
        {
          title: 'Without arrow',
          group: [
            { name: 'Me', props: { ...commonProps, isMe: true, showArrow: false } },
            { name: 'Them', props: { ...commonProps, isMe: false, showArrow: false } },
          ],
        },
      ]}
    />
  )
}

export const Importance: FC = () => {
  const { commonProps } = useChatBubbleStory()
  return (
    <CommonStory
      component={ChatBubble}
      stories={[
        {
          group: [
            { name: 'Unimportant (Default)', props: { ...commonProps, isImportant: false } },
            { name: 'Important', props: { ...commonProps, isImportant: true } },
          ],
        },
      ]}
    />
  )
}

export const State: FC = () => {
  const { commonProps } = useChatBubbleStory()
  return (
    <CommonStory
      component={ChatBubble}
      stories={[
        {
          group: [
            { name: 'Sending', props: { ...commonProps, isMe: true, isSending: true } },
            { name: 'Sent', props: { ...commonProps, isMe: true, seen: false } },
            { name: 'Seen', props: { ...commonProps, isMe: true, seen: true } },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<ChatBubbleNS.Props> = props => {
  return <StoryPlayground component={ChatBubble} props={props} />
}
