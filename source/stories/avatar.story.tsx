import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'
import { randomImage } from '@zoom-studio/zoom-js-ts-utils'

import { Avatar, type AvatarNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

const generateProfile = (length = 1): string[] =>
  Array.from(Array(length)).map((_, index) => randomImage(100 + index, 100 + index, 'profile'))

export default {
  title: 'Data display/Avatar',
  component: Avatar,
  args: {
    size: 'normal',
    avatars: generateProfile(3),
    containerProps: {},
    withImageViewer: true,
  },
} as Meta<typeof Avatar>

export const Models = () => {
  return (
    <CommonStory
      component={Avatar}
      stories={[
        {
          group: [
            { name: 'Single profile', props: { avatars: generateProfile(1) } },
            { name: 'Multiple profiles', props: { avatars: generateProfile(5) } },
          ],
        },
      ]}
    />
  )
}

export const Sizes = () => {
  return (
    <CommonStory
      component={Avatar}
      stories={[
        {
          title: 'Single profile',
          group: [
            { name: 'Small', props: { avatars: generateProfile(1), size: 'small' } },
            { name: 'Normal (Default)', props: { avatars: generateProfile(1), size: 'normal' } },
            { name: 'Large', props: { avatars: generateProfile(1), size: 'large' } },
          ],
        },
        {
          title: 'Multiple profile',
          group: [
            { name: 'Small', props: { avatars: generateProfile(4), size: 'small' } },
            { name: 'Normal (Default)', props: { avatars: generateProfile(4), size: 'normal' } },
            { name: 'Large', props: { avatars: generateProfile(4), size: 'large' } },
          ],
        },
      ]}
    />
  )
}

export const WithImageViewer = () => {
  return (
    <CommonStory
      component={Avatar}
      stories={[
        {
          group: [
            {
              name: 'Single profile',
              props: { avatars: generateProfile(1), withImageViewer: true },
            },
            {
              name: 'Multiple profiles',
              props: { avatars: generateProfile(5), withImageViewer: true },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<AvatarNS.Props> = props => {
  return <StoryPlayground component={Avatar} props={props} />
}
