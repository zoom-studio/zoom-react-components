import React, { forwardRef } from 'react'

import toaster, { type Toast as ToastType } from 'react-hot-toast'

import {
  Button,
  ConditionalWrapper,
  Emoji,
  type EmojiNS,
  Icon,
  type IconNS,
  Spin,
  Text,
} from '../..'
import { useStatedIcon, type UseStatedIcon, useZoomComponent } from '../../../hooks'
import { type CommonVariants } from '../../../types'

export namespace ToastNS {
  export interface Props extends Omit<UseStatedIcon.Params, 'variant'> {
    variant?: CommonVariants
    message: string
    duration?: number
    id?: string
    loading?: boolean
    closable?: boolean
    thisToast?: ToastType
    playSound?: boolean
    customSound?: string
  }
}

export const Toast = forwardRef<HTMLDivElement, ToastNS.Props>(
  (
    { variant = 'neutral', message, emoji, icon, id, loading, noIconAndEmoji, closable, thisToast },
    reference,
  ) => {
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
      <div ref={reference} className={classes}>
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
  },
)
