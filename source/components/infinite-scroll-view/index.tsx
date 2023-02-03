import React, { cloneElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { ScrollView, ScrollViewNS, Spin, SpinNS, Title } from '..'
import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace InfiniteScrollViewNS {
  export type PickedScrollViewProps = 'maxWidth' | 'maxHeight' | 'autoHide'

  export interface ChildrenCallbackParams {
    index: number
  }

  export interface Props<DataType extends unknown[] = unknown[]>
    extends Omit<BaseComponent, 'children'>,
      Pick<ScrollViewNS.Props, PickedScrollViewProps> {
    dataset: DataType
    isLoading: boolean
    handleOnLoadMore: () => void | Promise<void>
    children: (data: DataType[0], params: ChildrenCallbackParams) => JSX.Element
    scrollViewProps?: Omit<ScrollViewNS.Props, PickedScrollViewProps>
    maxDatasetLength?: number
    reverseScroll?: boolean
    loadOnMount?: boolean
    threshold?: number
    spinProps?: SpinNS.Props
    endMessage?: string | ReactNode
  }
}

export const InfiniteScrollView = <DataType extends unknown[] = unknown[]>({
  reverseScroll = false,
  loadOnMount = true,
  threshold = 5,
  endMessage,
  isLoading,
  className,
  children,
  spinProps,
  containerProps,
  reference,
  dataset,
  scrollViewProps,
  maxHeight,
  maxWidth,
  handleOnLoadMore,
  maxDatasetLength,
  autoHide,
  ...rest
}: InfiniteScrollViewNS.Props<DataType>): JSX.Element => {
  const scrollViewRef = useRef<ScrollViewNS.ContainerNode | null>(null)
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { createClassName, sendLog } = useZoomComponent('infinite-scroll-view')

  const isMoreDataRemaining = !maxDatasetLength || dataset.length < maxDatasetLength

  const handleLoadMoreData = () => {
    if (isMoreDataRemaining) {
      void handleOnLoadMore()
    }
  }

  const lastDataRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || (reverseScroll && !isScrollAtBottom)) {
        return null
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          handleLoadMoreData()
        }
      })
      if (node) {
        observerRef.current.observe(node)
      }
    },
    [isLoading, isScrollAtBottom],
  )

  const classes = createClassName(className, '', {
    reversed: !!reverseScroll,
  })

  const handleOnScroll = (evt: Event) => {
    const scrollableTarget = evt.target as HTMLDivElement | null
    if (!scrollableTarget) {
      return sendLog(logs.infiniteScrollViewScrollableTargetNotFound, 'handleOnScroll fn')
    }

    if (scrollableTarget.scrollTop < 2) {
      scrollableTarget.scrollTop = 2
    }
  }

  useEffect(() => {
    if (loadOnMount) {
      handleLoadMoreData()
    }
  }, [])

  useEffect(() => {
    if (dataset.length > 0 && reverseScroll && scrollViewRef.current) {
      const { osInstance } = scrollViewRef.current
      const elements = osInstance()?.elements()
      if (elements) {
        const { viewport } = elements
        const { clientHeight } = viewport
        viewport.scrollTo({ top: clientHeight })
        setIsScrollAtBottom(true)
      } else {
        sendLog(logs.infiniteScrollViewElementNotFound, 'useEffect with deps of dataset')
      }
    }
  }, [dataset])

  return (
    <div {...containerProps} {...rest} className={classes} ref={reference}>
      <ScrollView
        {...scrollViewProps}
        autoHide={autoHide}
        reference={scrollViewRef}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        onScroll={handleOnScroll}
      >
        <div className="infinite-scroll-content">
          {dataset.map((data, index) =>
            cloneElement(children(data, { index }), {
              key: index,
              style: { color: dataset.length === index + threshold ? 'red' : '' },
              ref: (node: HTMLElement | null) =>
                dataset.length === index + threshold ? lastDataRef(node) : undefined,
            }),
          )}

          {isMoreDataRemaining ? (
            <div className="loading-message">{isLoading && <Spin {...spinProps} />}</div>
          ) : (
            endMessage && (
              <div className="end-message">
                {typeof endMessage === 'string' ? (
                  <Title h5 className="end-message-title">
                    {endMessage}
                  </Title>
                ) : (
                  endMessage
                )}
              </div>
            )
          )}
        </div>
      </ScrollView>
    </div>
  )
}
