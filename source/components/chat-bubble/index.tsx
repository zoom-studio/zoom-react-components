import React, { forwardRef } from 'react'

import { type Descendant } from 'slate'
import { randomString } from '@zoom-studio/zoom-js-ts-utils'

import type { BaseComponent } from '../../types'
import { useZoomComponent } from '../../hooks'
import { Icon, Image, RichTextViewer, Spin, Text } from '..'

import { useChatBubbleI18n, type UseChatBubbleI18nNS } from './use-i18n'

export namespace ChatBubbleNS {
  export type I18n = UseChatBubbleI18nNS.I18n

  export interface Message {
    time: string
    message: Descendant[]
    avatar: string
    userId: number | string
    datetime: string
    isMe?: boolean
    isImportant?: boolean
    seen?: boolean
  }

  export interface Props extends Omit<BaseComponent, 'children'>, Message {
    i18n?: I18n
    isSending?: boolean
    showAvatar?: boolean
    showArrow?: boolean
  }
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleNS.Props>(
  (
    {
      i18n: componentI18n,
      showAvatar = true,
      showArrow = true,
      className,
      containerProps,
      message,
      isMe,
      isImportant,
      avatar,
      time,
      seen,
      userId,
      isSending,
      id,
      onClick,
      style,
    },
    reference,
  ) => {
    const { createClassName, globalI18ns } = useZoomComponent('chat-bubble')
    const i18n = useChatBubbleI18n(globalI18ns, componentI18n)

    const classes = createClassName(className, '', {
      [isMe ? 'is-me' : 'is-them']: true,
      'show-avatar': !!showAvatar,
      'show-arrow': !!showArrow,
      'is-important': !!isImportant,
    })

    return (
      <div
        id={id}
        style={style}
        onClick={onClick}
        {...containerProps}
        className={classes}
        ref={reference}
      >
        <div className="avatar">{showAvatar && <Image src={avatar} shape="semi-circle" />}</div>

        <div className="message">
          {isImportant && (
            <div className="important">
              <Icon name="crisis_alert" />
              <Text>{i18n.important}</Text>
            </div>
          )}

          <RichTextViewer value={message} id={`chat-bubble-${randomString(30)}-user-${userId}`} />

          <div className="info">
            {isMe &&
              (isSending ? (
                <Spin size="small" />
              ) : seen ? (
                <Icon name="done_all" />
              ) : (
                <Icon name="done" />
              ))}

            <Text small common className="time">
              {time}
            </Text>
          </div>
        </div>
      </div>
    )
  },
)
