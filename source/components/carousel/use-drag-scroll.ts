import { useRef, type MouseEvent } from 'react'

import { doByRef } from '@zoom-studio/zoom-js-ts-utils'

import { logs } from '../../constants'
import { type ZoomGlobalConfigProviderNS } from '../zoom-global-config-provider'

export const useDragScroll = (
  slidesRef: React.MutableRefObject<HTMLDivElement | null>,
  isVertical: boolean,
  sendLog: ZoomGlobalConfigProviderNS.Log,
) => {
  const startYRef = useRef<number | null>(0)
  const scrollTopRef = useRef<number | null>(0)

  const startXRef = useRef<number | null>(0)
  const scrollLeftRef = useRef<number | null>(0)

  const isDraggingRef = useRef<boolean | null>(false)

  const doBySlides = (functionName: string, callback: (slides: HTMLDivElement) => void) => {
    doByRef(slidesRef, callback, () => {
      sendLog(logs.carouselSlidesRefNotFound, `${functionName} inside useDragScroll hook`)
    })
  }

  const onMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    doBySlides('onMouseDown', slides => {
      isDraggingRef.current = true
      if (isVertical) {
        startYRef.current = evt.pageY - slides.offsetTop
        scrollTopRef.current = slides.scrollTop
      } else {
        startXRef.current = evt.pageX - slides.offsetLeft
        scrollLeftRef.current = slides.scrollLeft
      }
    })
  }

  const onMouseUp = () => {
    isDraggingRef.current = false
  }

  const onMouseMove = (evt: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return
    }

    doBySlides('onMouseMove', slides => {
      if (isVertical) {
        const walkY = (evt.pageY - slides.offsetTop - startYRef.current!) * 2
        slides.scrollTop = scrollTopRef.current! - walkY
      } else {
        const walkX = (evt.pageX - slides.offsetLeft - startXRef.current!) * 2
        slides.scrollLeft = scrollLeftRef.current! - walkX
      }
    })
  }

  return {
    onMouseLeave: onMouseUp,
    onMouseUp,
    onMouseDown,
    onMouseMove,
  }
}
