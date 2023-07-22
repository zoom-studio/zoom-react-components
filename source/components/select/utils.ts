import { type MutableRefObject } from 'react'

import { type ScrollArrowNS } from './scroll-arrow'

export const SCROLL_ARROW_PADDING = 10

export const shouldShowArrow = (
  scrollRef: MutableRefObject<HTMLDivElement | null>,
  dir: ScrollArrowNS.ArrowDir,
) => {
  if (scrollRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current

    if (dir === 'up') {
      return scrollTop >= SCROLL_ARROW_PADDING
    }

    if (dir === 'down') {
      return scrollTop <= scrollHeight - clientHeight - SCROLL_ARROW_PADDING
    }
  }

  return false
}
