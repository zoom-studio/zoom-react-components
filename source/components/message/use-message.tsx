import React from 'react'

import toaster from 'react-hot-toast'
import { CommonVariants } from '../../types'

import { Toast, ToastNS } from './toast'
import { Notification, NotificationNS } from './notification'
import { useAudio, UseAudioNS } from '../../hooks'
import { DEFAULT_NOTIFICATION_DURATION, DEFAULT_TOAST_DURATION } from './constants'

export namespace UseMessage {
  export interface BaseMessageParams {
    destroy: (toastId: string) => void
    destroyAll: () => void
    terminate: (toastId: string) => void
    terminateAll: () => void
  }

  export type WithVariantCreator<Creator> = {
    [variant in CommonVariants]: Creator
  }

  export type ToastOptions = Omit<ToastNS.Props, 'variant' | 'message' | 'thisToast'>
  export type ToastCreator = (
    message: string,
    variant: CommonVariants,
    opt?: ToastOptions,
  ) => string
  export type SimplifiedToastCreator = (message: string, opt?: ToastOptions) => string
  export interface UseToastReturnType
    extends WithVariantCreator<SimplifiedToastCreator>,
      BaseMessageParams {
    toast: ToastCreator
  }

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
    extends WithVariantCreator<SimplifiedNotificationCreator>,
      BaseMessageParams {
    notify: NotificationCreator
  }
}

const useToast = (): UseMessage.UseToastReturnType => {
  const { playAudio } = useAudio()

  const handlePlaySound = (toastOptions?: UseMessage.NotificationOptions) => {
    const isWithSound = toastOptions?.playSound
    if (!isWithSound) {
      return null
    }
    let sound: UseAudioNS.Audios = ''
    if (toastOptions?.customSound) {
      sound = toastOptions.customSound
    } else {
      sound = 'toast'
    }
    void playAudio(sound)
  }

  const toast: UseMessage.ToastCreator = (message, variant, options) => {
    handlePlaySound(options)
    return toaster(t => <Toast thisToast={t} variant={variant} message={message} {...options} />, {
      duration: options?.duration ?? DEFAULT_TOAST_DURATION,
      id: options?.id,
      className: 'zoomrc-toast-container',
      position: 'top-center',
    })
  }
  return {
    toast,
    destroy: id => toaster.dismiss(id),
    destroyAll: () => toaster.dismiss(),
    terminate: id => toaster.remove(id),
    terminateAll: () => toaster.remove(),
    neutral: (msg, opt) => toast(msg, 'neutral', opt),
    success: (msg, opt) => toast(msg, 'success', opt),
    info: (msg, opt) => toast(msg, 'info', opt),
    warning: (msg, opt) => toast(msg, 'warning', opt),
    error: (msg, opt) => toast(msg, 'error', opt),
  }
}

const useNotification = (): UseMessage.UseNotificationReturnType => {
  const { playAudio } = useAudio()

  const handlePlaySound = (
    variant: CommonVariants,
    notificationOptions?: UseMessage.NotificationOptions,
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

  const notify: UseMessage.NotificationCreator = (title, message, variant, options) => {
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
        className: 'zoomrc-toast-container',
        position: 'bottom-right',
      },
    )
  }

  return {
    notify,
    destroy: id => toaster.dismiss(id),
    destroyAll: () => toaster.dismiss(),
    terminate: id => toaster.remove(id),
    terminateAll: () => toaster.remove(),
    neutral: (ttl, msg, opt) => notify(ttl, msg, 'neutral', opt),
    success: (ttl, msg, opt) => notify(ttl, msg, 'success', opt),
    info: (ttl, msg, opt) => notify(ttl, msg, 'info', opt),
    warning: (ttl, msg, opt) => notify(ttl, msg, 'warning', opt),
    error: (ttl, msg, opt) => notify(ttl, msg, 'error', opt),
  }
}

export const useMessage = () => {
  const toast = useToast()
  const notify = useNotification()
  return { toast, notify }
}
