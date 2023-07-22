import React, { useLayoutEffect, useRef, useState, type FC, type MutableRefObject } from 'react'
import { flushSync } from 'react-dom'

import { Icon } from '..'
import { shouldShowArrow } from './utils'

export namespace ScrollArrowNS {
  export type ArrowDir = (typeof ArrowDir)[number]
  export const ArrowDir = ['up', 'down'] as const

  export type ArrowStatus = (typeof ArrowStatus)[number]
  export const ArrowStatus = ['idle', 'active'] as const

  export interface Props {
    isPositioned: boolean
    dir: ArrowDir
    scrollRef: MutableRefObject<HTMLDivElement | null>
    scrollTop: number
    innerOffset: number
    onScroll: (amount: number) => void
    onHide: () => void
  }
}

export const ScrollArrow: FC<ScrollArrowNS.Props> = ({
  isPositioned,
  dir,
  scrollRef,
  scrollTop,
  onScroll,
  innerOffset,
  onHide,
}) => {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const statusRef = useRef<ScrollArrowNS.ArrowStatus>('idle')
  const frameRef = useRef(-1)

  useLayoutEffect(() => {
    setTimeout(() => {
      if (isPositioned && statusRef.current !== 'active') {
        requestAnimationFrame(() => {
          flushSync(() => {
            setShow(shouldShowArrow(scrollRef, dir))
          })
        })
      }
    }, 0)
  }, [isPositioned, innerOffset, scrollTop, scrollRef, dir])

  useLayoutEffect(() => {
    if (!show && statusRef.current === 'active') {
      onHide()
    }
  }, [show, scrollTop])

  const handlePointerEnter = () => {
    statusRef.current = 'active'
    let prevNow = Date.now()

    const frame = () => {
      if (scrollRef.current) {
        const currentNow = Date.now()
        const msElapsed = currentNow - prevNow
        prevNow = currentNow

        const pixelsToScroll = msElapsed / 2

        const remainingPixels =
          dir === 'up'
            ? scrollRef.current.scrollTop
            : scrollRef.current.scrollHeight -
              scrollRef.current.clientHeight -
              scrollRef.current.scrollTop

        const scrollRemaining =
          dir === 'up'
            ? scrollRef.current.scrollTop - pixelsToScroll > 0
            : scrollRef.current.scrollTop + pixelsToScroll <
              scrollRef.current.scrollHeight - scrollRef.current.clientHeight

        onScroll(
          dir === 'up'
            ? Math.min(pixelsToScroll, remainingPixels)
            : Math.max(-pixelsToScroll, -remainingPixels),
        )

        if (scrollRemaining) {
          frameRef.current = requestAnimationFrame(frame)
        } else {
          setShow(shouldShowArrow(scrollRef, dir))
        }
      }
    }

    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(frame)
  }

  const handlePointerLeave = () => {
    statusRef.current = 'idle'
    cancelAnimationFrame(frameRef.current)
  }

  return (
    <div
      className="scroll-handler"
      data-dir={dir}
      ref={ref}
      aria-hidden
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      <Icon className="chevron-icon" name={dir === 'up' ? 'expand_less' : 'expand_more'} />
    </div>
  )
}
