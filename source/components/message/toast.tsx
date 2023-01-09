import React, { FC } from 'react'

import toaster, { Toast as ToastType } from 'react-hot-toast'

import { useZoomComponent, useStatedIcon, UseStatedIcon } from '../../hooks'
import { CommonVariants } from '../../types'
import { Button, Emoji, EmojiNS, Icon, IconNS, Spin, Text } from '..'
import { ConditionalWrapper } from '../conditional-wrapper'

export namespace ToastNS {
  export interface Props extends Omit<UseStatedIcon.Params, 'variant'> {
    variant?: CommonVariants
    message: string
    duration?: number
    id?: string
    loading?: boolean
    closable?: boolean
    thisToast?: ToastType
  }
}

export const Toast: FC<ToastNS.Props> = ({
  variant = 'neutral',
  message,
  emoji,
  icon,
  id,
  loading,
  noIconAndEmoji,
  closable,
  thisToast,
}) => {
  const { createClassName } = useZoomComponent('toast')
  const [iconName, iconType] = useStatedIcon({ emoji, variant, icon, noIconAndEmoji })
  const toastId = id ?? thisToast?.id

  const classes = createClassName('', '', {
    [createClassName('', variant)]: true,
  })

  const handleClose = () => {
    if (closable) {
      toaster.dismiss(toastId)
    }
  }

  return (
    <div className={classes}>
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

      <Text bold large className="message">
        {message}
      </Text>

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
  )
}
