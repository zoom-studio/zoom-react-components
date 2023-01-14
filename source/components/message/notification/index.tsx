import React, { FC, ReactNode, useState } from 'react'

import notifier, { Toast as NotificationType } from 'react-hot-toast'

import { useStatedIcon, UseStatedIcon, useZoomComponent } from '../../../hooks'
import { CommonVariants } from '../../../types'
import {
  Icon,
  IconNS,
  Emoji,
  EmojiNS,
  Spin,
  Button,
  ButtonNS,
  Title,
  Text,
  ConditionalWrapper,
} from '../..'

import { MessageProgress } from './progress'
import { DEFAULT_NOTIFICATION_DURATION } from '../constants'

export namespace NotificationNS {
  export type Action = ButtonNS.Props | ((notificationId: string) => ButtonNS.Props)

  export interface Props extends Omit<UseStatedIcon.Params, 'variant'> {
    title: string
    message: string | ReactNode
    images?: string[]
    variant?: CommonVariants
    duration?: number
    id?: string
    loading?: boolean
    closable?: boolean
    showProgress?: boolean
    thisNotification?: NotificationType
    playSound?: boolean
    customSound?: string
    actions?: Action[]
  }
}

export const Notification: FC<NotificationNS.Props> = ({
  variant = 'neutral',
  images = [],
  actions = [],
  showProgress = true,
  duration = DEFAULT_NOTIFICATION_DURATION,
  closable = true,
  title,
  message,
  emoji,
  icon,
  id,
  loading,
  noIconAndEmoji,
  thisNotification,
}) => {
  const [isPaused, setIsPaused] = useState(false)
  const { createClassName } = useZoomComponent('notification')
  const [iconName, iconType] = useStatedIcon({ emoji, variant, icon, noIconAndEmoji })
  const notificationId = (id ?? thisNotification?.id) || '-1'

  const classes = createClassName('', '', {
    [createClassName('', variant)]: true,
  })

  const handleClose = () => {
    if (closable) {
      notifier.dismiss(notificationId)
    }
  }

  const handleOnMouseEnter = () => {
    if (showProgress) {
      setIsPaused(true)
    }
  }

  const handleOnMouseLeave = () => {
    if (showProgress) {
      setIsPaused(false)
    }
  }

  const renderActionButton = (action: NotificationNS.Action, index: number): ReactNode => {
    const buttonProps = typeof action === 'function' ? action(notificationId) : action
    return <Button key={index} size="small" {...buttonProps} />
  }

  return (
    <div className={classes} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      <div className="header">
        <ConditionalWrapper
          condition={iconType !== 'nothing' && !!iconName}
          trueWrapper={child => <div className="icon">{child}</div>}
        >
          {iconType === 'icon' ? (
            <Icon name={iconName as IconNS.Names} />
          ) : (
            <Emoji className="emoji" name={iconName as EmojiNS.Emojis.Names} />
          )}
        </ConditionalWrapper>

        <Title h5 className="notification-title">
          {title}
        </Title>

        {loading ? (
          <Spin
            size="small"
            color={color => color({ source: variant === 'neutral' ? 'text' : variant, tone: 2 })}
          />
        ) : (
          closable && (
            <Button
              onClick={handleClose}
              className="close-button"
              variant={variant}
              type={variant === 'neutral' ? 'text' : 'link'}
            >
              <Icon name="close" />
            </Button>
          )
        )}
      </div>

      <ConditionalWrapper
        condition={typeof message === 'string'}
        falseWrapper={() => <div className="content">{message}</div>}
        trueWrapper={() => (
          <Text large className="content">
            {message}
          </Text>
        )}
      />

      {images.length > 0 && (
        <div className="images">
          {images.map((image, index) => (
            <img key={index} src={image} />
          ))}
        </div>
      )}

      {actions.length > 0 && <div className="actions">{actions.map(renderActionButton)}</div>}

      {showProgress && (
        <MessageProgress variant={variant} duration={duration} isPaused={isPaused} />
      )}
    </div>
  )
}
