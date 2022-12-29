import React, { FC, HTMLAttributes, MouseEvent, ReactNode, TouchEvent, useRef } from 'react'
import { useZoomComponent } from '../../hooks'

export namespace LongTapNS {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    timeout?: number
    callback?: (evt: MouseDownEvent) => void
    children?: ReactNode
  }

  export type MouseDownEvent = MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
}

export const LongTap: FC<LongTapNS.Props> = ({
  timeout = 100,
  callback = () => {},
  children,
  className,
  ...rest
}) => {
  const { createClassName } = useZoomComponent('long-tap')
  const containerClassNames = createClassName(className)
  const timeoutID = useRef<number>(-1)

  const handleMouseDown = (evt: LongTapNS.MouseDownEvent) => {
    const { currentTarget } = evt
    const { parentElement, firstChild } = currentTarget

    timeoutID.current = window.setTimeout(() => {
      const { activeElement } = document
      const possibleTargets = [parentElement, firstChild, currentTarget]

      if (possibleTargets.includes(activeElement)) {
        callback(evt)
      }
    }, timeout)
  }

  const handleMouseUp = () => {
    window.clearTimeout(timeoutID.current)
    timeoutID.current = -1
    const activeElement = document.activeElement as HTMLDivElement | null
    activeElement?.blur()
  }

  return (
    <div
      {...rest}
      tabIndex={1}
      className={containerClassNames}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      {children}
    </div>
  )
}
