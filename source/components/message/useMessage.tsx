import React from 'react'

import toaster from 'react-hot-toast'
import { CommonVariants } from '../../types'

import { Toast, ToastNS } from './toast'

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

  export type ToastOptions = Omit<ToastNS.Props, 'variant' | 'message' | 'toast'>
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
}

const useToast = (): UseMessage.UseToastReturnType => {
  const toast: UseMessage.ToastCreator = (message, variant, options) => {
    return toaster(t => <Toast thisToast={t} variant={variant} message={message} {...options} />, {
      duration: options?.duration ?? 5000,
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

export const useMessage = () => {
  const toast = useToast()
  return { toast }
}
