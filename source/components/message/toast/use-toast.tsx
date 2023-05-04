import React from 'react'

import toaster from 'react-hot-toast'
import { useAudio, UseAudioNS } from '@zoom-studio/zoom-js-ts-utils'

import { CommonVariants } from '../../../types'

import { DEFAULT_TOAST_DURATION, TOASTER_CLASS_NAME } from '../constants'
import { Toast, ToastNS } from '.'
import { UseMessageNS } from '../use-message'

export namespace UseToastNS {
  export type ToastOptions = Omit<ToastNS.Props, 'variant' | 'message' | 'thisToast'>

  export type ToastCreator = (
    message: string,
    variant: CommonVariants,
    opt?: ToastOptions,
  ) => string

  export type SimplifiedToastCreator = (message: string, opt?: ToastOptions) => string

  export interface UseToastReturnType
    extends UseMessageNS.WithVariantCreator<SimplifiedToastCreator>,
      UseMessageNS.BaseMessageParams {
    toast: ToastCreator
  }
}

export const useToast = (): UseToastNS.UseToastReturnType => {
  const { playAudio } = useAudio()

  const handlePlaySound = (toastOptions?: UseToastNS.ToastOptions) => {
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

  const toast: UseToastNS.ToastCreator = (message, variant, options) => {
    handlePlaySound(options)

    return toaster(t => <Toast thisToast={t} variant={variant} message={message} {...options} />, {
      duration: options?.duration ?? DEFAULT_TOAST_DURATION,
      id: options?.id,
      className: TOASTER_CLASS_NAME,
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
