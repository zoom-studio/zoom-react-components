import React from 'react'

import toaster from 'react-hot-toast'
import { useAudio, type UseAudioNS } from '@zoom-studio/js-ts-utils'

import { type CommonVariants } from '../../../types'

import { type UseMessageNS } from '../use-message'
import { DEFAULT_NOTIFICATION_DURATION, TOASTER_CLASS_NAME } from '../constants'
import { Notification, type NotificationNS } from '.'

export namespace UseNotificationNS {
  export type NotificationOptions = Omit<
    NotificationNS.Props,
    'variant' | 'message' | 'thisNotification' | 'title'
  >

  export type NotificationCreator = (
    title: string,
    message: NotificationNS.Props['message'],
    variant: CommonVariants,
    opt?: NotificationOptions,
  ) => string

  export type SimplifiedNotificationCreator = (
    title: string,
    message: NotificationNS.Props['message'],
    opt?: NotificationOptions,
  ) => string

  export interface UseNotificationReturnType
    extends UseMessageNS.WithVariantCreator<SimplifiedNotificationCreator>,
      UseMessageNS.BaseMessageParams {
    notify: NotificationCreator
  }
}

export const useNotification = (): UseNotificationNS.UseNotificationReturnType => {
  const { playAudio } = useAudio()

  const handlePlaySound = (
    variant: CommonVariants,
    notificationOptions?: UseNotificationNS.NotificationOptions,
  ) => {
    const isWithSound = notificationOptions?.playSound ?? true

    if (!isWithSound) {
      return null
    }

    let sound: UseAudioNS.Audios = ''

    if (notificationOptions?.customSound) {
      sound = notificationOptions.customSound
    } else {
      sound = variant === 'error' ? 'failureNotification' : 'successNotification'
    }

    void playAudio(sound)
  }

  const notify: UseNotificationNS.NotificationCreator = (title, message, variant, options) => {
    handlePlaySound(variant, options)
    return toaster(
      t => (
        <Notification
          thisNotification={t}
          variant={variant}
          message={message}
          title={title}
          {...options}
        />
      ),
      {
        duration: options?.duration ?? DEFAULT_NOTIFICATION_DURATION,
        id: options?.id,
        className: TOASTER_CLASS_NAME,
        position: 'bottom-right',
      },
    )
  }

  return {
    notify,
    destroy: id => {
      toaster.dismiss(id)
    },
    destroyAll: () => {
      toaster.dismiss()
    },
    terminate: id => {
      toaster.remove(id)
    },
    terminateAll: () => {
      toaster.remove()
    },
    neutral: (ttl, msg, opt) => notify(ttl, msg, 'neutral', opt),
    success: (ttl, msg, opt) => notify(ttl, msg, 'success', opt),
    info: (ttl, msg, opt) => notify(ttl, msg, 'info', opt),
    warning: (ttl, msg, opt) => notify(ttl, msg, 'warning', opt),
    error: (ttl, msg, opt) => notify(ttl, msg, 'error', opt),
  }
}
