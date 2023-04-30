import React, { FC, FocusEvent, MouseEvent, useEffect, useRef } from 'react'

import { useMergeRefs } from '@floating-ui/react'

import { PopoverNS } from '.'
import { usePopoverContext } from './use-popover-context'
import { useZoomComponent } from '../../hooks'

export namespace PopoverTriggerNS {
  export interface Props extends PopoverNS.Props {
    toggle: () => void
    open: () => void
    close: () => void
  }
}

export const PopoverTrigger: FC<PopoverTriggerNS.Props> = ({
  hoverDelay = 0,
  children,
  close,
  open,
  toggle,
  trigger,
  containerProps,
  disabled,
  className,
  ...rest
}) => {
  const context = usePopoverContext()
  const childrenRef = (children as any).ref
  const ref = useMergeRefs([context.refs.setReference, childrenRef])
  const timeout = useRef<number | null>(null)
  const { createClassName } = useZoomComponent('popover')

  const classes = createClassName(className)

  const handleOnClick = (evt: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }
    if (trigger === 'click') {
      toggle()
    }
    rest?.onClick?.(evt)
  }

  const handleOnFocusOrBlur = (evt: FocusEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }
    const isFocused = evt.type === 'focus'
    if (trigger === 'focus') {
      if (isFocused) open()
      else close()
    }
    if (isFocused) containerProps?.onFocus?.(evt)
    else containerProps?.onBlur?.(evt)
  }

  const handleOnMouseEnterOrLeave = (evt: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }
    const isMouseEntered = evt.type === 'mouseenter'
    if (trigger === 'hover') {
      if (isMouseEntered) {
        timeout.current = window.setTimeout(open, hoverDelay)
      } else {
        if (timeout.current) {
          clearTimeout(timeout.current)
        }
        close()
      }
    }
    if (isMouseEntered) containerProps?.onMouseEnter?.(evt)
    else containerProps?.onMouseLeave?.(evt)
  }

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  return (
    <div
      className={classes}
      ref={ref}
      onMouseEnter={handleOnMouseEnterOrLeave}
      onMouseLeave={handleOnMouseEnterOrLeave}
      onFocus={handleOnFocusOrBlur}
      onBlur={handleOnFocusOrBlur}
      onClick={handleOnClick}
    >
      {(typeof children === 'function'
        ? children({ openPopover: open, closePopover: close })
        : children) || <></>}
    </div>
  )
}
