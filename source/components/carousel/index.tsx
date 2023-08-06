import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react'

import { classNames, doByRef, waitForScrollEnd } from '@zoom-studio/zoom-js-ts-utils'

import { Button, Title, type ButtonNS } from '..'
import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'
import { useDragScroll } from './use-drag-scroll'

export namespace CarouselNS {
  export interface HorizontalProps {
    orientation?: 'horizontal'
  }

  export interface VerticalProps {
    orientation?: 'vertical'
    maxHeight: 'string' | number
  }

  export interface BaseProps<DataType extends object = object>
    extends Omit<BaseComponent, 'children'> {
    dataset: DataType[]
    children: (data: DataType, index: number) => ReactNode
    itemsPerScroll?: number
    containerRef?: RefObject<HTMLDivElement>
    autoPlay?: number
    showIndicators?: boolean
    showNavigators?: boolean
    title?: string
  }

  export type Props<DataType extends object = object> = BaseProps<DataType> &
    (HorizontalProps | VerticalProps)
}

export const Carousel = <DataType extends object = object>(props: CarouselNS.Props<DataType>) => {
  const {
    orientation: providedOrientation,
    itemsPerScroll: providedItemsPerScroll = 1,
    dataset = [],
    showIndicators = true,
    showNavigators = true,
    children,
    className,
    containerProps,
    containerRef,
    autoPlay,
    title,
  } = props

  const { createClassName, sendLog } = useZoomComponent('carousel')
  const slidesRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const orientation = providedOrientation ?? 'horizontal'
  const isVertical = orientation === 'vertical'
  const itemsPerScroll = isVertical ? 1 : providedItemsPerScroll

  const events = useDragScroll(slidesRef, isVertical, sendLog)

  const classes = createClassName(className, '', {
    [createClassName('', orientation)]: true,
  })

  const getSlidesStyle = (): CSSProperties => ({
    maxHeight: props.orientation === 'vertical' ? props.maxHeight : 'unset',
    gridTemplateColumns: `repeat(${orientation === 'horizontal' ? dataset.length : 1}, ${
      100 / itemsPerScroll
    }%)`,
  })

  const doBySlides = (functionName: string, callback: (slides: HTMLDivElement) => void) => {
    doByRef(slidesRef, callback, () => {
      sendLog(logs.carouselSlidesRefNotFound, `${functionName} function`)
    })
  }

  const getSlidesWidthAndHeight = () => {
    let width = 0
    let height = 0
    doBySlides('getSlidesWidthAndHeight', slides => {
      const styles = getComputedStyle(slides)
      width = parseInt(styles.width)
      height = parseInt(styles.height)
    })
    return { width, height }
  }

  const getCurrentSlideIndex = (): number => {
    let index = 0
    doBySlides('getCurrentSlideIndex', slides => {
      const { width, height } = getSlidesWidthAndHeight()
      const { scrollLeft, scrollTop } = slides
      index = isVertical ? scrollTop / height : scrollLeft / width
    })
    return Math.ceil(index)
  }

  const goToSlide = (slide: 'next' | 'prev' | number) => () => {
    doBySlides('goToSlide', slides => {
      setActiveIndex(currentActiveIndex => {
        const { width, height } = getSlidesWidthAndHeight()

        let targetSlide =
          typeof slide === 'number'
            ? slide
            : slide === 'next'
            ? currentActiveIndex + 1
            : currentActiveIndex - 1

        const slidesCount = dataset.length / itemsPerScroll

        if (targetSlide >= slidesCount) {
          targetSlide = 0
        } else if (targetSlide === -1) {
          targetSlide = slidesCount - 1
        }

        if (isVertical) {
          slides.scrollTop = targetSlide * height
        } else {
          slides.scrollLeft = targetSlide * width
        }

        return targetSlide
      })
    })
  }

  const getIndicatorClasses = (index: number) => {
    return classNames('indicator', {
      active: index === activeIndex,
    })
  }

  const onScroll = () => {
    doBySlides('onScroll', async slides => {
      await waitForScrollEnd(slides)
      setActiveIndex(getCurrentSlideIndex())
    })
  }

  const getNavigatorButtonProps = (): ButtonNS.Props => ({
    shape: 'circle',
    type: 'bordered',
    className: 'navigator-button',
  })

  useEffect(() => {
    let interval: NodeJS.Timer | null = null
    if (autoPlay) {
      interval = setInterval(goToSlide('next'), autoPlay)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])

  return (
    <div {...containerProps} ref={containerRef} className={classes}>
      {title && (
        <div className="header">
          <Title className="title">{title}</Title>
        </div>
      )}

      <div
        className="slides"
        style={getSlidesStyle()}
        ref={slidesRef}
        onScroll={onScroll}
        {...events}
      >
        {dataset.map((data, index) => (
          <div className="slide" key={index}>
            {children(data, index)}
          </div>
        ))}
      </div>

      {(showIndicators || showNavigators) && (
        <div className="footer">
          <div className="indicators">
            {showIndicators &&
              Array.from(Array(Math.ceil(dataset.length / itemsPerScroll))).map((_, index) => (
                <span
                  className={getIndicatorClasses(index)}
                  onClick={goToSlide(index)}
                  key={index}
                />
              ))}
          </div>

          <div className="navigators">
            {showNavigators && (
              <>
                <Button
                  {...getNavigatorButtonProps()}
                  prefixMaterialIcon="chevron_left"
                  onClick={goToSlide('prev')}
                />
                <Button
                  {...getNavigatorButtonProps()}
                  prefixMaterialIcon="chevron_right"
                  onClick={goToSlide('next')}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
