import React, { forwardRef, type MouseEvent, useState } from 'react'

import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace LongPressNS {
  export interface Props extends BaseComponent {
    interval?: number
    callback?: () => void
    disabled?: boolean
  }
}

export const LongPress = forwardRef<HTMLDivElement, LongPressNS.Props>(
  (
    { interval = 100, callback = () => {}, children, disabled, className, containerProps, ...rest },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('long-press')
    const containerClassNames = createClassName(className)
    const [intervalIDs, setIntervalIDs] = useState<number[]>([])
    let isMouseDown = false

    const cleatIntervalIDs = () => {
      intervalIDs.forEach(clearInterval)
      setIntervalIDs([])
    }

    const handleMouseDown = () => {
      if (disabled) {
        return
      }
      isMouseDown = true

      setTimeout(() => {
        if (isMouseDown) {
          cleatIntervalIDs()
          const id = window.setInterval(callback, interval)
          setIntervalIDs(ids => [...ids, id])
        }
      }, interval)
    }

    const handleMouseUpOrLeave = () => {
      isMouseDown = false
      cleatIntervalIDs()
    }

    const handleClick = (evt: MouseEvent<HTMLDivElement>) => {
      evt.stopPropagation()
      if (disabled) {
        return
      }
      callback()
    }

    return (
      <div
        {...containerProps}
        {...rest}
        onClick={handleClick}
        className={containerClassNames}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchEnd={handleMouseUpOrLeave}
        ref={reference}
      >
        {children}
      </div>
    )
  },
)
