import React, { ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react'

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
    reference?: RefObject<HTMLDivElement>
    spinProps?: SpinNS.Props
    endMessage?: string | ReactNode
    itemsContainerProps?: Omit<BaseComponent, 'children'>
    itemContainerProps?: Omit<BaseComponent, 'children'>
    itemsReferenceKey?: string
    handleSetProps?: (index: number, reference: null | undefined) => { [prop: string]: any }
  }
}

export const InfiniteScrollView = <DataType extends unknown[] = unknown[]>({
  itemsReferenceKey = 'ref',
  reverseScroll = false,
  loadOnMount = true,
  threshold = 5,
  endMessage,
  isLoading,
  className,
  children,
  spinProps,
  handleSetProps,
  containerProps,
  reference,
  dataset,
  scrollViewProps,
  maxHeight,
  maxWidth,
  handleOnLoadMore,
  maxDatasetLength,
  autoHide,
  itemsContainerProps,
  itemContainerProps,
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

  const contentContainerClasses = createClassName(itemsContainerProps?.className, 'content')
  const itemContainerClasses = createClassName(itemContainerProps?.className, 'item')

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
        ref={scrollViewRef}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        onScroll={handleOnScroll}
      >
        <div {...itemsContainerProps} className={contentContainerClasses}>
          {dataset.map((data, index) => (
            <div
              {...itemContainerProps}
              key={index}
              ref={node => (dataset.length === index + threshold ? lastDataRef(node) : undefined)}
              className={itemContainerClasses}
            >
              {children(data, { index })}
            </div>
          ))}

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
