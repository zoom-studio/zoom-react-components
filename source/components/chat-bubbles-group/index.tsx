import React, { forwardRef } from 'react'

import {
  ChatBubble,
  InfiniteScrollView,
  type ChatBubbleNS,
  type InfiniteScrollViewNS,
  Text,
} from '..'
import { useZoomComponent } from '../../hooks'
import type { BaseComponent } from '../../types'

export namespace ChatBubblesGroupNS {
  export interface Props extends Omit<BaseComponent, 'children'> {
    bubbles: ChatBubbleNS.Props[]
    infiniteScrollProps: Omit<
      InfiniteScrollViewNS.Props,
      'children' | 'reverseScroll' | 'dataset' | 'groupBy'
    >
  }
}

export const ChatBubblesGroup = forwardRef<HTMLDivElement, ChatBubblesGroupNS.Props>(
  ({ bubbles, className, containerProps, infiniteScrollProps }, reference) => {
    const { createClassName } = useZoomComponent('chat-bubbles-group')

    const classes = createClassName(className)

    return (
      <div {...containerProps} ref={reference} className={classes}>
        <InfiniteScrollView
          threshold={2}
          loadOnMount
          {...infiniteScrollProps}
          reverseScroll
          dataset={bubbles}
          groupBy="datetime"
          renderBetwixtBeforeDataset={({ datasetKey, datasetKeyIndex }) =>
            datasetKeyIndex > 0 && (
              <div className="message-date">
                <Text key={datasetKeyIndex}>{datasetKey}</Text>
              </div>
            )
          }
        >
          {(data, { index }) => (
            <ChatBubble
              key={index}
              {...data}
              showAvatar={bubbles[index - 1]?.userId !== data.userId}
              showArrow={bubbles[index - 1]?.userId !== data.userId}
            />
          )}
        </InfiniteScrollView>
      </div>
    )
  },
)
