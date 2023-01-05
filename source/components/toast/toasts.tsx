import React, { FC, useMemo } from 'react'

import { useZoomComponent } from '../../hooks'
import { Toast, ToastNS } from './toast'

export namespace ToastsNS {
  export interface Props
    extends Partial<
      Pick<ToastNS.Toast, 'duration' | 'size' | 'closable' | 'variant' | 'children'>
    > {
    toasts: ToastNS.Toast[]
    maximumToasts?: number
  }
}

export const Toasts: FC<ToastsNS.Props> = ({
  size = 'normal',
  duration = 1000,
  variant = 'neutral',
  children = '',
  toasts: providedToasts,
  maximumToasts,
  closable,
}) => {
  const { createClassName } = useZoomComponent('toasts')
  const classes = createClassName()

  const toasts = useMemo<ToastNS.Toast[]>(() => {
    if (maximumToasts) {
      providedToasts = providedToasts.slice(providedToasts.length - maximumToasts)
    }
    return providedToasts
  }, [providedToasts, maximumToasts])

  return (
    <div className={classes}>
      {toasts.map((toast, index) => (
        <Toast
          {...toast}
          key={index}
          size={toast.size ?? size}
          duration={toast.duration ?? duration}
          closable={toast.closable ?? closable}
          variant={toast.variant ?? variant}
          children={toast.children ?? children}
        />
      ))}
    </div>
  )
}
