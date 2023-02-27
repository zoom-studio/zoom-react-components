import React, { FC, ReactNode } from 'react'

import { Divider, Stack, Text } from '../../../components'

export namespace WithMessagesStoryNS {
  export interface Props {
    children?: ReactNode
    messages?: string[]
  }
}

export const WithMessagesStory: FC<WithMessagesStoryNS.Props> = ({ children, messages }) => {
  return (
    <div className="with-messages-story">
      <div className="story">{children}</div>

      {messages && (
        <Stack className="messages" dividers={<Divider vertical />} spacing={0} broken>
          {messages.map((message, index) => {
            const [title, value] = message.split(':')
            return (
              <Text key={index}>
                <span>{title?.trim()}: </span>
                <span key={value}>{value?.trim()}</span>
              </Text>
            )
          })}
        </Stack>
      )}
    </div>
  )
}
