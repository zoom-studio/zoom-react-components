import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { ChatBubblesGroup, type ChatBubblesGroupNS } from '../components'
import { StoryPlayground } from './components'
import { useFetchMessages } from './hooks/use-fetch-messages'

export default {
  title: 'Chat/Chat bubbles group',
  component: ChatBubblesGroup,
  args: {
    bubbles: [],
  },
} as Meta<typeof ChatBubblesGroup>

export const Playground: FC<ChatBubblesGroupNS.Props> = props => {
  const { data, isLoading, sendQuery } = useFetchMessages()

  return (
    <StoryPlayground
      component={ChatBubblesGroup}
      props={{
        ...props,
        bubbles: data,
        infiniteScrollProps: { handleOnLoadMore: sendQuery, isLoading, maxHeight: '60vh' },
      }}
    />
  )
}
