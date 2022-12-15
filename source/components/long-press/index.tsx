import React, { FC, HTMLAttributes, MouseEvent, useState } from 'react'
import { useZoomComponent } from '../../hooks'

export namespace LongPressNS {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    interval?: number
    callback?: () => void
    disabled?: boolean
  }
}

export const LongPress: FC<LongPressNS.Props> = ({
  interval = 100,
  callback = () => {},
  children,
  disabled,
  className,
  ...rest
}) => {
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
      {...rest}
      onClick={handleClick}
      className={containerClassNames}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchEnd={handleMouseUpOrLeave}
    >
      {children}
    </div>
  )
}
