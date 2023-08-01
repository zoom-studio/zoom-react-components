import React, { type FC } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { type TimelineNS } from '.'
import { Emoji, Icon, Spin, Text, type IconNS } from '..'

export namespace TimelineItemNS {
  export interface Props
    extends Pick<TimelineNS.Props, 'stateMessageProps' | 'inProgressIndex' | 'continues'> {
    item: TimelineNS.Item
    index: number
  }
}

export const TimelineItem: FC<TimelineItemNS.Props> = ({
  inProgressIndex = -1,
  stateMessageProps,
  index,
  continues,
  item,
}) => {
  const { sign = 'auto', state = ['neutral'], children, datetime, loading } = item

  const isDone = index < inProgressIndex && index !== -1
  const isInProgress = !isDone && index === inProgressIndex && inProgressIndex !== -1
  const isContinuesIndicator = index === -1 && continues

  const classes = classNames('timeline-item', {
    [state[0]]: true,
    'done': isDone,
    'in-progress': isInProgress,
    'touched': isInProgress || isDone,
    'continues': isContinuesIndicator,
  })

  const stateMessageClasses = classNames('state-message', {
    [stateMessageProps?.className ?? '']: !!stateMessageProps?.className,
  })

  const getAutoSignIcon = (): IconNS.Names => {
    if (state[0] !== 'neutral') {
      switch (state[0]) {
        case 'error':
          return 'close'
        case 'info':
          return 'question_mark'
        case 'success':
          return 'check'
        case 'warning':
          return 'priority_high'
      }
    }
    if (isDone) {
      return 'check'
    }
    if (isInProgress) {
      return 'rotate_left'
    }
    return 'more_horiz'
  }

  return (
    <div className={classes}>
      <div className="item-sign">
        {!isContinuesIndicator ? (
          loading ? (
            <Spin
              className="sign spin-sign"
              size="small"
              color={color => color({ source: state[0] === 'neutral' ? 'accent' : state[0] })}
            />
          ) : sign === 'auto' ? (
            <Icon name={getAutoSignIcon()} className="sign icon-sign" />
          ) : sign === 'number' ? (
            <Text large className="sign number-sign">
              {index + 1}
            </Text>
          ) : 'emoji' in sign ? (
            <Emoji name={sign.emoji} className="sign emoji-sign" />
          ) : (
            <Icon name={sign.icon} className="sign icon-sign" />
          )
        ) : (
          <span className="sign continues-sign">
            <Spin
              className="continues-spin"
              speed="1s"
              color={color => color({ source: 'border', tone: 2 })}
            />
          </span>
        )}
      </div>

      <div className="content">
        {datetime && (
          <div className="datetime">
            {typeof datetime === 'string' ? (
              <Text className="datetime-children">{datetime}</Text>
            ) : (
              datetime
            )}
          </div>
        )}

        {children && <div className="body">{children}</div>}

        {state[1] && (
          <Text {...stateMessageProps} className={stateMessageClasses}>
            {state[1]}
          </Text>
        )}
      </div>
    </div>
  )
}
